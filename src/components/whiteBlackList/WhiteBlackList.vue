<template>
  <div class="black-white-list">
    <el-table :data="blackIPData"
              style="width: 100%">
      <el-table-column prop="ip_addr"
                       label="IP"> </el-table-column>
      <el-table-column prop="wuli_addr"
                       label="物理地址"> </el-table-column>
      <el-table-column prop="created_time"
                       label="创建时间"> </el-table-column>
      <el-table-column prop="updated_time"
                       label="更新时间"> </el-table-column>
    </el-table>
    <el-pagination class="fr clearfix mt10"
                   background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[10, 20, 30, 40]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { getWhiteIPListApi } from '../../tools/api'
export default {
  props: {
    type: {
      type: String,
      default: 'white'
    }
  },
  data () {
    return {
      blackIPData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      this.getWhiteIPList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getIPList()
    },
    getIPList () {
      let getListFun = getWhiteIPListApi
      let params = {
        page: 1
      }
      if (this.type !== 'white') getListFun = getWhiteIPListApi
      getListFun(params).then(res => {
        this.blackIPData = res.data
        this.total = res.total
      })
    }
  },
  mounted () {
    this.getIPList()
  }
};
</script>

<style scoped lang="scss">
</style>
