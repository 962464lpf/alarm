<template>
  <div class="assetes-entry">
    <el-row>
      <el-col>
        <el-button type="primary" @click="assetsEntry">资产录入</el-button>
      </el-col>
    </el-row>
    <el-table class="mt10" v-loading="tableLoading" :data="assetsData" style="width: 100%" border>
      <el-table-column prop="ip" label="IP"></el-table-column>
      <el-table-column prop="domain" label="域名"></el-table-column>
      <el-table-column prop="name" label="平台名称"></el-table-column>
      <el-table-column prop="created_time" label="创建时间"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" @click.native="detail(scope.row)">详情</el-button>
          <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
            <el-button
              class="my-elem-btn"
              icon="el-icon-edit"
              size="small"
              @click.native="edit(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
            <el-button
              class="my-elem-btn"
              icon="el-icon-delete"
              size="small"
              @click.native="deleteRow(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
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

    <div v-if="assetsDialogStatus">
      <AssetsDialog
        v-model="assetsDialogStatus"
        :title="assetsDialogTitle"
        :type="assetsDialogType"
        :footerStatus="footerStatus"
        :currentAssetsData="currentAssetsData"
        @updateAssetsData="getAsslistList"
      ></AssetsDialog>
    </div>
  </div>
</template>

<script>
import { getAssetsListApi, deleteAssetsApi } from '../../tools/api'
import AssetsDialog from '../../components/report/AssetsDialog'

export default {
  components: {
    AssetsDialog,
  },
  data() {
    return {
      tableLoading: false,
      assetsDialogStatus: false,
      assetsDialogTitle: '',
      assetsDialogType: '',
      footerStatus: false,
      currentAssetsData: {},
      assetsData: [],
      pageSize: 10,
      total: 0,
      currentPage: 1,
    }
  },
  methods: {
    deleteRow(row) {
      this.$confirm('此操作将永久该资产信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        let fd = new FormData()
        fd.append('id', row.id)
        deleteAssetsApi(fd).then((res) => {
          let type = 'success'
          let message = '删除成功'
          if (res.state !== this.successFlag) {
            type = 'warning'
            message = res.info
          } else {
            this.getAsslistList()
          }
          this.$message({
            type,
            message,
          })
        })
      })
    },
    assetsEntry() {
      this.assetsDialogType = 'add'
      this.assetsDialogStatus = true
      this.assetsDialogTitle = '资产录入'
      this.footerStatus = true
    },
    detail(row) {
      this.assetsDialogType = 'detail'
      this.assetsDialogStatus = true
      this.assetsDialogTitle = '资产查看'
      this.footerStatus = false
      this.currentAssetsData = row
    },
    edit(row) {
      this.assetsDialogType = 'edit'
      this.assetsDialogStatus = true
      this.assetsDialogTitle = '资产修改'
      this.footerStatus = true
      this.currentAssetsData = row
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getAsslistList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getAsslistList()
    },
    getAsslistList() {
      let fd = new FormData()
      fd.append('page', this.currentPage)
      fd.append('per_page', this.pageSize)
      this.tableLoading = true
      getAssetsListApi(fd).then((res) => {
        this.tableLoading = false
        this.assetsData = res.data
        this.total = res.total
      })
    },
  },
  mounted() {
    this.getAsslistList()
  },
}
</script>

<style scoped lang="scss">
.assetes-entry {
}
</style>
