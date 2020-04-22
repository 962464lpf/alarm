<template>
  <div class="blocked-ip">
    <el-form :inline="true" :model="form">
      <el-form-item label="IP">
        <el-input v-model="form.ip" placeholder="IP"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="onReset">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="blockedIP" border style="width: 100%">
      <el-table-column prop="ip" label="IP地址"></el-table-column>
      <el-table-column prop="created_time" label="封禁时间"></el-table-column>
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
export default {
  components: {
    addBlockedIP
  },
  data() {
    return {
      form: {
        ip: ''
      },
      blockedIP: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      addBlockedIPStatus: false
    }
  },
  methods: {
    onSearch() {},
    onReset() {},
    onAdd() {
      this.addBlockedIPStatus = true
    },
    getAddBlockedIP(form) {
      let fd = new FormData()
      fd.append('ip', form.ip)
      aKeyBlockedApi(fd).then(res => {
        let type = 'success'
        if (res.state !== 1) {
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
      let fd = new FormData()
      fd.append('ip', row.ip)
      unBlockedIPApi(fd).then(res => {
        let type = 'success'
        if (res.state !== 1) {
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
    handleSizeChange(val) {
      this.pageSize = val
      this.getBlockedIP()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getBlockedIP()
    },
    getBlockedIP() {
      let fd = new FormData()
      fd.append('page', this.currentPage)
      fd.append('per_page', this.pageSize)
      getBlockedIApi(fd).then(res => {
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
