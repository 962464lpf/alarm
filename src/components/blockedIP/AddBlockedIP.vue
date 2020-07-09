<template>
  <el-dialog title="添加封禁IP"
             :visible.sync="dialogVisible"
             width="60%"
             :before-close="handleClose">
    <el-form>
      <el-form-item label="IP：">
        <el-input v-model="form.ip"></el-input>
      </el-form-item>
    </el-form>
    <p>请选择防火墙:</p>
    <el-table class="mt10"
              v-loading="tableLoading"
              :data="fireWallData"
              border
              style="width: 100%"
              highlight-current-row
              @current-change="selectTable">
      <el-table-column type="index"
                       width="50"></el-table-column>
      <el-table-column prop="name"
                       label="防火墙名称"></el-table-column>
      <el-table-column prop="url"
                       label="地址"></el-table-column>
      <el-table-column prop="created_time"
                       label="创建时间"></el-table-column>
    </el-table>
    <el-pagination class="fr mt10"
                   background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[10, 20, 30, 40]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total"></el-pagination>
    <div class="clearfloat"></div>

    <span slot="footer"
          class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary"
                 @click="confirm">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getFireWallDataApi } from '../../tools/api'
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
      form: {
        ip: '',
        id: ''
      },
      tableLoading: false,
      fireWallData: [{ id: 212, name: 'fsdfds' }],
      currentPage: 1,
      pageSize: 10,
      total: 0

    }
  },
  methods: {
    handleClose () {
      this.$emit('input', false)
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getFireWallData()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getFireWallData()
    },
    getFireWallData () {
      this.tableLoading = false
      getFireWallDataApi().then(res => {
        this.total = res.total
        this.fireWallData = res.data
        this.tableLoading = false
      })
    },
    selectTable (val) {
      this.form.id = val.id
    },
    confirm () {
      this.$emit('getAddBlockedIP', this.form)
      this.handleClose()
    }
  },
  mounted () {
    this.getFireWallData()
  }
}
</script>

<style  lang="scss">
.top-setting-dialog {
  .el-dialog {
    // height: 40% !important;
  }
}
</style>
