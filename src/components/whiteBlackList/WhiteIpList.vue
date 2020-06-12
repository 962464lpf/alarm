<template>
  <div class="mt10">
    <el-table v-loading="tableLoading" :data="tableDataList" style="width: 100%" border>
      <el-table-column prop="value" :label="label"></el-table-column>
      <el-table-column prop="created_time" label="创建时间"></el-table-column>
      <el-table-column prop="updated_time" label="更新时间"></el-table-column>
      <el-table-column label="操作" width="50">
        <template slot-scope="scope">
          <el-button type="text" @click.native="removeIP(scope.row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      class="fr mt10"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>-->
    <div class="clearfloat"></div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'sip'
    },
    label: {
      type: String,
      default: '恶意IP'
    },
    tableData: {}
  },
  watch: {
    tableData(val) {
      this.tableDataList = val[this.type]
    }
  },
  data() {
    return {
      tableLoading: false,
      currentPage: 1,
      pageSize: 10,
      tableDataList: [],
      total: 0
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.getWhiteIPList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getIPList()
    },

    removeIP(row) {
      this.$confirm('您确定要移除此IP?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('removeIP', row)
      })
    }
  },
  mounted() {
    this.tableDataList = this.tableData[this.type]
    this.total = this.tableDataList
  }
}
</script>

<style scoped lang="scss">
</style>
