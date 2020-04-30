<template>
  <div class="blocked-ip">
    <el-form :inline="true" :model="form">
      <el-form-item label="IP地址">
        <el-input v-model="form.ip" placeholder="请输入IP地址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="onReset">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="tableLoading" :data="blockedIP" border style="width: 100%">
      <el-table-column prop="ip" label="IP地址"></el-table-column>
      <el-table-column prop="created_time" label="封禁时间"></el-table-column>
      <el-table-column prop="uname" label="封禁人"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="unBlockedIP(scope.row)">解封</el-button>
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

    <div v-if="addBlockedIPStatus">
      <addBlockedIP v-model="addBlockedIPStatus" @getAddBlockedIP="getAddBlockedIP"></addBlockedIP>
    </div>
  </div>
</template>

<script>
import { getBlockedIApi, unBlockedIPApi, aKeyBlockedApi } from '../../tools/api'
import addBlockedIP from '../../components/blockedIP/AddBlockedIP'
import { mapState } from 'vuex'
export default {
  components: {
    addBlockedIP
  },
  data() {
    return {
      form: {
        ip: ''
      },
      tableLoading: false,
      blockedIP: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      addBlockedIPStatus: false
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    onSearch() {
      this.getBlockedIP()
    },
    onReset() {
      this.form.ip = ''
      this.getBlockedIP()
    },
    onAdd() {
      this.addBlockedIPStatus = true
    },
    getAddBlockedIP(form) {
      let fd = new FormData()
      fd.append('ip', form.ip)
      fd.append('id', this.userInfo.id)
      aKeyBlockedApi(fd).then(res => {
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
    unBlockedIP(row) {
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
    handleSizeChange(val) {
      this.pageSize = val
      this.getBlockedIP()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getBlockedIP()
    },
    getBlockedIP() {
      this.tableLoading = true
      let fd = new FormData()
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
  mounted() {
    this.getBlockedIP()
  }
}
</script>

<style scoped lang="scss">
</style>
