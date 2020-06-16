<template>
  <el-dialog title="请选择导出内容" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
    <!-- 恶意IP sip 位置 wuli_addr 目的IP dip 描述 con 攻击时间 协议 protocol attack_time 告警来源 device_ip 攻击类型 attack_type -->
    <el-form :inline="true">
      <el-form-item label>
        <el-checkbox-group v-model="selectType">
          <el-checkbox label="sip" name="sip">恶意IP</el-checkbox>
          <el-checkbox label="wuli_addr" name>位置</el-checkbox>
          <el-checkbox label="dip" name="dip">目的IP</el-checkbox>
          <el-checkbox label="attack_time" name="attack_time">攻击时间</el-checkbox>
          <el-checkbox label="device_ip" name="device_ip">告警来源</el-checkbox>
          <el-checkbox label="attack_type" name="attack_type">攻击类型</el-checkbox>
          <el-checkbox label="protocol" name="protocol">协议</el-checkbox>
          <el-checkbox label="summary_num" name="summary_num">次数</el-checkbox>
          <el-checkbox label="con" name="con">描述</el-checkbox>
          <el-checkbox label name>选择所有</el-checkbox>
        </el-checkbox-group>
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
    }
  },
  data() {
    return {
      dialogVisible: this.value,
      selectType: []
    }
  },
  methods: {
    handleClose() {
      this.$emit('input', false)
    },

    confirm() {
      this.$emit('emitSelectTyepe', this.selectType)
      this.handleClose()
    }
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
</style>
