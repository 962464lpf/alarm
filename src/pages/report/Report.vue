<template>
  <div class="report">
    <el-row>
      <el-form :inline="true"
               :model="searchForm"
               class="demo-form-inline">
        <el-form-item label="统计日期">
          <el-date-picker v-model="searchForm.date"
                          type="date"
                          range-separator="至"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="getReportList"
                     type="primary">查询</el-button>
          <el-button @click="resetData">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="createReportStatus=true"
                     type="primary">生成报告</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <div class="clearfloat"></div>
    <el-table class="mt10"
              v-loading="tableLoading"
              :data="reportData"
              style="width: 100%"
              border>
      <el-table-column prop="name"
                       label="报告名称"></el-table-column>
      <el-table-column prop="url"
                       label="报告地址">
        <template slot-scope="scope">
          <el-tooltip class="item"
                      effect="dark"
                      :content="scope.row.url"
                      placement="bottom">
            <span class="curp omit">{{ scope.row.url}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="type"
                       label="报告类型"></el-table-column>
      <el-table-column prop="tongji_riqi"
                       label="统计日期"></el-table-column>
      <el-table-column prop="created_time"
                       label="创建时间"></el-table-column>
      <el-table-column label="操作"
                       width="50">
        <template slot-scope="scope">
          <el-button type="text"
                     @click.native="downloadReport(scope.row)">下载</el-button>
          <el-button type="text"
                     @click.native="deleteReport(scope.row)">删除</el-button>
        </template>
      </el-table-column>
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

    <div v-if="createReportStatus">
      <CreateReportComp v-model="createReportStatus"
                        @reportOpt="createReport"></CreateReportComp>
    </div>
  </div>
</template>

<script>
import CreateReportComp from '../../components/report/CreateReportComp'
import {
  getReportListApi,
  downloadFileApi,
  BASE_URL,
  createReportApi,
  deleteReportApi
} from '../../tools/api'
export default {
  components: {
    CreateReportComp
  },
  data () {
    return {
      searchForm: {
        date: ''
      },
      notsee_white: false,
      tableLoading: false,
      reportData: [],
      pageSize: 10,
      total: 0,
      currentPage: 1,
      createReportStatus: false
    }
  },
  methods: {
    resetData () {
      this.searchForm.date = ''
      this.getReportList()
    },
    createReport ({ dateTime, equipIds }) {
      this.$message({
        type: 'success',
        message: '报告正在生成中，请等待！',
        duration: 1500
      })
      let fd = new FormData()
      fd.append('start_time', dateTime[0] ? dateTime[0] : '')
      fd.append('end_time', dateTime[1] ? dateTime[1] : '')
      fd.append('id', equipIds)
      createReportApi(fd)
        .then(res => {
          let type = 'success'
          if (res.state !== this.successFlag) {
            type = 'warning'
          } else {
            this.getReportList()
          }
          this.$message({
            type,
            message: res.info
          })
        })
        .catch(() => {
          this.$message({
            type: 'warning',
            message: '生成报告失败，请联系管理员。'
          })
        })
    },
    downloadReport (row) {
      let length = row.url.split('.').length
      let type = row.url.split('.')[length - 1]
      let name = row.url.split('.')[0].split('/')[
        row.url.split('.')[0].split('/').length - 1
      ]
      let mime = ''
      if (type.indexOf('doc') > -1) {
        mime = 'application/msword'
      } else {
        mime = 'application/vnd.ms-excel'
      }
      downloadFileApi(BASE_URL + '/' + row.url).then(res => {
        let blob = new Blob([res], { type: mime })
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.setAttribute('href', url)
        a.download = `${name}.${type}`
        a.click()
      })
    },
    deleteReport (row) {
      this.$confirm('您确认删除该调报告吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let fd = new FormData()
        fd.append('id', row.id)
        deleteReportApi(fd).then(res => {
          let type = 'success'
          let message = '删除成功'
          if (res.state !== this.successFlag) {
            type = 'warning'
            message = res.info
          } else {
            this.getReportList()
          }
          this.$message({
            type,
            message
          })
        })
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getReportList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getReportList()
    },
    getReportList () {
      let fd = new FormData()
      // page,  per_page
      fd.append('page', this.currentPage)
      fd.append('per_page', this.pageSize)
      fd.append('tongji_riqi', this.searchForm.date)

      getReportListApi(fd).then(res => {
        this.total = res.total
        this.reportData = res.data
      })
    }
  },
  mounted () {
    this.getReportList()
  }
}
</script>

<style scoped lang="scss">
</style>
