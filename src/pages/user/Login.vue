<template>
  <div class="user" id="user">
    <div class="title">
      <img src="../../assets/images/logo.png" alt />
      <div>
        <img src="../../assets/images/logo1.png" alt />
        <p>TURING SAFETY MANAGEMENT CENTEER</p>
      </div>
    </div>
    <div class="form-box">
      <div class="form">
        <el-form :model="userForm" status-icon :rules="rules" ref="userForm">
          <el-form-item label prop="name">
            <el-input v-model="userForm.name" placeholder="请输入用户名">
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="userForm.password" placeholder="请输入密码" type="password">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="checkpassword" v-if="currentPath === '/edituser'">
            <el-input v-model="userForm.password2" placeholder="请再次输入密码" type="password">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="btn curp"
              :loading="loginBtnLoading"
              @click="submitForm('userForm')"
            >{{immediateTitle('btn')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div data-v-15300ca4 id="waves"></div>
    <div class="slide_Box_mt"></div>
  </div>
</template>

<script>
import { loginApi, verifyLoginApi } from '../../tools/api'
import { mapState } from 'vuex'
import { encode } from '../../tools/encrypt'
// import { getXinDianTu } from '../../tools/xindiantu'
export default {
  data() {
    return {
      userForm: {
        name: '',
        password: '',
      },
      btnName: '登录',
      loginBtnLoading: false,
      rules: {
        userName: [
          // { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        checkpassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapState(['currentPath']),
  },
  watch: {
    currentPath() {
      this.userForm = {
        name: '',
        password: '',
      }
    },
  },
  methods: {
    immediateTitle(type) {
      if (this.currentPath === '/') {
        if (type) {
          return '登录'
        }
        return '立即注册'
      } else if (this.currentPath === '/register') {
        if (type) return '注册'
        return '立即登录'
      } else if (this.currentPath === '/edituser') {
        if (type) return '确定'
        return '立即登录'
      }
    },
    submitForm(formName) {
      this.loginBtnLoading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let fd = new FormData()
          for (let key in this.userForm) {
            fd.append(key, encode(this.userForm[key]))
          }
          let handleSubmit = loginApi
          handleSubmit(fd).then((res) => {
            this.loginBtnLoading = false
            if (res.state == 1) {
              sessionStorage.setItem('userInfo', JSON.stringify(res.userinfo))
              this.$store.commit('changeUserInfo', res.userinfo)
              this.$router.push('/index')
            } else {
              this.$message({
                type: 'warning',
                message: res.info,
              })
            }
          })
        } else {
          return false
        }
      })
    },
    keyDown(e) {
      if (e.keyCode == 13) {
        this.submitForm('userForm')
      }
    },
  },
  beforeMount() {
    verifyLoginApi().then((res) => {
      if (res.state !== -1) {
        this.$router.push('/index')
      } else {
        this.$store.dispatch('disconnectEventSource')
      }
    })
  },
  mounted() {
    window.addEventListener('keydown', this.keyDown)
    sessionStorage.setItem('refresh', false)
    // getXinDianTu()
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false)
  },
}
</script>
<style  lang="scss">
.user {
  #waves {
    position: absolute;
    height: 100%;
    width: 100%;
    bottom: 0;
  }
  .slide_Box_mt {
    margin: 0 auto;
    width: 524px;
    height: 200px;
    position: absolute;
    top: -20px;
    left: calc(50% - 262px);
  }

  .title {
    position: absolute;
    top: 30px;
    width: 100%;
    text-align: center;
    line-height: 40px;
    font-size: 34px;
    color: white;
    font-weight: 700;
    // height: 50px;
    z-index: 99;
    display: flex;
    justify-content: center;
    img {
      height: 60px;
    }
    div {
      img {
        height: 40px;
      }
      p {
        font-size: 14px;
        text-align: left;
        margin-left: 2px;
        line-height: 10px;
      }
    }
  }
  overflow: hidden;
  // position: relative;
  background: #141d2b;
  overflow: hidden;
  .form-box {
    position: relative;
    height: 100%;
    width: 100%;
    background: transparent;
    z-index: 999;
  }
  .form {
    width: 400px;
    position: absolute;
    bottom: 25%;
    left: calc(50% - 200px);
    border-radius: 20px;
    padding: 35px;
    padding-bottom: 6px;
    background-color: #1a2332 !important;
    border-color: #1a2332 !important;
    box-sizing: border-box;
    .el-form {
      .el-form-item {
        display: flex;
        margin-bottom: 26px;
        .el-form-item__content {
          flex: 1;
          margin-left: 0 !important;
          .el-input--mini .el-input__inner {
            height: 30px;
            line-height: 30px;
            border-color: #1a2332;
            background: #111927;
            color: white;
            padding: 25px;
            padding-left: 30px;
          }
          .el-form-item__error {
            color: #9fef00;
            padding-top: 6px;
            padding-left: 12px;
          }
          .el-input__suffix {
            .el-icon-circle-close {
              color: #9fef00;
            }
          }
        }
        .btn {
          width: 100%;
          border-radius: 10px;
          height: 35px;
          background: #9fef00;
          line-height: 35px;
          text-align: center;
          color: black;
          font-size: 18px;
          border: none;
          padding: 0 !important;
        }
      }
    }
  }
  .immediately {
    color: #9fef00;
    font-size: 14px;
  }
}
</style>
