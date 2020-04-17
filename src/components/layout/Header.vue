<template>
  <div class="header">
    <el-row class="header-row">
      <el-col :span="3" class="title">谛听 Discover</el-col>

      <el-col
        :span="16"
        class="icon-box"
        v-if="!(currentPath === '/' || currentPath === '/register')"
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
        v-if="!(currentPath === '/' || currentPath === '/register')"
      >
        <span>
          <i class="el-icon-user"></i>
          {{userInfo.name}}
        </span>
        <span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span @click="logout">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </el-col>
    </el-row>
    <el-dialog title="设置统计时间" :visible.sync="dialogVisible" width="30%">
      <el-radio-group v-model="radio">
        <el-radio label="day">天</el-radio>
        <el-radio label="week">周</el-radio>
        <el-radio label="month">月</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getAttackNumApi, logoutApi } from '../../tools/api'
export default {
  data() {
    return {
      radio: 'day',
      dialogVisible: false
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
    cycleName() {
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
    changeCycle() {
      this.dialogVisible = true
    },
    confirm() {
      this.$store.commit('cahngeCycle', this.radio)
      this.getAttackNum()
      this.dialogVisible = false
    },
    getAttackNum() {
      getAttackNumApi().then(res => {
        this.$store.commit('changeAttackNum', res)
      })
    },
    logout() {
      logoutApi().then(res => {
        if (res.state === 1) {
          this.$router.push('/')
          sessionStorage.removeItem('userInfo')
          this.$store.commit('changeUserInfo', {})
        } else {
          this.$message({
            type: 'warning',
            message: res.info
          })
        }
      })
    }
  },
  mounted() {
    this.getAttackNum()
  }
}
</script>

<style lang="scss">
@import '../../assets/style/color.scss';
.header {
  height: 50px;
  width: 100%;
  background: $hfbg-color;
  .header-row {
    height: 50px;
    line-height: 50px;
    .title {
      color: white;
      text-align: center;
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
