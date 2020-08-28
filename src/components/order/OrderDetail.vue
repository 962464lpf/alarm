<template>
  <div class="order-detail-dialog">
    <el-dialog
      title="工单详情"
      center
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-row class="order-detail">
        <el-col :span="12">
          <span>恶意IP：</span>
          <span>{{orderDetail.sip}}</span>
        </el-col>
        <el-col :span="12">
          <span>目的IP：</span>
          <span>{{orderDetail.dip}}</span>
        </el-col>
        <el-col :span="12">
          <span>告警来源：</span>
          <span>{{orderDetail.device_ip}}</span>
        </el-col>
        <el-col :span="12">
          <span>攻击时间：</span>
          <span>{{orderDetail.attack_time}}</span>
        </el-col>
        <el-col :span="12">
          <span>攻击类型：</span>
          <span>{{orderDetail.attack_type}}</span>
        </el-col>
        <el-col :span="12">
          <span>攻击等级：</span>
          <span v-if="orderDetail.level == 0">高</span>
          <span v-if="orderDetail.level == 1">中</span>
          <span v-if="orderDetail.level == 2">低</span>
        </el-col>
        <el-col :span="12">
          <span>协议：</span>
          <span>{{orderDetail.protocol}}</span>
        </el-col>
        <el-col :span="12">
          <span>位置：</span>
          <span>{{orderDetail.wuli_addr}}</span>
        </el-col>
        <el-col :span="12">
          <span>描述：</span>
          <span>{{orderDetail.con}}</span>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer"  v-if="currentRow.state === 0">
        <el-button type="primary" @click="falseReport">误报</el-button>
        <el-button type="primary" @click="issueDisposal">下发处置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getOrderDetailApi,
  orderIssueDisposalApi,
  orderWuBaoApi
} from '../../tools/api'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    currentRow: {}
  },
  data() {
    return {
      dialogVisible: this.value,
      orderDetail: {}
    }
  },
  methods: {
    handleClose() {
      this.$emit('input', false)
    },
    falseReport() {
      let fd = new FormData()
      fd.append('id', this.currentRow.id)
      orderWuBaoApi(fd).then(res => {
        let type = 'success'
        if (res.state !== this.successFlag) {
          type = 'warning'
        } else {
          this.$emit('refreshOrderList')
        }
        this.$message({
          type,
          message: res.info
        })
        this.handleClose()
      })
    },
    issueDisposal() {
      let fd = new FormData()
      fd.append('id', this.currentRow.id)
      orderIssueDisposalApi(fd).then(res => {
        let type = 'success'
        if (res.state !== this.successFlag) {
          type = 'warning'
        } else {
          this.$emit('refreshOrderList')
        }
        this.$message({
          type,
          message: res.info
        })
        this.handleClose()
      })
    },
    getOrderDetail() {
      let fd = new FormData()
      // id-工单id，alert_id-告警id
      fd.append('id', this.currentRow.id)
      fd.append('alert_id', this.currentRow.alert_id)
      getOrderDetailApi(fd).then(res => {
        this.orderDetail = res
      })
    }
  },
  mounted() {
    this.getOrderDetail()
  }
}
</script>

<style  lang="scss">
.order-detail-dialog {
  .order-detail {
    .el-col-12 {
      line-height: 28px;
    }
  }
}
</style>
