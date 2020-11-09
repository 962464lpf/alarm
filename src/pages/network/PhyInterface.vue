<template>
  <div class="phyInterface my-elem-table my-elem-pagination">
    <el-button class="my-elem-btn fr" @click="getPhyInterface">刷新</el-button>
    <div class="clearfloat"></div>
    <el-table
      class="mt10"
      v-loading="tableLoading"
      :data="phyInterfaceData"
      style="width: 100%"
      border
    >
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="mac_addr" label="MAC地址"></el-table-column>
      <el-table-column prop="ip_addr" label="IP地址/掩码"></el-table-column>
      <el-table-column prop="mtu" label="MTU" width="120"></el-table-column>
      <el-table-column prop="name" label="连接状态" width="120">
        <template slot-scope="scope">{{scope.row.state === 'UP' ? '已连接' : '未连接'}}</template>
      </el-table-column>

      <!-- <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="editPhyInterface(scope.row)">编辑</el-button>
        </template>
      </el-table-column>-->
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
    <div v-if="editStatus">
      <EditPhyInterfaceDia v-model="editStatus"></EditPhyInterfaceDia>
    </div>
  </div>
</template>

<script>
import EditPhyInterfaceDia from '../../components/network/EditPhyInterFace'
import { getPhyInterface } from '../../tools/api'
export default {
  components: {
    EditPhyInterfaceDia,
  },
  data() {
    return {
      tableLoading: false,
      phyInterfaceData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      editStatus: false,
      currentRow: {},
    }
  },
  methods: {
    editPhyInterface(row) {
      this.editStatus = true
      this.currentRow = row
    },
    handleCurrentChange() {},
    getPhyInterface() {
      getPhyInterface().then((res) => {
        this.phyInterfaceData = res.data
        this.total = res.total
      })
    },
  },
  mounted() {
    this.getPhyInterface()
  },
}
</script>

<style scoped lang="scss">
</style>
