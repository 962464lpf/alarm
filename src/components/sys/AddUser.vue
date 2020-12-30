<template>
  <el-dialog
    title="添加用户"
    class="top-setting-dialog"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <el-form ref="userForm" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="用户名：" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="电话：" prop="phone">
        <el-input v-model="form.phone" type="phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="form.email" type="email"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="confirm('userForm')">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (value && !myreg.test(value)) {
        return callback(new Error('请输入正确的电话号码！'))
      } else {
        callback()
      }
    }
    var checkEmail = (rule, value, callback) => {
      var myreg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/
      if (value && !myreg.test(value)) {
        return callback(new Error('请输入正确的邮箱！'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: this.value,
      options: [
        {
          label: '管理员',
          value: 2,
        },
        {
          label: '普通用户',
          value: 1,
        },
      ],
      form: {
        name: '',
        password: '',
        email: '',
        phone: '',
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        phone: [{ validator: checkPhone, trigger: 'blur' }],
        email: [{ validator: checkEmail, trigger: 'blur' }],
      },
    }
  },
  methods: {
    handleClose() {
      this.$emit('input', false)
    },
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('getUserForm', this.form)
          this.handleClose()
        } else {
          return false
        }
      })
    },
  },
  mounted() {},
}
</script>

<style lang="scss">
.top-setting-dialog {
  .el-dialog {
    // height: 40% !important;
  }
}
</style>
