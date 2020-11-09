<template>
  <div class="static-route my-elem-table my-elem-pagination">
    <el-button class="my-elem-btn fr" @click="deleteRoute()">清空</el-button>
    <el-button class="my-elem-btn fr mr10" @click="addRouteStatus=true">新建</el-button>
    <div class="clearfloat"></div>
    <el-table class="mt10" v-loading="tableLoading" :data="routeData" style="width: 100%" border>
      <el-table-column prop="destination" label="目的网段"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="ip_type" label="IP类型"></el-table-column>
      <el-table-column prop="gateway" label="网关"></el-table-column>
      <el-table-column prop="ether" label="物理接口"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="deleteRoute(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="fr mt10"
      background
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <div class="clearfloat"></div>
    <div v-if="addRouteStatus">
      <AddRoute v-model="addRouteStatus"></AddRoute>
    </div>
  </div>
</template>

<script>
import AddRoute from '../../components/network/AddRoute'
import { getStaticRouteData } from '../../tools/api'
export default {
  components: {
    AddRoute,
  },
  data() {
    return {
      tableLoading: false,
      routeData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      addRouteStatus: false,
    }
  },
  methods: {
    deleteRoute(row) {
      console.log(row)
      let str
      if (row) {
        str = '您确认删除该路由吗？'
      } else {
        str = '您确认删除所有路由吗？'
      }
      this.$confirm(str, '是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        let fd = new FormData()
        fd.append('id', row.id)
        let deleteReportApi
        deleteReportApi(fd).then((res) => {
          this.mixinPrompt(res, this.getStaticRoute)
        })
      })
    },
    handleCurrentChange() {},
    getStaticRoute() {
      getStaticRouteData().then((res) => {
        this.total = res.total
        this.routeData = res.data
      })
    },
  },
  mounted() {
    this.getStaticRoute()
  },
}
</script>

<style scoped lang="scss">
.static-route {
}
</style>
