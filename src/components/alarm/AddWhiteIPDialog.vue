<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
    <el-radio-group v-model="radio">
      <el-row class="mt10">
        <el-radio :label="getLable('sip')">恶意IP:{{row.sip}}</el-radio>
      </el-row>
      <el-row class="mt10">
        <el-radio :label="getLable('dip')">目的IP:{{row.dip}}</el-radio>
      </el-row>
      <!-- <el-row class="mt10">
        <el-radio :label="getLable('device_ip')">告警来源:{{row.device_ip}}</el-radio>
      </el-row>-->
      <el-row class="mt10">
        <el-radio :label="getLable('con')">描述: {{row.con}}</el-radio>
      </el-row>
      <el-row class="mt10">
        <el-radio :label="getLable('attack_type')">攻击类型: {{row.attack_type}}</el-radio>
      </el-row>
      <!-- <el-row class="mt10">
        <el-radio
          :label="getLable('level')"
        >攻击等级: {{row.level == 0 ? '高' : row.level == 1 ? '中' : '低'}}</el-radio>
      </el-row>-->
    </el-radio-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { setWhiteIPApi } from '../../tools/api'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    row: {
      default: {}
    }
  },
  data() {
    return {
      dialogVisible: this.value,
      title: '添加至白名单',
      radio: ''
    }
  },
  methods: {
    getLable(key) {
      return key + ',' + this.row[key]
    },
    handleClose() {
      this.$emit('input', false)
    },
    submit() {
      let a = this.radio.split(',')
      let flag = a[0]
      let value = a[1]
      let fd = new FormData()
      fd.append('flag', flag)
      fd.append('value', value)
      setWhiteIPApi(fd).then(res => {
        let type = 'success'
        let message = '设置成功'
        if (res.state !== this.successFlag) {
          type = 'warning'
          message = res.info
        }
        this.$message({
          type,
          message
        })
      })
      this.handleClose()
      this.$emit('getCurrentAlarmList')
    }
  },
  mounted() {}
}
</script>

<style scoped lang="scss"></style>
