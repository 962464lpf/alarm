<template>
  <div class="mt10">
    <el-table v-loading="tableLoading" :data="blackIPData" style="width: 100%" border>
      <el-table-column prop="ip_addr" label="IP"></el-table-column>
      <el-table-column label="物理地址">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.wuli_addr" placement="bottom">
            <span class="curp omit">
              {{
              scope.row.wuli_addr
              }}
            </span>
          </el-tooltip>
        </template>
      </el-table-column>
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
import { getIPListApi } from '../../tools/api'
export default {
  props: {
    type: {
      type: String,
      default: 'white'
    },
    ifGetIP: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableLoading: false,
      blackIPData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10
    }
  },
  watch: {
    ifGetIP(val) {
      if (val) {
        this.getIPList()
      }
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
    getIPList() {
      this.tableLoading = true
      let fd = new FormData()
      fd.append('page', this.currentPage)
      fd.append('per_page', this.pageSize)
      let type = ''
      // 0：白名单，1：红，2：蓝，3：重点监控 4: 黑名单
      switch (this.type) {
        case 'white':
          type = 0
          break
        case 'black':
          type = 4
          break
        case 'red':
          type = 1
          break
        case 'blue':
          type = 2
          break
        case 'importt':
          type = 4
          break
        default:
          type = 0
      }
      fd.append('type', type)

      getIPListApi(fd).then(res => {
        this.tableLoading = false
        this.blackIPData = res.data
        this.total = res.total
      })
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
    this.getIPList()
  }
}
</script>

<style scoped lang="scss">
</style>
