<template>
  <div class="batch-blocked">
    <el-dialog title="批量封禁" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <p>请选择防火墙:</p>
      <el-table
        class="mt10"
        v-loading="tableLoading"
        :data="fireWallData"
        border
        style="width: 100%"
        highlight-current-row
        @current-change="selectTable"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="name" label="防火墙名称"></el-table-column>
        <el-table-column prop="url" label="地址"></el-table-column>
        <el-table-column prop="created_time" label="创建时间"></el-table-column>
      </el-table>
      <el-pagination
        class="fr mt10"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <div class="clearfloat"></div>

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
import { batchBannedFileApi, getFireWallDataApi } from '../../tools/api'
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
      fileList: [],
      tableLoading: false,
      fireWallData: [{ id: 212, name: 'fsdfds' }],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      currentRow: {}
    }
  },
  methods: {
    fileChange(file) {
      this.fileList.push(file.raw)
    },
    fileRemove() {
      this.fileList = []
    },
    handleClose() {
      this.$emit('input', false)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getFireWallData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getFireWallData()
    },
    getFireWallData() {
      this.tableLoading = false
      getFireWallDataApi().then(res => {
        this.total = res.total
        this.fireWallData = res.data
        this.tableLoading = false
      })
    },
    selectTable(val) {
      this.currentRow = val
    },
    confirm() {
      let fd = new FormData()
      fd.append('file', this.fileList[0])
      fd.append('fid', this.currentRow.id)
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
  mounted() {
    this.getFireWallData()
  }
}
</script>

<style scoped lang="scss">
</style>
