<template>
  <div class="edit-phyinterface-dialog">
    <el-dialog
      title="添加静态路由"
      center
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div class="my-elem-form">
        <el-form ref="form" :model="staticRoute" label-width="120px">
          <el-form-item label="目的IP">
            <el-input type="textarea" rows="5" placeholder="0.0.0.0/0"></el-input>
          </el-form-item>
          <el-form-item label="网关">
            <el-input placeholder="A.B.C.D或X:X:X:X:"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitEdit">保存</el-button>
        <el-button type="primary" @click="handleClose">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: this.value,
      staticRoute: {},
    }
  },
  methods: {
    handleClose() {
      this.$emit('input', false)
    },
    submitEdit() {},
  },
  mounted() {},
}
</script>

<style  lang="scss">
.edit-phyinterface-dialog {
  .color-white {
    color: white;
  }
  .color-green {
    color: #95d214;
  }
  .el-input {
    width: 200px !important;
  }
}
</style>
