<template>
  <div class="order my-elem-form">
    <el-form :inline="true" v-model="searchForm" ref="searchForm">
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
        <el-tooltip class="item" effect="dark" content="查询" placement="bottom">
          <el-button type="primary" @click="getOrderList" class="my-elem-btn" icon="el-icon-search"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="重置" placement="bottom">
          <el-button type="primary" @click="onReset" class="my-elem-btn" icon="el-icon-refresh"></el-button>
        </el-tooltip>
        <el-button type="primary" @click="selectTimeStatus=true" class="my-elem-btn">导出</el-button>
      </el-form-item>
    </el-form>
    <div class="my-elem-table my-elem-pagination">
      <el-table v-loading="tableLoading" :data="orderList" border style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="sip" label="源IP">
          <template slot-scope="scope">
            <div>
              <span class="triangle" v-if="scope.row.state === 0"></span>

              <span>{{ scope.row.sip }}</span>
              <p
                v-if="(scope.row.sip_black_type=== 0 || scope.row.sip_black_type) && scope.row.sip_black_type !==2 "
              >
                <b v-html="getToolTipContetn(scope.row)"></b>
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="dip" label="目的IP"></el-table-column>
        <el-table-column prop="dip" label="时间">
          <template slot-scope="scope">
            <span>{{getTime(scope.row)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dip" label="状态">
          <template slot-scope="scope">
            <span v-html="getStatus(scope.row)"></span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button class="my-elem-btn" size="small" @click="getDetail(scope.row)">分析处置</el-button>

            <el-button class="my-elem-btn" size="small" @click="blocked(scope.row)">一键封禁</el-button>
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
    getToolTipContetn(row) {
      let type = row.sip_black_type
      let content = ''
      if (type === 0) {
        content = '<a class="red-team">红队IP</a>'
      } else if (type === 1) {
        content = '<a class="blue-team">蓝队IP</a>'
      } else if (type === 2) {
        content = ''
      } else if (row.sip_type === 'white') {
        content = '<a class="white-team">白名单</a>'
      }
      return content
    },
    getStatus(row) {
      switch (row.state) {
        case 0:
          return '<span class="not-analy">未分析</span>'
        case 1:
          return '<span class="misstate">误报</span>'
        case 2:
          return '<span class="ban">封禁</span>'
        case 3:
          return '<span class="trace">溯源</span>'
        case 4:
          return '<span class="attack">反制</span>'
        default:
          return '<span class="not-analy">未分析</span>'
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
    onReset() {
      this.searchForm = {
        sip: '',
        dip: '',
      }
      this.getOrderList()
    },
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

<style  lang="scss">
.order {
  .el-input__inner,
  .el-textarea__inner {
    color: white !important;
    background: #111927 !important;
    border: none;
  }
  .not-analy,
  .misstate,
  .trace,
  .ban,
  .attack {
    width: 86px;
    text-align: center;
    display: inline-block;
    padding: 3px 0;
    border-radius: 3px;
    font-size: 12px;
    transform: scale(0.8);
  }
  .not-analy {
    background: #e6758a;
  }
  .misstate {
    background: #e6a23c;
  }
  .trace {
    background: #67c23a;
  }
  .ban {
    background: #409eff;
  }
  .attack {
    background: #8e6cf5;
  }
  .red-team,
  .blue-team,
  .white-team {
    display: inline-block;
    padding: 3px 30px;
    border-radius: 3px;
    font-size: 12px;
    transform: scale(0.8);
  }
  .red-team {
    background: #ca4c4c;
  }
  .blue-team {
    background: #488fd8;
  }
  .white-team {
    background: #fff9f0;
  }
  .triangle {
    float: left;
    background-color: #e8133a;
    border-radius: 10px;
    font-size: 12px;
    padding: 0 6px;
    line-height: 18px;
    margin-right: 5px;
  }
  .triangle::before {
    content: 'new';
  }
}
</style>
