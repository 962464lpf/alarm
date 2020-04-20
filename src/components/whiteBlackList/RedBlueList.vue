<template>
  <div class="black-white-list">
    <el-table :data="blackIPData" style="width: 100%">
      <el-table-column prop="ip_addr" label="IP" align="center"></el-table-column>
      <el-table-column prop="created_time" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="created_time" label="描述" align="center"></el-table-column>
    </el-table>
    <el-pagination
      class="fr clearfix mt10"
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
  </div>
</template>

<script>
import { getWhiteIPListApi } from '../../tools/api'
export default {
  props: {
    type: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      blackIPData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.getIPList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getIPList()
    },
    getIPList() {
      let getListFun = getWhiteIPListApi
      let params = {
        page: 1
      }
      if (this.type !== 'red') getListFun = getWhiteIPListApi
      getListFun(params).then(res => {
        this.blackIPData = res.data
        this.total = res.total
      })
    }
  },
  mounted() {
    this.getIPList()
  }
}
</script>

<style scoped lang="scss">
</style>
