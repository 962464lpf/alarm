<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
    <el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="IP地址" prop="ip">
        <el-input v-model="form.ip"></el-input>
      </el-form-item>
      <el-form-item label="设备名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="跳转链接" prop="link">
        <el-input v-model="form.link"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
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
import { editSafeEquipApi, addSafeEquipApi } from '../../tools/api'
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
        username: '',
        password: '',
        desc: ''
      },
      rules: {
        ip: [{ required: true, message: '请输入IP地址', trigger: 'blur' }],
        name: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
        link: [{ required: true, message: '请输入跳转链接', trigger: 'blur' }],
        // username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        // password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入描述内容', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('input', false)
    },
    promptMessage(type, message) {
      this.$message({
        type,
        message
      })
      if (type === 'success') {
        this.handleClose()
        this.$emit('getSateEquipList')
      }
    },
    confirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let message
          let type = 'success'
          let fd = new FormData()
          for (let key in this.form) {
            fd.append(key, this.form[key])
          }
          if (this.equipData) {
            editSafeEquipApi(fd).then(res => {
              if (res.state === 1) {
                message = '修改成功'
              } else {
                message = '修改失败'
                type = 'warning'
              }
              this.promptMessage(type, message)
            })
          } else {
            addSafeEquipApi(fd).then(res => {
              if (res.state === 1) {
                message = '新增成功'
              } else {
                message = '新增失败'
                type = 'warning'
              }
              this.promptMessage(type, message)
            })
          }
        } else {
          return false
        }
      })
    }
  },
  mounted() {
    if (this.equipData) {
      this.form = JSON.parse(JSON.stringify(this.equipData))
    }
  }
}
</script>

<style scoped lang="scss"></style>
