<template>
  <div class="add-red-blue">
    <el-dialog
      class="add-red-blue-dialog"
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="130px">
        <el-form-item label="请输入IP或IP范围">
          <el-input v-model="form.ip"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onConfirm">确定</el-button>
        <el-button @click="handleClose">取消</el-button>
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
    },
    title: {
      type: String,
      default: ''
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
    onConfirm() {
      this.$emit('getIP', this.form)
      this.handleClose()
    }
  },
  mounted() {}
}
</script>

<style  lang="scss">
.add-red-blue {
  .el-dialog {
    // height: 40% !important;
  }
}
</style>
