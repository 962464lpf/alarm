<template>
  <el-dialog
    :title="computedTitle"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <!-- name: 防火墙名称，url: 防火墙地址，username：账号，password：密码 -->
    <el-form inline>
      <el-form-item label="防火墙名称：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="防火墙地址：">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="用户名：">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
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
      default: '添加防火墙'
    },
    currentRow: {}
  },
  data() {
    return {
      dialogVisible: this.value,
      form: {
        name: '',
        url: '',
        username: '',
        password: ''
      }
    }
  },
  computed: {
    computedTitle() {
      let title = ''
      if (this.title === 'add') {
        title = '新增防火墙'
      } else {
        title = '修改防火墙'
      }
      return title
    }
  },
  methods: {
    handleClose() {
      this.$emit('input', false)
    },
    confirm() {
      this.$emit('getFirewallForm', { type: this.title, form: this.form })
      this.handleClose()
    }
  },
  mounted() {
    if (this.title === 'edit') {
      this.form = {
        name: this.currentRow.name,
        url: this.currentRow.url,
        username: this.currentRow.username,
        password: this.currentRow.password
      }
    }
  }
}
</script>

<style  lang="scss">
</style>
