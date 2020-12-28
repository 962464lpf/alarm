<template>
  <el-dialog
    :title="title"
    class="top-setting-dialog"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <el-form ref="userForm" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="角色名称：" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="form.desc" type="textarea" :rows="3"></el-input>
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
    rowData: {
      default: '',
    },
    type: {},
  },
  data() {
    return {
      dialogVisible: this.value,
      title: '',
      form: {
        name: '',
        desc: '',
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
        ],
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
          this.$emit('getRoleForm', this.form)
          this.handleClose()
        } else {
          return false
        }
      })
    },
  },
  mounted() {
    this.form = this.rowData
    this.title = this.type === 'add' ? '新增角色' : '修改角色'
  },
}
</script>

<style lang="scss">
.top-setting-dialog {
  .el-dialog {
    // height: 40% !important;
  }
}
</style>
