<template>
  <div class="batch-blocked">
    <el-dialog title="批量封禁" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form>
        <el-form-item label="IP：">
          <el-input v-model="form.ip"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
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
    return {
      dialogVisible: this.value,
      form: {
        ip: ''
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('input', false)
    },
    confirm() {
      this.$emit('getAddBlockedIP', this.form)
      this.handleClose()
    }
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
</style>
