<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <el-form
      ref="form"
      :inline="true"
      :model="form"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="IP地址" prop="ip">
        <el-input v-model="form.ip"></el-input>
      </el-form-item>
      <el-form-item label="设备名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="跳转链接" prop="link">
        <el-input v-model="form.link"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="userName">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="form.desc" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    },
    equipData: {
      type: Object
    }
  },
  data() {
    return {
      dialogVisible: this.value,
      form: {
        ip: '',
        name: '',
        link: '',
        userName: '',
        password: '',
        desc: ''
      },
      rules: {
        ip: [{ required: true, message: '请输入IP地址', trigger: 'blur' }],
        name: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
        link: [{ required: true, message: '请输入跳转链接', trigger: 'blur' }],
        userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入描述内容', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('input', false)
    },
    confirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted() {
    if (this.equipData) {
      this.form = this.equipData
    }
  }
}
</script>

<style scoped lang="scss"></style>
