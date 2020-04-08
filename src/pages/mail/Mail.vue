<template>
  <div class="mail">
    <el-form :model="emailForm"
             :rules="rules"
             ref="emailForm"
             label-width="100px">
      <el-form-item label="邮件服务器"
                    prop="email_server">
        <el-input v-model="emailForm.email_server"></el-input>
      </el-form-item>
      <el-form-item label="端口"
                    prop="port">
        <el-input v-model="emailForm.port"></el-input>
      </el-form-item>
      <el-form-item label="发件箱"
                    prop="from_addr">
        <el-input v-model="emailForm.from_addr"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input type="password"
                  v-model="emailForm.password"></el-input>
      </el-form-item>
      <el-form-item label="收件箱"
                    prop="to_addr">
        <el-input v-model="emailForm.to_addr"></el-input>
      </el-form-item>
      <el-form-item label="抄送"
                    prop="cc">
        <el-input v-model="emailForm.cc"></el-input>
      </el-form-item>
      <el-form-item label="主键"
                    prop="id">
        <el-input v-model="emailForm.id"></el-input>
      </el-form-item>
      <el-form-item label="主题"
                    prop="subject">
        <el-input v-model="emailForm.subject"></el-input>
      </el-form-item>
      <el-form-item label="内容"
                    prop="content">
        <el-input type='textarea'
                  v-model="emailForm.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancel('emailForm')">取消</el-button>
        <el-button type="primary"
                   @click="confirm('emailForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      emailForm: {
        email_server: '',
        port: '',
        from_addr: '',
        password: '',
        to_addr: '',
        cc: '',
        id: '',
        subject: '',
        content: ''
      },
      rules: {}
    }
  },
  methods: {
    cancel (formName) {
      this.$refs[formName].resetFields()
    },
    confirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          return false;
        }
      })
    }
  },
  mounted () {

  }
};
</script>

<style scoped lang="scss">
</style>
