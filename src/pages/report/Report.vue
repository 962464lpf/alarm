<template>
  <div class="report">
    <div class="fr mb10">
      <el-checkbox v-model="notsee_white">
        <span style="font-size: 12px;">不导出白名单数据</span>
      </el-checkbox>
      <el-button class="ml10">导出日报</el-button>
      <el-button>导出周报</el-button>
    </div>
    <div class="clearfloat"></div>
    <el-table class="mt10" v-loading="tableLoading" :data="reportData" style="width: 100%" border>
      <el-table-column prop="ip_addr" label="IP"></el-table-column>
      <el-table-column prop="created_time" label="创建时间"></el-table-column>
      <el-table-column prop="updated_time" label="更新时间"></el-table-column>
      <el-table-column label="操作" width="50">
        <template slot-scope="scope">
          <el-button type="text" @click.native="removeIP(scope.row)">移除</el-button>
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
  </div>
</template>

<script>
import { getReportListApi } from '../../tools/api'
export default {
  data() {
    return {
      notsee_white: false,
      tableLoading: false,
      reportData: [],
      pageSize: 10,
      total: 0,
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.getReportList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getReportList()
    },
    getReportList() {
      getReportListApi()
    }
  },
  mounted() {
    // this.getReportList()
  }
}
</script>

<style scoped lang="scss">
</style>
