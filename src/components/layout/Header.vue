<template>
  <div
    class="header"
    v-if="!(currentPath === '/' || currentPath === '/register' ||  currentPath === '/edituser' )"
  >
    <el-row class="header-row">
      <el-col :span="3" class="title">
        <!-- <img src="../../assets/images/logo.png" class="curp" @click="jumpTo" /> -->
        <!-- 护网工具箱 -->
        <img src="../../assets/images/logo.png" alt />
        <img src="../../assets/images/tuling.png" alt />
      </el-col>

      <el-col
        :span="16"
        class="icon-box"
        v-if="!(currentPath === '/' || currentPath === '/register' ||  currentPath === '/edituser' )"
      >
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
          <i class="el-icon-s-tools curp" style="font-size: 14px;" @click="changeCycle"></i>
        </span>
      </el-col>
      <el-col
        :span="5"
        class="user-setting"
        v-if="!(currentPath === '/' || currentPath === '/register' ||  currentPath === '/edituser' )"
      >
        <span>
          <i class="el-icon-user"></i>
          {{userInfo.name}}
          <!-- ({{getRoleName()}}) -->
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
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </el-col>
    </el-row>
    <el-dialog title="全局配置" :visible.sync="dialogVisible" width="30%" class="overall-dialog">
      <div>
        <span>告警统计周期：</span>
        <el-radio-group v-model="radio" @change="radioChange">
          <el-radio-button label="day">日</el-radio-button>
          <el-radio-button label="week">周</el-radio-button>
          <el-radio-button label="month">月</el-radio-button>
        </el-radio-group>
      </div>
      <div class="mt10">
        <span>
          <a style="font-size:12px;">
            白名单机制
            <i class="el-icon-info curp" @click="showTooltip"></i>：
          </a>
          <el-switch
            v-model="statisticalWhite"
            :width="40"
            @change="setWhiteIfStatistical"
            active-color="#95d214"
            class="my-switch"
          ></el-switch>
        </span>
      </div>
      <div class="mt10">
        <span>
          <a style="font-size:12px;">只看服务器区：</a>
          <el-switch
            v-model="isServer"
            :width="40"
            @change="setIsServer"
            active-color="#95d214"
            class="my-switch"
          ></el-switch>
        </span>
      </div>
    </el-dialog>
    <div v-if="resetPasswordStatus">
      <ResetPassword v-model="resetPasswordStatus" @getResetform="getResetform"></ResetPassword>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  getAttackNumApi,
  logoutApi,
  resetPassword,
  whiteIfStatisticalApi,
  lookServerSwitchApi,
  getStsWhiteStusApi,
} from '../../tools/api'
import ResetPassword from '../../components/common/ResetPassword'
export default {
  components: {
    ResetPassword,
  },
  data() {
    return {
      name: this.$NAME,
      radio: 'day',
      statisticalWhite: 0,
      dialogVisible: false,
      resetPasswordStatus: false,
      isServer: false,
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
      'userInfo',
    ]),
    cycleName() {
      if (this.cycle === 'day') {
        return '今日'
      } else if (this.cycle === 'week') {
        return '本周'
      } else {
        return '本月'
      }
    },
  },
  methods: {
    radioChange() {
      this.confirm()
    },
    showTooltip() {
      this.$message({
        message:
          '启用白名单机制后，系统不会出现白名单告警数据，实时告警页面也不会推送白名告警数据',
        duration: 3000,
      })
    },
    jumpTo() {
      this.$router.push('/index')
    },
    getRoleName() {
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
    changeCycle() {
      this.dialogVisible = true
    },
    setWhiteIfStatistical(val) {
      let fd = new FormData()
      fd.append('white_show', Number(!val))
      whiteIfStatisticalApi(fd).then((res) => {
        let type = 'success'
        let message = '设置成功'
        if (res.state !== this.successFlag) {
          type = 'warning'
          message = res.info
          this.statisticalWhite = !val
        } else {
          this.statisticalWhite = val
        }
        this.$message({
          type,
          message,
        })
      })
    },
    confirm() {
      this.$store.commit('cahngeCycle', this.radio)
      this.getAttackNum()
    },
    setIsServer() {
      let fd = new FormData()
      fd.append('server_show', Number(this.isServer))
      lookServerSwitchApi(fd).then((res) => {
        let type = 'success'
        let message = '设置成功'
        if (res.state !== this.successFlag) {
          type = 'warning'
          message = res.info
          this.isServer = !this.isServer
        } else {
          // this.isServer = this.isServer
        }
        this.$message({
          type,
          message,
        })
      })
    },
    getAttackNum() {
      let fd = new FormData()
      fd.append('type', this.cycle)
      getAttackNumApi(fd).then((res) => {
        this.$store.commit('changeAttackNum', res)
      })
    },
    resetUser() {
      this.resetPasswordStatus = true
    },
    getResetform(form) {
      let fd = new FormData()
      let user = this.userInfo
      fd.append('id', user.id)
      fd.append('name', user.name)
      fd.append('password', form.password)
      fd.append('password2', form.password2)
      resetPassword(fd).then((res) => {
        let type = 'success'
        if (res.state === 1) {
          this.$confirm('密码已重置, 是否重新登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then(() => {
              this.$router.push('/')
            })
            .catch(() => {})
        } else {
          type = 'warning'
          this.$message({
            type,
            message: res.info,
          })
        }
      })
    },
    delAllCookie() {
      let myDate = new Date()
      myDate.setTime(-1000) //设置时间
      let data = document.cookie
      let dataArray = data.split('; ')
      for (let i = 0; i < dataArray.length; i++) {
        let varName = dataArray[i].split('=')
        document.cookie = varName[0] + "=''; expires=" + myDate.toGMTString()
      }
    },
    logout() {
      logoutApi().then((res) => {
        if (res.state === 1) {
          sessionStorage.removeItem('userInfo')
          this.$store.commit('changeUserInfo', {})
          this.delAllCookie()
          this.$store.dispatch('disconnectEventSource')
          this.$router.push('/')
        } else {
          this.$message({
            type: 'warning',
            message: res.info,
          })
        }
      })
    },
  },
  mounted() {
    this.getAttackNum()
    getStsWhiteStusApi().then((res) => {
      // 1代表关  0代表开  白名单
      this.statisticalWhite = Boolean(res.white_show)
      this.statisticalWhite = !this.statisticalWhite
      // 1代表开  0代表关  服务器区
      this.isServer = Boolean(res.server_show)
    })
  },
}
</script>

