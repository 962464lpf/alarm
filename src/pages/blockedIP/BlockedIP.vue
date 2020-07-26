<template>
  <div class="blocked-ip">
    <el-form :inline="true"
             :model="form">
      <el-form-item label="IP地址">
        <el-input v-model="form.ip"
                  placeholder="请输入IP地址"></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker v-model="form.time"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH-mm-ss"></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="onSearch">查询</el-button>
        <el-button type="primary"
                   @click="onReset">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onAdd">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="exportFlie">导出</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="batchBlockedIPStatus = true">批量封禁</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="downloadBlockedFile">下载封禁模板</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="tableLoading"
              :data="blockedIP"
              border
              style="width: 100%">
      <el-table-column prop="ip"
                       label="IP地址"></el-table-column>
      <el-table-column prop="fname"
                       label="封禁防火墙"></el-table-column>
      <el-table-column prop="created_time"
                       label="封禁时间"></el-table-column>
      <el-table-column prop="uname"
                       label="封禁人"></el-table-column>
      <el-table-column label="操作"
                       width="100">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     @click="unBlockedIP(scope.row)">解封</el-button>
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

    <div v-if="addBlockedIPStatus">
      <addBlockedIP v-model="addBlockedIPStatus"
                    @getAddBlockedIP="getAddBlockedIP"></addBlockedIP>
    </div>
    <div v-if="batchBlockedIPStatus">
      <batchBlockedIP v-model="batchBlockedIPStatus"
                      @updateTableData="getBlockedIP"></batchBlockedIP>
    </div>
  </div>
</template>

<script>
import {
  getBlockedIApi,
  unBlockedIPApi,
  aKeyBlockedApi,
  downloadBlockedIPApi,
  downloadFileApi,
  BASE_URL
} from '../../tools/api'
import addBlockedIP from '../../components/blockedIP/AddBlockedIP'
import batchBlockedIP from '../../components/blockedIP/BatchBlockedIP'

import { mapState } from 'vuex'
export default {
  components: {
    addBlockedIP,
    batchBlockedIP
  },
  data () {
    return {
      form: {
        ip: '',
        time: ['', '']
      },
      tableLoading: false,
      blockedIP: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      addBlockedIPStatus: false,
      batchBlockedIPStatus: false
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    exportFlie () {
      let fd = new FormData()
      fd.append('start_time', this.form.time[0])
      fd.append('end_time', this.form.time[1])
      fd.append('ip', this.form.ip)
      downloadBlockedIPApi(fd).then(res => {
        let url = BASE_URL + res.file_path
        let type = 'application/vnd.ms-excel'
        downloadFileApi(url).then(res => {
          let blob = new Blob([res], { type })
          let url = window.URL.createObjectURL(blob)
          let a = document.createElement('a')
          a.setAttribute('download', '封禁列表')
          a.setAttribute('href', url)
          a.click()
        })
      })
    },
    onSearch () {
      this.getBlockedIP()
    },
    onReset () {
      this.form.ip = ''
      this.form.time = ['', '']
      this.getBlockedIP()
    },
    onAdd () {
      this.addBlockedIPStatus = true
    },
    downloadBlockedFile () {
      let a = document.createElement('a')
      a.setAttribute('download', '模板')
      a.setAttribute('href', BASE_URL + '/forbidden_moban.xlsx')
      a.click()
    },
    getAddBlockedIP (form) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let fd = new FormData()
      fd.append('ip', form.ip)
      fd.append('fid', form.id)
      aKeyBlockedApi(fd).then(res => {
        loading.close()
        let type = 'success'
        if (res.state !== this.successFlag) {
          type = 'warning'
        } else {
          this.getBlockedIP()
        }
        this.$message({
          type,
          message: res.info
        })
      })
    },
    unBlockedIP (row) {
      if (this.userInfo.level === 0) {
        this.$confirm('您确定要将此IP进行解封吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let fd = new FormData()
          fd.append('ip', row.ip)
          unBlockedIPApi(fd).then(res => {
            let type = 'success'
            if (res.state !== this.successFlag) {
              type = 'warning'
            } else {
              this.getBlockedIP()
            }
            this.$message({
              type,
              message: res.info
            })
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: '您没有权限执行此操作，请与管理员联系。'
        })
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getBlockedIP()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getBlockedIP()
    },
    getBlockedIP () {
      this.tableLoading = true
      let fd = new FormData()
      fd.append('start_time', this.form.time[0])
      fd.append('end_time', this.form.time[1])
      fd.append('page', this.currentPage)
      fd.append('per_page', this.pageSize)
      fd.append('ip', this.form.ip)
      getBlockedIApi(fd).then(res => {
        this.tableLoading = false
        this.blockedIP = res.data
        this.total = res.total
      })
    }
  },
  mounted () {
    this.getBlockedIP()
  }
}
</script>

<style scoped lang="scss">
.blocked-ip {
  .el-date-editor--datetimerange.el-input,
  .el-date-editor--datetimerange.el-input__inner {
    width: 200px;
  }
}
</style>
