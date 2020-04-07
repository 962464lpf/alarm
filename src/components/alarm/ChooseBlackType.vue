<template>
  <el-dialog title="请选择黑名单类型"
             :visible.sync="dialogVisible"
             width="30%"
             :before-close="handleClose">
    <el-radio-group v-model="type">
      <el-radio :label="0">红</el-radio>
      <el-radio :label="1">蓝</el-radio>
      <el-radio :label="2">重点监控</el-radio>
    </el-radio-group>
    <el-row class="mt10 fr ">
      <el-button type="primary"
                 @click="emitChooseType">确定</el-button>
    </el-row>
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
  data () {
    return {
      dialogVisible: this.value,
      type: 2
    }
  },
  methods: {
    handleClose () {
      this.$emit('input', false)
    },
    emitChooseType () {
      this.$emit('emitChooseType', this.type)
      this.handleClose()
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss"></style>