<style lang="scss">
@import '../../assets/style/color.scss';
.header {
  height: 50px;
  width: 100%;
  background: #1a2332;
  font-size: 14px;
  .header-row {
    height: 50px;
    line-height: 50px;
    .title {
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 15px;
      box-sizing: border-box;
      img {
        height: 35px;
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
        padding-right: 30px;
        color: white;
        box-sizing: border-box;
      }
    }
    .user-setting {
      justify-content: flex-end;
      span {
        // margin-right: 5px;
        padding-right: 20px;
        box-sizing: border-box;
      }
    }
  }
  .overall-dialog {
    // height: 40% !important;
    .el-dialog__body {
      div {
        color: white;
        .my-switch {
          .el-switch__label {
            color: #8e8a8a !important;
          }
          .is-active {
            color: #95d214 !important;
          }
        }
        .el-radio-group {
          .el-radio-button__inner {
            border: none;
          }
          .is-active {
            .el-radio-button__inner {
              background-color: #95d214 !important;
              border: none;
            }
          }
        }
      }
    }
  }
}
.el-dropdown-menu {
  background: #141d2b;
  border: 1px solid #97e402;
  .el-dropdown-menu__item {
    color: white;
  }
  .el-dropdown-menu__item:hover {
    background: transparent;
    color: #97e402;
  }
  .popper__arrow::after {
    border-bottom-color: #97e402 !important;
  }
}
</style>
