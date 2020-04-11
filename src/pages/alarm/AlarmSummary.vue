<template>
  <div class="alarm-summary">
    <div class="alarm-summary-search">
      <el-form :inline="true" :model="searchForm" ref="searchForm">
        <el-form-item label-width="0">
          <el-input placeholder="请输入内容" disabled v-model="searchContent">
            <el-button slot="append" icon="el-icon-caret-bottom" @click="moreSearch = !moreSearch"></el-button>
          </el-input>
          <div class="search-box" v-if="moreSearch">
            <el-form-item label="恶意IP">
              <el-input v-model="searchForm.sip" placeholder="恶意IP"></el-input>
            </el-form-item>
            <el-form-item label="目的IP">
              <el-input v-model="searchForm.dip" placeholder="目的地IP"></el-input>
            </el-form-item>
            <el-form-item label="告警来源">
              <el-input v-model="searchForm.device_ip" placeholder="设备IP"></el-input>
            </el-form-item>
            <el-form-item label="攻击类型">
              <el-input v-model="searchForm.attack_type" placeholder="攻击类型"></el-input>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            :clearable="false"
            v-model="searchForm.time"
            type="datetimerange"
            value-format="yyyy-MM-dd HH-mm-ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSearch(true)">查询</el-button>
          <el-button type="primary" @click="onSearch(false)">重置</el-button>
          <el-dropdown split-button type="primary" @command="exportFile" class="ml10">
            导出
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="csv">csv</el-dropdown-item>
              <el-dropdown-item command="excel">excel</el-dropdown-item>
              <el-dropdown-item command="json">json</el-dropdown-item>
              <el-dropdown-item command="txt">txt</el-dropdown-item>
              <el-dropdown-item command="html">html</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
      </el-form>
    </div>
    <div class="alarm-summary-table">
      <el-table :data="summaryAlarmList" style="width: 100%" border>
        <el-table-column label="恶意IP">
          <template slot-scope="scope">
            <span
              class="curp"
              v-if="(scope.row.sip_black_type=== 0 || scope.row.sip_black_type) && scope.row.sip_black_type !==2 "
            >
              {{ scope.row.sip }}:{{scope.row.sport}}({{
              getToolTipContetn(scope.row.sip_black_type)
              }})
            </span>
            <span class="curp" v-else>{{ scope.row.sip }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="wuli_addr" label="位置">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.wuli_addr"
              placement="bottom"
            >
              <span class="curp omit">{{ scope.row.wuli_addr }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="dip" label="目的IP"></el-table-column>
        <el-table-column prop="device_ip" label="告警来源"></el-table-column>
        <el-table-column label="描述">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.con" placement="bottom">
              <span class="curp omit">{{ scope.row.con }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="攻击时间" prop="attack_time"></el-table-column>
        <el-table-column prop="attack_type" label="攻击类型" width="80">
          <template slot-scope="scope">{{ scope.row.attack_type ? scope.row.attack_type : '未知' }}</template>
        </el-table-column>
        <el-table-column prop="protocol" width="80" label="协议"></el-table-column>
        <el-table-column prop="summary_num" width="80" label="次数"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-dropdown>
              <span class="el-dropdown-link el-button--lightblue dropbutton">
                操 作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>

              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="operation(scope.row, 'detail')">详情</el-dropdown-item>
                <el-dropdown-item @click.native="operation(scope.row, 'white')">添加至白名单</el-dropdown-item>
                <el-dropdown-item @click.native="operation(scope.row, 'red')">添加至红队IP</el-dropdown-item>
                <el-dropdown-item @click.native="operation(scope.row, 'blue')">添加至蓝队IP</el-dropdown-item>
                <el-dropdown-item @click.native="blocked(scope.row)">一键封禁</el-dropdown-item>
                <!-- <el-dropdown-item @click.native="operation(scope.row, 'black')">添加黑名单</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="fr clearfix"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <div class="statistic">
        <span>
          攻击总数：
          <b>{{ attack_total }}</b>
        </span>
        <span>
          高危次数：
          <b>{{ attack_total_high }}</b>
        </span>
        <span>
          中危次数：
          <b>{{ attack_total_middle }}</b>
        </span>
        <span>
          低危次数：
          <b>{{ attack_total_low }}</b>
        </span>
      </div>
    </div>
    <div v-if="alarmListDialogStatus">
      <AlarmListDialog v-model="alarmListDialogStatus" :data="alarmListDialogData"></AlarmListDialog>
    </div>
    <div v-if="blackTypeDialogStatus">
      <ChooseBlackType v-model="blackTypeDialogStatus" @emitChooseType="emitChooseType"></ChooseBlackType>
    </div>
  </div>
</template>

<script>
import {
  getSumAlarmListApi,
  setIpApi,
  exportSumAlarmFileApi
} from '../../tools/api'
import AlarmListDialog from '../../components/alarm/AlarmListDialog'
import ChooseBlackType from '../../components/alarm/ChooseBlackType'

export default {
  components: {
    AlarmListDialog,
    ChooseBlackType
  },
  data() {
    return {
      moreSearch: false,
      searchForm: {
        sip: '',
        dip: '',
        device_ip: '',
        attack_type: '',
        time: []
      },
      summaryAlarmList: [],
      attack_total: 0,
      attack_total_high: 0,
      attack_total_low: 0,
      attack_total_middle: 0,
      currentPage: 1,
      total: 0,
      pageSize: 10,
      alarmListDialogStatus: false,
      alarmListDialogData: [],
      blackTypeDialogStatus: false,
      rowAlarmData: {}
    }
  },
  computed: {
    searchContent() {
      return (
        this.searchForm.sip +
        ' ' +
        this.searchForm.dip +
        ' ' +
        this.searchForm.device_ip +
        ' ' +
        this.searchForm.attack_type
      )
    }
  },
  methods: {
    onSearch(type) {
      if (!type) {
        this.searchForm = {
          sip: '',
          dip: '',
          device_ip: '',
          attack_type: '',
          time: []
        }
      }
      this.getAlarmList()
    },
    getToolTipContetn(type) {
      let content = ''
      if (type === 0) {
        content = '红队IP'
      } else if (type === 1) {
        content = '蓝队IP'
      } else if (type === 2) {
        content = ''
      }
      return content
    },
    exportFile(type) {
      let fd = new FormData()
      fd.append('page', this.currentPage)
      fd.append('type', type)
      fd.append('export_fields', 'sip+dip+wuli_addr')
      exportSumAlarmFileApi(fd).then(res => {
        if (res.state !== 1) {
          this.$message({
            type: 'warning',
            message: '导出失败'
          })
        } else {
          let filePath = res.file_path
          // downloadFileApi(filePath)
          window.open(filePath)
        }
      })
    },
    emitChooseType(type) {
      this.blackType = type
      let fd = new FormData()
      fd.append('ip_addr', this.rowAlarmData.sip)
      fd.append('type', 'black')
      fd.append('black_type', type)
      fd.append('id', parseInt(this.rowAlarmData.id))
      setIpApi('black', fd).then(res => {
        let type = 'success'
        let message = '设置成功'
        if (res.state !== 1) {
          type = 'warning'
          message = res.info
        }
        this.$message({
          type,
          message
        })
        this.getAlarmList()
      })
    },
    operation(row, type) {
      this.rowAlarmData = row
      let fd = new FormData()
      fd.append('ip_addr', row.sip)
      fd.append('id', parseInt(row.id))
      if (type === 'detail') {
        this.alarmListDialogData = row.sub
        this.alarmListDialogStatus = true
      } else {
        let IpName = ''
        if (type === 'white') {
          IpName = '白名单'
          fd.append('type', 'white')
        } else if (type === 'red') {
          IpName = '红队IP'
          fd.append('type', 'black')
          fd.append('black_type', 0)
        } else {
          IpName = '蓝队IP'
          fd.append('type', 'black')
          fd.append('black_type', 1)
        }
        this.$confirm(`您确定将此源IP设置为${IpName}吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          setIpApi(type, fd).then(res => {
            let type = 'success'
            let message = '设置成功'
            if (res.state !== 1) {
              type = 'warning'
              message = res.info
            }
            this.$message({
              type,
              message
            })
            this.getAlarmList()
          })
        })
      }
      // else {
      //   this.$confirm('您确定将此源IP设置为黑名单吗?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     this.blackTypeDialogStatus = true
      //   })
      // }
    },
    blocked(row) {
      console.log(row)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getAlarmList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getAlarmList()
    },
    getAlarmList() {
      let fd = new FormData()
      fd.append('page', this.currentPage)
      fd.append('per_page', this.pageSize)
      for (let key in this.searchForm) {
        fd.append(key, this.searchForm[key])
      }
      fd.append('start_time', this.searchForm.time[0])
      fd.append('end_time', this.searchForm.time[1])
      getSumAlarmListApi(fd).then(res => {
        this.summaryAlarmList = res.data
        this.total = res.total
        this.attack_total = res.attack_total
        this.attack_total_high = res.attack_total_high
        this.attack_total_low = res.attack_total_low
        this.attack_total_middle = res.attack_total_middle
      })
    }
  },
  mounted() {
    this.getAlarmList()
  }
}
</script>

<style lang="scss">
.alarm-summary {
  .alarm-summary-search {
    .search-box {
      position: absolute;
      background: white;
      z-index: 10;
      border: 1px solid #cccccc;
      border-radius: 4px;
      width: 100%;
      padding-top: 18px;
      overflow: auto;
      .el-form-item {
        display: flex;
        .el-form-item__label {
          width: 95px;
        }
      }
    }
  }
  .statistic {
    color: #606266;
    line-height: 32px;
    span {
      padding: 5px 15px;
    }
  }
}
</style>
