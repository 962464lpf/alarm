<template>
  <div class="header">
    <el-row class="header-row">
      <el-col :span="3"
              class="title">
        <!-- <img src="../../assets/images/logo.png" class="curp" @click="jumpTo" /> -->
        <!-- 护网工具箱 -->
        {{name}}
      </el-col>

      <el-col :span="16"
              class="icon-box"
              v-if="!(currentPath === '/' || currentPath === '/register' ||  currentPath === '/edituser' )">
        <span>
          {{cycleName}}攻击总数：
          <b>{{attackNum}}</b>
        </span>
        <span>
          高危次数：
          <b>{{attackNumHigh}}</b>
        </span>
        <span>
          中危次数：
          <b>{{attackNumMiddle}}</b>
        </span>
        <span>
          低危次数：
          <b>{{attackNumLow}}</b>
        </span>
        <span>
          <i class="el-icon-s-tools curp"
             style="font-size: 14px;"
             @click="changeCycle"></i>
        </span>
      </el-col>
      <el-col :span="5"
              class="user-setting"
              v-if="!(currentPath === '/' || currentPath === '/register' ||  currentPath === '/edituser' )">
        <span>
          <i class="el-icon-user"></i>
          {{userInfo.name}}({{getRoleName()}})
        </span>
        <span>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <p @click="resetUser">重置密码</p>
              </el-dropdown-item>
              <el-dropdown-item>
                <p @click="logout">退出</p>
              </el-dropdown-item>
              <el-dropdown-item v-if="userInfo.level === 0">
                <p @click="factoryDataReset">恢复出厂设置</p>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </el-col>
    </el-row>
    <el-dialog title="系统配置"
               :visible.sync="dialogVisible"
               width="30%">
      <div>
        <span>告警统计周期：</span>
        <el-radio-group v-model="radio">
          <el-radio label="day">天</el-radio>
          <el-radio label="week">周</el-radio>
          <el-radio label="month">月</el-radio>
        </el-radio-group>
      </div>
      <div class="mt10">
        <el-checkbox v-model="statisticalWhite">
          <span style="font-size: 12px;">统计白名单数据</span>
        </el-checkbox>
      </div>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <div v-if="resetPasswordStatus">
      <ResetPassword v-model="resetPasswordStatus"
                     @getResetform="getResetform"></ResetPassword>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  getAttackNumApi,
  logoutApi,
  resetPassword,
  factoryDataResetApi,
  whiteIfStatisticalApi,
  getStsWhiteStusApi
} from '../../tools/api'
import ResetPassword from '../../components/common/ResetPassword'
export default {
  components: {
    ResetPassword
  },
  data () {
    return {
      name: this.$NAME,
      radio: 'day',
      statisticalWhite: true,
      dialogVisible: false,
      resetPasswordStatus: false
    }
  },
  computed: {
    ...mapState([
      'attackNum',
      'attackNumHigh',
      'attackNumMiddle',
      'attackNumLow',
      'cycle',
      'currentPath',
      'userInfo'
    ]),
    cycleName () {
      if (this.cycle === 'day') {
        return '今日'
      } else if (this.cycle === 'week') {
        return '本周'
      } else {
        return '本月'
      }
    }
  },
  methods: {
    jumpTo () {
      this.$router.push('/index')
    },
    getRoleName () {
      let level = this.userInfo.level
      switch (level) {
        case 0:
          return '超级管理员'
        case 1:
          return '普通用户'
        case 2:
          return '管理员'
        default:
          break
      }
    },
    changeCycle () {
      this.dialogVisible = true
    },
    confirm () {
      let fd = new FormData()
      fd.append('white_show', Number(this.statisticalWhite))
      whiteIfStatisticalApi(fd).then(res => {
        let type = 'success'
        let message = '设置成功'
        if (res.state !== this.successFlag) {
          type = 'warning'
          message = res.info
        }
        this.$message({
          type,
          message
        })
      })
      this.$store.commit('cahngeCycle', this.radio)
      this.getAttackNum()
      this.dialogVisible = false
    },
    getAttackNum () {
      getAttackNumApi().then(res => {
        this.$store.commit('changeAttackNum', res)
      })
    },
    resetUser () {
      this.resetPasswordStatus = true
    },
    getResetform (form) {
      let fd = new FormData()
      let user = this.userInfo
      fd.append('id', user.id)
      fd.append('name', user.name)
      fd.append('password', form.password)
      fd.append('password2', form.password2)
      resetPassword(fd).then(res => {
        let type = 'success'
        if (res.state === 1) {
          this.$confirm('密码已重置, 是否重新登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              this.$router.push('/')
            })
            .catch(() => { })
        } else {
          type = 'warning'
          this.$message({
            type,
            message: res.info
          })
        }
      })
    },
    delAllCookie () {
      let myDate = new Date()
      myDate.setTime(-1000) //设置时间
      let data = document.cookie
      let dataArray = data.split('; ')
      for (let i = 0; i < dataArray.length; i++) {
        let varName = dataArray[i].split('=')
        document.cookie = varName[0] + "=''; expires=" + myDate.toGMTString()
      }
    },
    logout () {
      logoutApi().then(res => {
        if (res.state === 1) {
          this.$router.push('/')
          sessionStorage.removeItem('userInfo')
          this.$store.commit('changeUserInfo', {})
          this.delAllCookie()
          this.$store.dispatch('disconnectEventSource')
        } else {
          this.$message({
            type: 'warning',
            message: res.info
          })
        }
      })
    },
    factoryDataReset () {
      this.$confirm('您确定要将此系统恢复出厂设置吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        factoryDataResetApi().then(res => {
          let type = 'success'
          if (res.state === this.successFlag) {
            type = 'warning'
          }
          this.$message({
            type,
            message: res.info
          })
        })
      })
    }
  },
  mounted () {
    this.getAttackNum()
    getStsWhiteStusApi().then(res => {
      this.statisticalWhite = Boolean(res.white_show)
    })
  }
}
</script>

<style lang="scss">
@import "../../assets/style/color.scss";
.header {
  height: 50px;
  width: 100%;
  background: $hfbg-color;
  .header-row {
    height: 50px;
    line-height: 50px;
    .title {
      text-align: center;
      color: white;
      img {
        height: 50px;
      }
    }
    .icon-box,
    .user-setting {
      display: flex;
      align-items: center;
      height: 100%;
      padding-left: 15px;
      box-sizing: border-box;
      justify-content: center;
      span {
        margin-right: 30px;
        color: white;
      }
    }
    .user-setting {
      justify-content: flex-end;
      span {
        margin-right: 5px;
      }
    }
  }
  .el-dialog {
    // height: 40% !important;
  }
}
</style>
