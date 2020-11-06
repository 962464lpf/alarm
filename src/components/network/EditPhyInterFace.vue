<template>
  <div class="edit-phyinterface-dialog">
    <el-dialog
      title="物理接口"
      center
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div class="my-elem-form">
        <el-form ref="form" :model="phyInterface" label-width="120px">
          <p class="color-green">基本信息</p>
          <el-form-item label="名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="MAC">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="启用状态">
            <el-radio label="1">启用</el-radio>
            <el-radio label="2">禁用</el-radio>
          </el-form-item>
          <el-form-item label="工作模式">
            <el-radio label="1">管理模式</el-radio>
            <el-radio label="2">桥模式</el-radio>
          </el-form-item>
          <el-form-item label="IPV4地址">
            <el-input></el-input>
            <span class="ml10 mr10 color-white">子网掩码</span>
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="IPV6地址">
            <el-input></el-input>
            <span class="ml10 mr10 color-white">前缀</span>
            <el-input></el-input>
          </el-form-item>
          <p class="color-green">高级属性设置</p>
          <el-form-item label="协商类型">
            <el-radio label="1">自协商</el-radio>
            <el-radio label="2">全双工</el-radio>
          </el-form-item>
          <el-form-item label="工作速率"></el-form-item>
          <el-form-item label="MTU">
            <el-input></el-input>
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
    currentRow: {},
  },
  data() {
    return {
      dialogVisible: this.value,
      phyInterface: {},
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
