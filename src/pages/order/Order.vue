<template>
  <div class="order">
    <el-form :inline="true" v-model="searchForm" ref="searchForm" class="my-elem-form">
      <el-form-item label="源IP">
        <el-input v-model="searchForm.sip" placeholder="请输入IP地址">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-form-item>
      <el-form-item label="目的IP">
        <el-input v-model="searchForm.dip" placeholder="请输入IP地址">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getOrderList" class="my-elem-btn">查询</el-button>
        <el-button type="primary" @click="onReset" class="my-elem-btn">重置</el-button>
        <el-button type="primary" @click="selectTimeStatus=true" class="my-elem-btn">导出</el-button>
      </el-form-item>
    </el-form>
    <div class="my-elem-table my-elem-pagination">
      <el-table v-loading="tableLoading" :data="orderList" border style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="sip" label="源IP"></el-table-column>
        <el-table-column prop="dip" label="目的IP"></el-table-column>
        <el-table-column prop="dip" label="时间">
          <template slot-scope="scope">
            <span>{{getTime(scope.row)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dip" label="状态">
          <template slot-scope="scope">
            <span>{{getStatus(scope.row)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="getDetail(scope.row)">详情</el-button>
            <el-button type="text" size="small" @click="blocked(scope.row)">一键封禁</el-button>
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
    </div>
    <div class="clearfloat"></div>
    <div v-if="orderDetailStatus">
      <OrderDetail
        v-model="orderDetailStatus"
        :currentRow="currentRow"
        @refreshOrderList="getOrderList"
      ></OrderDetail>
    </div>
    <div v-if="chooseFirewallStatus">
      <ChooseFirewall
        class="my-elem-table my-elem-pagination"
        v-model="chooseFirewallStatus"
        @getFirewall="orderBlocked"
      ></ChooseFirewall>
    </div>
    <div v-if="selectTimeStatus">
      <SelectTime v-model="selectTimeStatus" @getFirewall="orderBlocked"></SelectTime>
    </div>
  </div>
</template>

<script>
import OrderDetail from '../../components/order/OrderDetail'
import ChooseFirewall from '../../components/common/ChooseFirewall'
import SelectTime from '../../components/order/SelectTime'
import { getOrderListApi, orderBlockApi } from '../../tools/api'
export default {
  data() {
    return {
      tableLoading: false,
      orderList: [],
      searchForm: {
        sip: '',
        dip: '',
      },
      pageSize: 10,
      currentPage: 0,
      total: 0,
      orderDetailStatus: false,
      chooseFirewallStatus: false,
      selectTimeStatus: false,
      currentRow: {},
    }
  },
  components: {
    OrderDetail,
    ChooseFirewall,
    SelectTime,
  },
  methods: {
    getStatus(row) {
      switch (row.state) {
        case 0:
          return '未分析'
        case 1:
          return '误报'
        case 2:
          return '已下发'
        case 3:
          return '已封禁'
        default:
          return '未分析'
      }
    },
    getTime(row) {
      switch (row.state) {
        case 0:
          return row.zhuanru_time
        case 1:
          return row.wubao_time
        case 2:
          return row.xiafa_time
        case 3:
          return row.forbidden_time
        default:
          return row.zhuanru_time
      }
    },
    onReset() {},
    handleSizeChange(val) {
      this.pageSize = val
      this.getOrderList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getOrderList()
    },
    getDetail(row) {
      this.currentRow = row
      this.orderDetailStatus = true
    },
    blocked(row) {
      this.currentRow = row
      this.chooseFirewallStatus = true
    },
    orderBlocked(firewall) {
      let fd = new FormData()
      // id-工单id，fid-防火墙id
      fd.append('id', this.currentRow.id)
      fd.append('fid', firewall.id)
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      orderBlockApi(fd)
        .then((res) => {
          let type = 'success'
          loading.close()
          if (res.state !== this.successFlag) type = 'warning'
          this.$message({
            type,
            message: res.info,
          })
          this.getOrderList()
        })
        .catch(() => {
          loading.close()
          this.$message({
            type: 'warning',
            message: '系统出错，请联系管理员。',
          })
        })
    },
    getOrderList() {
      let fd = new FormData()
      fd.append('page', this.currentPage)
      fd.append('per_page', this.pageSize)
      getOrderListApi(fd).then((res) => {
        this.total = res.total
        this.orderList = res.data
      })
    },
  },
  mounted() {
    this.getOrderList()
  },
}
</script>

<style scoped lang="scss">
</style>
