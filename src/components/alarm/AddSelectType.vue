<template>
  <el-dialog title="请选择导出内容" :visible.sync="dialogVisible" width="35%" :before-close="handleClose">
    <!-- 恶意IP sip 位置 wuli_addr 目的IP dip 描述 con 攻击时间 协议 protocol attack_time 告警来源 device_ip 攻击类型 attack_type -->
    <el-form :inline="true">
      <el-form-item label>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <el-checkbox-group
          v-model="selectType"
          @change="handleCheckedCitiesChange"
          class="checkbox-group"
        >
          <el-checkbox
            v-for="item in selectItems"
            :label="item.label"
            :key="item.label"
          >{{item.name}}</el-checkbox>
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
      default: false,
    },
  },
  data() {
    return {
      isIndeterminate: true,
      checkAll: false,
      dialogVisible: this.value,
      selectType: [],
      allSelectType: [
        'sip',
        'wuli_addr',
        'dip',
        'attack_time',
        'device_ip',
        'attack_type',
        'protocol',
        'summary_num',
        'con',
      ],
      selectItems: [
        {
          label: 'sip',
          name: '恶意IP',
        },
        {
          label: 'wuli_addr',
          name: '位置',
        },
        {
          label: 'dip',
          name: '目的IP',
        },
        {
          label: 'attack_time',
          name: '攻击时间',
        },
        {
          label: 'device_ip',
          name: '告警来源',
        },
        {
          label: 'attack_type',
          name: '攻击类型',
        },
        {
          label: 'protocol',
          name: '协议',
        },
        {
          label: 'summary_num',
          name: '次数',
        },
        {
          label: 'con',
          name: '描述',
        },
      ],
    }
  },
  methods: {
    handleClose() {
      this.$emit('input', false)
    },

    confirm() {
      this.$emit('emitSelectTyepe', this.selectType)
      this.handleClose()
    },
    handleCheckAllChange(val) {
      this.selectType = val ? this.allSelectType : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.allSelectType.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.allSelectType.length
    },
  },
  mounted() {},
}
</script>

<style  lang="scss">
.checkbox-group {
  .el-checkbox {
    width: 80px;
  }
}
</style>
