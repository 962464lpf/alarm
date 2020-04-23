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
      <el-form-item label="角色：">
        <el-select v-model="form.level" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
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
      default: false
    }
  },
  data() {
    return {
      dialogVisible: this.value,
      options: [
        {
          label: '管理员',
          value: 2
        },
        {
          label: '普通用户',
          value: 1
        }
      ],
      form: {
        name: '',
        password: '',
        level: 1
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('input', false)
    },
    confirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('getUserForm', this.form)
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

<style  lang="scss">
.top-setting-dialog {
  .el-dialog {
    // height: 40% !important;
  }
}
</style>
