<template>
  <div class="order">
    <el-dialog
      title="工单详情"
      center
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form :inline="true">
        <el-form-item label="时间选择">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            value-format="yyyy-MM-dd HH-mm-ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="exportFile">导出</el-button>
        <el-button type="primary" @click="handleClose">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { downloadOrderApi, formDownloadFile, BASE_URL } from '../../tools/api'
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
      time: []
    }
  },

  methods: {
    handleClose() {
      this.$emit('input', false)
    },
    exportFile() {
      let fd = new FormData()
      fd.append('start_time', this.time[0] ? this.time[0] : '')
      fd.append('end_time', this.time[1] ? this.time[1] : '')
      downloadOrderApi(fd).then(res => {
        if (res.file_path) {
          let url = BASE_URL + res.file_path
          formDownloadFile(url)
          this.handleClose()
        } else {
          this.$message({
            type: 'success',
            message: res.info
          })

          this.handleClose()
        }
      })
    }
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
</style>
