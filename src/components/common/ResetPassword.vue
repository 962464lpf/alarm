<template>
  <div class="reset-password">
    <el-dialog title="重置密码" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="resetform" :inline="true" :model="form" :rules="rules" label-width="120px">
        <div>
          <el-form-item label="新密码" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input v-model="form.password2" type="password"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="confirm('resetform')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: this.value,
      form: {
        password: '',
        password2: ''
      },
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('input', false)
    },
    confirm(formName) {
      // this.$emit('getTopSetting', this.form)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('getResetform', this.form)
          this.handleClose()
        } else {
          return false
        }
      })
    }
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
</style>
