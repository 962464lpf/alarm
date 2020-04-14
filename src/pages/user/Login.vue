<template>
  <div class="user">
    <div class="head"></div>
    <div class="head-cover"></div>
    <div class="form">
      <el-form :model="userForm" status-icon :rules="rules" ref="userForm">
        <el-form-item label prop="name">
          <el-input v-model="userForm.name" placeholder="请输入用户名">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="userForm.password" placeholder="请输入密码">
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="btn curp" @click="submitForm('userForm')">{{immediateTitle('btn')}}</div>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
      <div class="fr clearfloat immediately curp" @click="jump">{{immediateTitle()}}</div>
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
      rules: {
        userName: [
          // { required: true, message: '请输入活动名称', trigger: 'blur' }
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
    immediateTitle(type) {
      if (this.currentPath === '/') {
        if (type) {
          return '登录'
        }
        return '立即注册'
      } else if (this.currentPath === '/register') {
        if (type) return '注册'
        return '立即登录'
      }
    },
    submitForm(formName) {
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
            if (res.state === 1) {
              if (this.currentPath === '/') {
                this.$router.push('/index')
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
          console.log('error submit!!')
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
    }
  },
  mounted() {}
}
</script>

<style  lang="scss">
.user {
  overflow: hidden;
  // position: relative;
  background: #eee;
  .head {
    height: 50%;
    width: 100%;
    background-color: #3b8ad4;
    background-image: url('../../assets/images/Background.png');
    background-position-y: -423px;
    position: absolute;
    top: 0;
  }
  .head-cover {
    height: 50%;
    width: 100%;
    background-color: #3b8ad4;
    position: absolute;
    top: 0;
    opacity: 0.7;
  }
  .form {
    width: 500px;
    position: absolute;
    top: 30%;
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
          }
        }
        .btn {
          width: 100%;
          border-radius: 10px;
          height: 50px;
          background: #46a5fe;
          line-height: 50px;
          text-align: center;
          color: white;
          font-size: 18px;
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
