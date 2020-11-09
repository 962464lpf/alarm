<template>
  <div class="arp my-elem-table my-elem-pagination">
    <el-button class="my-elem-btn fr" @click="deleteArp()">清空</el-button>
    <div class="clearfloat"></div>
    <el-table class="mt10" v-loading="tableLoading" :data="arpData" style="width: 100%" border>
      <el-table-column prop="address" label="IP地址"></el-table-column>
      <el-table-column prop="hwaddresss" label="MAC地址"></el-table-column>
      <el-table-column prop="iface" label="物理接口"></el-table-column>
      <el-table-column prop="hwtype" label="类型"></el-table-column>

      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="deleteArp(scope.row)">删除</el-button>
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
  </div>
</template>

<script>
import { getARPData, deleteArpData } from '../../tools/api'
export default {
  data() {
    return {
      tableLoading: false,
      arpData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
    }
  },
  methods: {
    deleteArp(row) {
      let str
      let fd
      if (row) {
        str = `您确认删除该条ARP(${row.address})吗？`
        fd = new FormData()
        fd.append('address', row.address)
      } else {
        str = '您确认删除所有ARP吗？'
      }
      this.$confirm(str, '是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteArpData(row ? fd : '').then((res) => {
          this.mixinPrompt(res, this.getARP)
        })
      })
    },
    handleCurrentChange() {},
    getARP() {
      getARPData().then((res) => {
        this.total = res.total
        this.arpData = res.data
      })
    },
  },
  mounted() {
    this.getARP()
  },
}
</script>

<style scoped lang="scss">
.arp {
}
</style>
