<template>
  <div class="batch-blocked">
    <el-dialog title="批量封禁" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-upload
        class="upload-demo"
        :auto-upload="false"
        :limit="1"
        action
        accept=".xls, .xlsx"
        :on-change="fileChange"
        :on-remove="fileRemove"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { batchBannedFileApi } from '../../tools/api'
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
      fileList: []
    }
  },
  methods: {
    fileChange(file) {
      this.fileList.push(file)
    },
    fileRemove() {
      this.fileList = []
    },
    handleClose() {
      this.$emit('input', false)
    },
    confirm() {
      let fd = new FormData()
      fd.append('file', this.fileList[0])
      batchBannedFileApi(fd).then(res => {
        let type = 'success'
        let message = '批量封禁成功'
        if (res.state !== this.successFlag) {
          type = 'warning'
          message = res.info
        } else {
          this.$emit('updateTableData')
          this.handleClose()
        }
        this.$message({
          type,
          message
        })
      })
    }
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
</style>
