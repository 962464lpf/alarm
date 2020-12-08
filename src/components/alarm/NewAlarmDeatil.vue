<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="45%"
    :before-close="handleClose"
  >
    <el-row class="newalarm-detail">
      <el-col :span="12">
        <span>恶意IP：{{ alarmData.sip }}</span>
      </el-col>
      <el-col :span="12">
        <span>位置：{{ alarmData.wuli_addr }}</span>
      </el-col>
      <el-col :span="12"
        ><span>目的IP：{{ alarmData.dip }}</span></el-col
      >
      <el-col :span="12">
        <span>告警来源：{{ alarmData.device_ip }}</span></el-col
      >
      <el-col :span="12"
        ><span>描述：{{ alarmData.con }}</span></el-col
      >
      <el-col :span="12"
        ><span
          >攻击类型：{{
            alarmData.attack_type ? alarmData.attack_type : '未知'
          }}</span
        ></el-col
      >
      <el-col :span="12"
        ><span>协议：{{ alarmData.protocol }}</span></el-col
      >
      <el-col :span="12">
        <span>攻击时间：{{ alarmData.attack_time }}</span></el-col
      >
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    alarmData: {},
  },
  data() {
    return {
      dialogVisible: this.value,
      title: '',
      dataSetail: [],
    }
  },
  methods: {
    handleClose() {
      this.$emit('input', false)
    },
  },
  mounted() {
    this.title = `${this.alarmData.sip}攻击详情`
    for (let key in this.alarmData) {
      let obj = {}
      obj[key] = this.alarmData[key]
      this.dataSetail[obj]
    }
  },
}
</script>

<style lang="scss">
.checkbox-group {
  .el-checkbox {
    width: 80px;
  }
}
.newalarm-detail {
  span {
    display: inline-block;
    line-height: 40px;
    color: white;
  }
}
</style>
