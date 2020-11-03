<template>
  <div class="alarm-summary">
    <SearchForm @getSearchForm="getSearchForm">
      <span>
        <!-- <span class="ml10">
          <el-checkbox v-model="notsee_white" @change="getAlarmList">
            <span style="font-size: 12px;">不显示白名单数据</span>
          </el-checkbox>
        </span>-->
        <el-dropdown split-button type="primary" @command="exportFile">
          导出
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="csv">csv</el-dropdown-item>
            <el-dropdown-item command="excel">excel</el-dropdown-item>
            <el-dropdown-item command="json">json</el-dropdown-item>
            <el-dropdown-item command="txt">txt</el-dropdown-item>
            <el-dropdown-item command="html">html</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="primary" class="ml10" @click="batchBanned">批量封禁</el-button>
      </span>
    </SearchForm>

    <div class="alarm-summary-table">
      <el-table
        v-loading="tableLoading"
        :data="summaryAlarmList"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
        row-key="id"
      >
        <el-table-column type="selection" reserve-selection width="45" align="center"></el-table-column>
        <el-table-column label="恶意IP" width="150" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="bottom">
              <div v-if="scope.row.sip_show" slot="content">
                <p>私网IP：{{scope.row.sip_show.ip_private}}</p>
                <p>公网IP：{{scope.row.sip_show.ip}}</p>
                <p>安全域：{{scope.row.sip_show.anquanyu}}</p>
                <p>单位-部门：{{scope.row.sip_show.com_dep}}</p>
                <p>类型：{{scope.row.sip_show.cat}}</p>
                <p>责任人：{{scope.row.sip_show.staff}}</p>
                <p>联系电话：{{scope.row.sip_show.phone}}</p>
              </div>
              <div v-else slot="content">
                <span>{{ scope.row.sip }} {{scope.row.sport ? ':' + scope.row.sport : ''}}</span>
              </div>
              <div>
                <span
                  class="curp"
                  v-if="(scope.row.sip_black_type=== 0 || scope.row.sip_black_type) && scope.row.sip_black_type !==2 "
                >
                  {{ scope.row.sip }} {{scope.row.sport ? ':' + scope.row.sport : ''}}
                  <b
                    v-html="getToolTipContetn(scope.row.sip_black_type)"
                  ></b>
                </span>
                <span
                  class="curp"
                  v-else
                >{{ scope.row.sip }} {{scope.row.sport ? ':' + scope.row.sport : ''}}</span>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="wuli_addr" label="位置" align="center">
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
        <el-table-column prop="dip" label="目的IP" width="150" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="bottom">
              <div v-if="scope.row.dip_show" slot="content">
                <p>私网IP：{{scope.row.dip_show.ip_private}}</p>
                <p>公网IP：{{scope.row.dip_show.ip}}</p>
                <p>安全域：{{scope.row.dip_show.anquanyu}}</p>
                <p>单位-部门：{{scope.row.dip_show.com_dep}}</p>
                <p>类型：{{scope.row.dip_show.cat}}</p>
                <p>责任人：{{scope.row.dip_show.staff}}</p>
                <p>联系电话：{{scope.row.dip_show.phone}}</p>
              </div>
              <div v-else slot="content">
                <span v-if="scope.row.dport">{{ scope.row.dip }}: {{scope.row.dport}}</span>
                <span v-else>{{ scope.row.dip }}</span>
              </div>
              <div class="curp omit">
                <span v-if="scope.row.dport">{{ scope.row.dip }}: {{scope.row.dport}}</span>
                <span v-else>{{ scope.row.dip }}</span>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="告警来源" align="center">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.device_ip"
              placement="bottom"
            >
              <span class="curp omit">{{ scope.row.device_ip }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="描述" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.con" placement="bottom">
              <span class="curp omit">{{ scope.row.con }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="最后攻击时间" prop="attack_time" align="center">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.attack_time"
              placement="bottom"
            >
              <span class="curp omit">{{ scope.row.attack_time }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="attack_type" label="攻击类型" align="center">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.attack_type ? scope.row.attack_type : '未知'"
              placement="bottom"
            >
              <span class="curp omit">{{ scope.row.attack_type ? scope.row.attack_type : '未知' }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="protocol" width="80" label="协议" align="center"></el-table-column>
        <el-table-column prop="summary_num" width="80" label="次数" align="center"></el-table-column>
        <el-table-column label="操作" width="100" align="center">
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
      <div class="clearfloat"></div>
      <div class="statistic fr mt10">
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
      <div class="clearfloat"></div>
    </div>
    <div v-if="alarmListDialogStatus">
      <AlarmListDialog
        v-model="alarmListDialogStatus"
        :rowSip="rowSip"
        :rowId="rowId"
        :searchForm="searchForm"
      ></AlarmListDialog>
    </div>
    <div v-if="blackTypeDialogStatus">
      <ChooseBlackType v-model="blackTypeDialogStatus" @emitChooseType="emitChooseType"></ChooseBlackType>
    </div>
    <div v-if="selectTypeDialogStatus">
      <AddSelectType v-model="selectTypeDialogStatus" @emitSelectTyepe="emitSelectTyepe"></AddSelectType>
    </div>

    <div v-if="chooseFirewallStatus">
      <ChooseFirewall v-model="chooseFirewallStatus" @getFirewall="batchBannedOperation"></ChooseFirewall>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  getSumAlarmListApi,
  setIpApi,
  exportSumAlarmFileApi,
  BASE_URL,
  downloadFileApi,
  aKeyBlockedApi,
  batchBannedApi,
} from '../../tools/api'
import AlarmListDialog from '../../components/alarm/AlarmListDialog'
import ChooseBlackType from '../../components/alarm/ChooseBlackType'
import AddSelectType from '../../components/alarm/AddSelectType'
import SearchForm from '../../components/alarm/SearchForm'
import ChooseFirewall from '../../components/common/ChooseFirewall'

export default {
  components: {
    AlarmListDialog,
    ChooseBlackType,
    AddSelectType,
    SearchForm,
    ChooseFirewall,
  },
  data() {
    return {
      notsee_white: true,
      moreSearch: false,
      selectType: '',
      selectTypeDialogStatus: false,
      searchForm: {
        sip: '',
        dip: '',
        device_ip: '',
        attack_type: '',
        time: [],
      },
      tableLoading: false,
      summaryAlarmList: [{}],
      attack_total: 0,
      attack_total_high: 0,
      attack_total_low: 0,
      attack_total_middle: 0,
      currentPage: 1,
      total: 0,
      pageSize: 10,
      alarmListDialogStatus: false,
      blackTypeDialogStatus: false,
      rowAlarmData: {},
      rowId: '',
      rowSip: '',
      selectRowData: [],
      chooseFirewallStatus: false,
      selectBlockedType: '',
    }
  },
  computed: {
    ...mapState(['newAlarmData', 'userInfo']),
  },
  watch: {
    // 有新的告警数据
    newAlarmData() {
      // this.getAlarmList()
    },
  },
  methods: {
    handleSelectionChange(val) {
      this.selectRowData = val
    },
    batchBannedOperation(firewall) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      if (this.selectBlockedType === 'Akey') {
        let fd = new FormData()
        fd.append('ip', this.rowAlarmData.sip)
        fd.append('fid', firewall.id)
        aKeyBlockedApi(fd).then((res) => {
          loading.close()
          let type = 'success'
          if (res.state !== this.successFlag) type = 'warning'
          this.$message({
            type,
            message: res.info,
          })
          this.getAlarmList()
        })
      } else {
        let sipArr = []
        this.selectRowData.forEach((item) => {
          sipArr.push(item.sip)
        })
        let fd = new FormData()
        fd.append('ipstr', sipArr.join(','))
        fd.append('fid', firewall.id)
        batchBannedApi(fd).then((res) => {
          loading.close()
          let type = 'success'
          if (res.state !== this.successFlag) {
            type = 'warning'
          } else {
            this.getAlarmList()
          }
          this.$message({
            type,
            message: res.info,
          })
        })
      }
    },
    batchBanned() {
      if (this.selectRowData.length > 0) {
        this.selectBlockedType = 'batch'
        this.chooseFirewallStatus = true
      } else {
        this.$message({
          type: 'warning',
          message: '请选择您要封禁的IP.',
        })
      }
    },
    getSearchForm(form) {
      this.searchForm = form
      this.getAlarmList()
    },
    getToolTipContetn(type) {
      let content = ''
      if (type === 0) {
        content = '<a class="red-team">红队</a>'
      } else if (type === 1) {
        content = '<a class="blue-team">蓝队</a>'
      } else if (type === 2) {
        content = ''
      }
      return content
    },
    downloadFile(filePath, type) {
      downloadFileApi(filePath).then((res) => {
        let blob = new Blob([res], { type })
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.setAttribute('download', 'text')
        a.setAttribute('href', url)
        a.click()
      })
    },

    emitSelectTyepe(data) {
      let fd = new FormData()
      fd.append('page', this.currentPage)
      fd.append('type', this.selectType)
      // this.selectType
      let st = data.join(',').toString()
      fd.append('export_fields', st)
      for (let key of data) {
        if (key === '') fd.append('export_fields', '')
      }
      for (let k in this.searchForm) {
        if (k === 'time') {
          fd.append(
            'start_time',
            this.searchForm[k][0] ? this.searchForm[k][0] : ''
          )
          fd.append(
            'end_time',
            this.searchForm[k][1] ? this.searchForm[k][1] : ''
          )
        } else {
          fd.append(k, this.searchForm[k])
        }
      }
      this.$message({
        type: 'warning',
        message: '导出文件可能需要的时间较长，请等待！',
        duration: 1500,
      })
      exportSumAlarmFileApi(fd)
        .then((res) => {
          if (res.state !== this.successFlag) {
            this.$message({
              type: 'warning',
              message: '导出失败',
            })
          } else {
            let filePath = BASE_URL + res.file_path
            // downloadFileApi(filePath)
            if (
              this.selectType === 'txt' ||
              this.selectType === 'json' ||
              this.selectType === 'html'
            ) {
              // 'text/plain'
              // application/json
              // text/html
              let type = ''
              if (this.selectType === 'txt') type = 'text/plain'
              if (this.selectType === 'json') type = 'application/json'
              if (this.selectType === 'html') type = 'text/html'
              this.downloadFile(filePath, type)
            } else {
              window.open(filePath)
            }
          }
        })
        .catch(() => {
          this.$message({
            type: 'warning',
            message: '导出文件出错，请联系管理员。',
            duration: 1500,
          })
        })
    },
    exportFile(type) {
      this.selectTypeDialogStatus = true
      this.selectType = type
    },
    emitChooseType(type) {
      this.blackType = type
      let fd = new FormData()
      fd.append('ip_addr', this.rowAlarmData.sip)
      fd.append('type', 'black')
      fd.append('black_type', type)
      fd.append('id', parseInt(this.rowAlarmData.id))
      setIpApi('black', fd).then((res) => {
        let type = 'success'
        let message = '设置成功'
        if (res.state !== this.successFlag) {
          type = 'warning'
          message = res.info
        }
        this.$message({
          type,
          message,
        })
        this.getAlarmList()
      })
    },
    operation(row, type) {
      this.rowAlarmData = row
      this.rowId = parseInt(row.id)
      this.rowSip = row.sip
      let fd = new FormData()
      fd.append('ip_addr', row.sip)
      fd.append('id', parseInt(row.id))
      if (type === 'detail') {
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
          type: 'warning',
        }).then(() => {
          setIpApi(type, fd).then((res) => {
            let type = 'success'
            let message = '设置成功'
            if (res.state !== this.successFlag) {
              type = 'warning'
              message = res.info
            }
            this.$message({
              type,
              message,
            })
            this.getAlarmList()
          })
        })
      }
    },
    blocked(row) {
      if (this.userInfo.level === 0 || this.userInfo.level === 2) {
        this.$confirm(`您确定要将恶意IP:${row.sip}封禁吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.rowAlarmData = row
          this.selectBlockedType = 'Akey'
          this.chooseFirewallStatus = true
        })
      } else {
        this.$message({
          type: 'warning',
          message: '您没有权限执行此操作，请与管理员联系。',
        })
      }
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
      this.tableLoading = false
      let fd = new FormData()
      fd.append('page', this.currentPage)
      // fd.append('notsee_white', this.notsee_white ? 1 : 0)

      fd.append('per_page', this.pageSize)
      for (let key in this.searchForm) {
        if (key !== 'level' && key !== 'time')
          fd.append(key, this.searchForm[key])
      }
      fd.append(
        'start_time',
        this.searchForm.time[0] ? this.searchForm.time[0] : ''
      )
      fd.append(
        'end_time',
        this.searchForm.time[1] ? this.searchForm.time[1] : ''
      )
      getSumAlarmListApi(fd).then((res) => {
        this.tableLoading = false
        this.summaryAlarmList = res.data
        this.total = res.total
        this.attack_total = res.attack_total
        this.attack_total_high = res.attack_total_high
        this.attack_total_low = res.attack_total_low
        this.attack_total_middle = res.attack_total_middle
      })
    },
  },
  mounted() {
    this.getAlarmList()
  },
}
</script>

<style lang="scss">
.alarm-summary {
  .statistic {
    color: #606266;
    line-height: 32px;
    font-size: 13px;
    span {
      padding: 5px 10px;
    }
  }
  .red-team,
  .blue-team {
    color: white;
    padding: 2px;
    border-radius: 2px;
  }
  .red-team {
    background: rgb(245, 108, 108);
  }
  .blue-team {
    background: rgb(102, 177, 255);
  }
}
</style>
