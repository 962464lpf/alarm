<template>
  <div class="user">
    <div class="head"></div>
    <!-- <div class="head-cover"></div> -->
    <!-- <img src="../../assets/images/Background.png" alt /> -->
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
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginApi, registerApi } from '../../tools/api'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      userForm: {
        name: '',
        password: ''
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
          { required: true, message: '请再次输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['currentPath'])
  },
  watch: {
    currentPath() {
      this.userForm = {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    submit() {
      alert(1)
    },
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          let fd = new FormData()
          for (let key in this.userForm) {
            fd.append(key, this.userForm[key])
          }
          let handleSubmit = null
          if (this.currentPath === '/') handleSubmit = loginApi
          if (this.currentPath === '/register') handleSubmit = registerApi
          handleSubmit(fd).then(res => {
            this.loginBtnLoading = false
            if (res.state === 1) {
              if (this.currentPath === '/') {
                this.$router.push('/index')
                sessionStorage.setItem('userInfo', JSON.stringify(res.userinfo))
                this.$store.commit('changeUserInfo', res.userinfo)
              } else {
                this.$router.push('/')
              }
            } else {
              this.$message({
                type: 'warning',
                message: '操作失败'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    jump() {
      let path
      if (this.currentPath === '/') {
        path = 'register'
      } else {
        path = '/'
      }
      this.$router.push(path)
    },
    keyDown(e) {
      if (e.keyCode == 13) {
        this.submitForm('userForm')
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.keyDown)
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false)
  }
}
</script>

<style  lang="scss">
.user {
  overflow: hidden;
  // position: relative;
  background: #eee;
  .head {
    height: 100%;
    width: 100%;
    // background-color: #3b8ad4;
    background-image: url('../../assets/images/Background.png');
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
  }
  .head-cover {
    // height: 50%;
    // width: 100%;
    // background-color: #3b8ad4;
    // position: absolute;
    // top: 0;
    // opacity: 0.7;
  }
  .form {
    width: 500px;
    position: absolute;
    top: 20%;
    left: calc(50% - 250px);
    border-radius: 20px;
    padding: 55px 40px;
    box-shadow: -3px -3px 4px #e0e2e5, 3px 3px 4px #e0e2e5;
    background: rgba(255, 255, 255, 0.4);
    box-sizing: border-box;
    .el-form {
      .el-form-item {
        display: flex;
        margin-bottom: 25px;
        .el-form-item__content {
          flex: 1;
          margin-left: 0 !important;
          .el-input--mini .el-input__inner {
            height: 40px;
            line-height: 40px;
            border-color: #2addfb;
          }
          .el-form-item__error {
            color: #2addfb;
          }
          .el-input__suffix {
            .el-icon-circle-close {
              color: #2addfb;
            }
          }
        }
        .btn {
          width: 100%;
          border-radius: 10px;
          height: 50px;
          background: #05336f;
          line-height: 50px;
          text-align: center;
          color: white;
          font-size: 18px;
          border: none;
          padding: 0 !important;
        }
      }
    }
  }
  .immediately {
    color: #2e82ff;
    font-size: 14px;
  }
}
</style>
