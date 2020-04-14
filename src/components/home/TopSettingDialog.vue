<template>
  <el-dialog title="请选择统计周期" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <el-form>
      <el-form-item label="请选择统计周期：">
        <el-radio-group v-model="form.cycle">
          <el-radio label="day">天</el-radio>
          <el-radio label="week">周</el-radio>
          <el-radio label="month">月</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div class="fr">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
    <div class="clearfloat"></div>
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
      form: {
        cycle: 'day'
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('input', false)
    },
    confirm() {
      this.$emit('getTopSetting', this.form)
      this.handleClose()
    }
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
</style>
