<template>
  <div class="mail">
    <el-form :model="emailForm" :rules="rules" ref="emailForm" label-width="100px">
      <el-form-item label="邮件服务器" prop="email_server">
        <el-input v-model="emailForm.email_server"></el-input>
      </el-form-item>
      <el-form-item label="端口" prop="port">
        <el-input v-model.number="emailForm.port"></el-input>
      </el-form-item>
      <el-form-item label="发件箱" prop="from_addr">
        <el-input v-model="emailForm.from_addr"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="emailForm.password"></el-input>
      </el-form-item>
      <el-form-item label="收件箱" prop="to_addr">
        <el-input v-model="emailForm.to_addr" placeholder="多个邮箱时，请用逗号(,)分隔"></el-input>
      </el-form-item>
      <el-form-item label="抄送" prop="cc">
        <el-input v-model="emailForm.cc" placeholder="多个邮箱时，请用逗号(,)分隔"></el-input>
      </el-form-item>
      <el-form-item label="主题" prop="subject">
        <el-input v-model="emailForm.subject"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" v-model="emailForm.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirm('emailForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getMailApi, setMailApi } from '../../tools/api'
export default {
  data() {
    return {
      emailForm: {
        email_server: '',
        port: '',
        from_addr: '',
        password: '',
        to_addr: '',
        cc: '',
        subject: '',
        content: ''
      },
      rules: {
        email_server: [
          { required: true, message: '请输入邮件服务器', trigger: 'blur' }
        ],
        port: [{ required: true, message: '端口', trigger: 'blur' }],
        from_addr: [
          { required: true, message: '请输入发件箱', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        to_addr: [{ required: true, message: '请输入收件箱', trigger: 'blur' }],
        cc: [{ required: true, message: '请输入抄送邮箱', trigger: 'blur' }],
        subject: [{ required: true, message: '请输入主题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      }
    }
  },
  methods: {
    confirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.emailForm
          let fd = new FormData()
          for (let key in params) {
            fd.append(key, params[key])
          }
          setMailApi(fd).then(res => {
            let type = 'success'
            if (res.state !== 1) {
              type = 'warning'
            }
            this.$message({
              type,
              message: res.info
            })
            this.getMailSetting()
          })
        } else {
          return false
        }
      })
    },
    getMailSetting() {
      let params = {
        id: 1
      }
      getMailApi(params).then(res => {
        this.emailForm = res
      })
    }
  },
  mounted() {
    this.getMailSetting()
  }
}
</script>

<style scoped lang="scss"></style>
