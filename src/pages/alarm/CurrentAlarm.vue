<template>
  <div class="current-alarm">
    <audio v-if="bellSrc === 'general'"
           src="../../assets/audio/general.wav"
           autoplay>您的浏览器不支持 audio 标签。</audio>
    <audio v-if="bellSrc === 'red'"
           src="../../assets/audio/red.wav"
           autoplay>您的浏览器不支持 audio 标签。</audio>
    <span class="bell">
      <span class="fr">
        <el-button @click="alarmSettingShow = !alarmSettingShow">告警配置</el-button>
      </span>
    </span>
    <transition name="el-zoom-in-top">
      <div v-show="alarmSettingShow"
           class="alarm-setting"
           @mouseleave="alarmSettingShow = false">
        <div class="list">
          <div class="content">
            <span class="name">
              声音提醒
              <i></i>
            </span>

            <a></a>
            <el-switch v-model="bellStatus"
                       class="fr"></el-switch>
          </div>
          <div class="content"
               v-if="bellStatus">
            <p>
              <span>高危：</span>
              <el-switch v-model="highBellStatus"
                         active-color="#f56c6c"></el-switch>
            </p>
            <p>
              <span>中危：</span>
              <el-switch v-model="middleBellStatus"
                         active-color="#e6a23c"></el-switch>
            </p>
            <p>
              <span>低危：</span>
              <el-switch v-model="lowBellStatus"
                         active-color="#67c23a"></el-switch>
            </p>
          </div>
        </div>
        <div class="list">
          <div class="content">
            <span class="name">
              文字提醒
              <i></i>
            </span>

            <a></a>
            <el-switch v-model="characterStatus"></el-switch>
          </div>
          <div class="content"
               v-if="characterStatus">
            <p>
              <span>高危：</span>
              <el-switch v-model="highCharacterStatus"
                         active-color="#f56c6c"></el-switch>
            </p>
            <p>
              <span>中危：</span>
              <el-switch v-model="middleCharacterStatus"
                         active-color="#e6a23c"></el-switch>
            </p>
            <p>
              <span>低危：</span>
              <el-switch v-model="lowCharacterStatus"
                         active-color="#67c23a"></el-switch>
            </p>
          </div>
        </div>
        <!-- <div class="list">
          <div class="content">
            <span class="name">
              白名单提醒
              <i></i>
            </span>

            <a></a>
            <el-switch v-model="whitePushAlarm" @change="handleWhitePush"></el-switch>
          </div>
        </div>-->
      </div>
    </transition>
    <SearchForm :levelStatus="true"
                @getSearchForm="getSearchForm">
      <span>
        <el-dropdown split-button
                     type="primary"
                     @command="exportFile"
                     class="ml10">
          导出
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="csv">csv</el-dropdown-item>
            <el-dropdown-item command="excel">excel</el-dropdown-item>
            <el-dropdown-item command="json">json</el-dropdown-item>
            <el-dropdown-item command="txt">txt</el-dropdown-item>
            <el-dropdown-item command="html">html</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="primary"
                   class="ml10"
                   @click="changeNewAlarm">取消新告警标志</el-button>
        <el-button type="primary"
                   @click="batchBanned">批量封禁</el-button>
      </span>
    </SearchForm>
    <div class="current-table">
      <el-table v-loading="tableLoading"
                :data="currentAlarmList"
                style="width: 100%"
                border
                :row-class-name="addClass"
                @row-click="rowClick"
                @selection-change="handleSelectionChange"
                row-key="id">
        <el-table-column type="selection"
                         reserve-selection
                         width="45"></el-table-column>
        <el-table-column label="恶意IP"
                         width="160"
                         align="center">
          <template slot-scope="scope">
            <el-tooltip class="item"
                        effect="dark"
                        placement="bottom">
              <div v-if="scope.row.sip_show"
                   slot="content">
                <p>IP：{{scope.row.sip_show.ip}}</p>
                <p>安全域：{{scope.row.sip_show.anquanyu}}</p>
                <p>单位-部门：{{scope.row.sip_show.com_dep}}</p>
                <p>类型：{{scope.row.sip_show.cat}}</p>
                <p>责任人：{{scope.row.sip_show.staff}}</p>
                <p>联系电话：{{scope.row.sip_show.phone}}</p>
              </div>
              <div v-else
                   slot="content">
                <span>{{ scope.row.sip }} {{scope.row.sport ? ':' + scope.row.sport : ''}}</span>
              </div>
              <div>
                <!-- 0 为新告警 -->
                <span class="triangle"
                      v-if="scope.row.is_new === 0"></span>
                <span v-if="scope.row.is_new === 0">{{ scope.row.sip }} {{scope.row.sport ? ':' + scope.row.sport : ''}}</span>
                <span class="no-triangle"
                      v-else>{{ scope.row.sip }} {{scope.row.sport ? ':' + scope.row.sport : ''}}</span>
                <span class="high"
                      v-if="scope.row.forbidden"
                      style="margin-left: 5px;">已封禁</span>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="位置"
                         align="center">
          <template slot-scope="scope">
            <el-tooltip class="item"
                        effect="dark"
                        :content="scope.row.wuli_addr"
                        placement="bottom">
              <span class="curp omit">
                {{
                scope.row.wuli_addr
                }}
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="dip"
                         label="目的IP"
                         width="150"
                         align="center">
          <template slot-scope="scope">
            <el-tooltip class="item"
                        effect="dark"
                        placement="bottom">
              <div v-if="scope.row.dip_show"
                   slot="content">
                <p>IP：{{scope.row.dip_show.ip}}</p>
                <p>安全域：{{scope.row.dip_show.anquanyu}}</p>
                <p>单位-部门：{{scope.row.dip_show.com_dep}}</p>
                <p>类型：{{scope.row.dip_show.cat}}</p>
                <p>责任人：{{scope.row.dip_show.staff}}</p>
                <p>联系电话：{{scope.row.dip_show.phone}}</p>
              </div>
              <div v-else
                   slot="content">
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
        <el-table-column prop="device_ip"
                         label="告警来源"
                         align="center">
          <template slot-scope="scope">
            <el-tooltip class="item"
                        effect="dark"
                        :content="scope.row.device_ip"
                        placement="bottom">
              <span class="curp omit">{{ scope.row.device_ip }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="描述"
                         align="center">
          <template slot-scope="scope">
            <el-tooltip class="item"
                        effect="dark"
                        :content="scope.row.con"
                        placement="bottom">
              <span class="curp omit">{{ scope.row.con}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="攻击时间"
                         prop="attack_time"
                         align="center">
          <template slot-scope="scope">
            <el-tooltip class="item"
                        effect="dark"
                        :content="scope.row.attack_time"
                        placement="bottom">
              <span class="curp omit">{{ scope.row.attack_time }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="attack_type"
                         label="攻击类型"
                         width="70"
                         align="center">
          <template slot-scope="scope">
            <el-tooltip class="item"
                        effect="dark"
                        :content="scope.row.attack_type ? scope.row.attack_type : '未知'"
                        placement="bottom">
              <span class="curp omit">{{ scope.row.attack_type ? scope.row.attack_type : '未知' }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="攻击等级"
                         width="70"
                         align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.level == 0"
                  class="high">高</span>
            <span v-if="scope.row.level == 1"
                  class="middle">中</span>
            <span v-if="scope.row.level == 2"
                  class="low">低</span>
          </template>
        </el-table-column>
        <el-table-column prop="protocol"
                         width="120"
                         label="协议"
                         align="center"></el-table-column>
        <el-table-column label="操作"
                         width="150"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       class="mr10"
                       @click.native="blocked(scope.row)">一键封禁</el-button>
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
                <!-- <el-dropdown-item @click.native="repairOrder(scope.row)">一键转工单</el-dropdown-item> -->
                <!-- <el-dropdown-item @click.native="operation(scope.row, 'black')">添加黑名单</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>

          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="fr mt10"
                     background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"></el-pagination>
      <div class="fr attack-num">共 {{totalAttackNum}} 次攻击</div>
    </div>
    <div class="clearfloat"></div>
    <div v-if="blackTypeDialogStatus">
      <ChooseBlackType v-model="blackTypeDialogStatus"
                       @emitChooseType="emitChooseType"></ChooseBlackType>
    </div>
    <div v-if="addWhiteIpStatus">
      <AddWhiteIP v-model="addWhiteIpStatus"
                  :row="rowAlarmData"
                  @getCurrentAlarmList="getCurrentAlarmList"></AddWhiteIP>
    </div>

    <div v-if="chooseFirewallStatus">
      <ChooseFirewall v-model="chooseFirewallStatus"
                      @getFirewall="batchBannedOperation"></ChooseFirewall>
    </div>
  </div>
</template>

<script>
import {
  getCurrentAlarmListApi,
  setIpApi,
  setCurrentAlarmNotNewApi,
  setSingleAlarmNotNewApi,
  whiteIfPushAlarmApi,
  aKeyBlockedApi,
  repairOrderApi,
  batchBannedApi,
  exportCurrentAlarmFlieApi,
  BASE_URL,
  downloadFileApi
} from '../../tools/api'
import { mapState } from 'vuex'
import ChooseBlackType from '../../components/alarm/ChooseBlackType'
import SearchForm from '../../components/alarm/SearchForm'
import AddWhiteIP from '../../components/alarm/AddWhiteIPDialog'
import ChooseFirewall from '../../components/common/ChooseFirewall'

export default {
  components: {
    ChooseBlackType,
    SearchForm,
    AddWhiteIP,
    ChooseFirewall
  },
  data () {
    return {
      interval: null,
      alarmSettingShow: false,
      bellStatus: true,
      highBellStatus: true,
      middleBellStatus: true,
      lowBellStatus: true,
      characterStatus: true,
      highCharacterStatus: true,
      middleCharacterStatus: true,
      lowCharacterStatus: true,
      whitePushAlarm: true,
      addWhiteIpStatus: false,
      bellSrc: '',
      bellSrcArr: [],
      intervalId: null,
      tableLoading: false,
      currentAlarmList: [{}],
      rowAlarmData: {},
      currentPage: 1,
      pageSize: 20,
      total: 0,
      blackTypeDialogStatus: false,
      blackType: 2,
      searchForm: {
        sip: '',
        dip: '',
        device_ip: '',
        attack_type: '',
        time: [],
        level: ''
      },
      selectRowData: [],
      chooseFirewallStatus: false,
      selectBlockedType: '',
      totalAttackNum: 0
    }
  },
  computed: {
    ...mapState(['newAlarmData', 'userInfo'])
  },
  watch: {
    newAlarmData (val) {
      let length = val.length
      if (length) {
        this.hasAlarm(val[length - 1])
        this.currentAlarmList = [val[length - 1], ...this.currentAlarmList]
      }
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.selectRowData = val
    },
    batchBannedOperation (firewall) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      if (this.selectBlockedType === 'Akey') {
        let fd = new FormData()
        fd.append('ip', this.rowAlarmData.sip)
        fd.append('fid', firewall.id)
        aKeyBlockedApi(fd).then(res => {
          loading.close()
          let type = 'success'
          if (res.state !== this.successFlag) type = 'warning'
          this.$message({
            type,
            message: res.info
          })
          this.getCurrentAlarmList()
        })
      } else {
        let sipArr = []
        this.selectRowData.forEach(item => {
          sipArr.push(item.sip)
        })
        let fd = new FormData()
        fd.append('ipstr', sipArr.join(','))
        fd.append('fid', firewall.id)
        batchBannedApi(fd).then(res => {
          loading.close()
          let type = 'success'
          if (res.state !== this.successFlag) {
            type = 'warning'
          } else {
            this.getCurrentAlarmList()
          }
          this.$message({
            type,
            message: res.info
          })
        })
      }
    },
    batchBanned () {
      if (this.selectRowData.length > 0) {
        this.selectBlockedType = 'batch'
        this.chooseFirewallStatus = true
      } else {
        this.$message({
          type: 'warning',
          message: '请选择您要封禁的IP.'
        })
      }
    },
    rowClick (row) {
      if (row.is_new === 0) {
        let fd = new FormData()
        fd.append('id', row.id)
        setSingleAlarmNotNewApi(fd).then(res => {
          if (res.state === this.successFlag) {
            row.is_new = 1
          }
        })
      }
    },
    handleWhitePush (val) {
      let fd = new FormData()
      fd.append('white_show', Number(val))
      whiteIfPushAlarmApi(fd).then(res => {
        let type = 'success'
        if (res.state !== this.successFlag) {
          type = 'warning'
        }
        this.$message({
          type,
          message: res.info
        })
      })
    },
    changeNewAlarm () {
      for (let i = 0; i < this.currentAlarmList.length; i++) {
        if (this.currentAlarmList[i].is_new === 0) {
          setCurrentAlarmNotNewApi().then(res => {
            if (res.state === 1) {
              this.getCurrentAlarmList()
              this.$store.commit('clearNewAlarmData')
            }
          })
          return
        }
      }
    },
    bell () {
      this.bellStatus = !this.bellStatus
    },
    emitChooseType (type) {
      this.blackType = type
      let fd = new FormData()
      fd.append('ip_addr', this.rowAlarmData.sip)
      fd.append('type', 'black')
      fd.append('black_type', type)
      fd.append('id', parseInt(this.rowAlarmData.id))
      setIpApi('black', fd).then(res => {
        let type = 'success'
        let message = '设置成功'
        if (res.state !== this.successFlag) {
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
    operation (row, type) {
      this.rowAlarmData = row
      let fd = new FormData()
      fd.append('ip_addr', row.sip)
      fd.append('id', parseInt(row.id))
      if (type === 'detail') {
        window.open(row.link)
        return
      } else {
        let IpName = ''
        if (type === 'white') {
          IpName = '白名单'
          fd.append('type', 'white')
          this.addWhiteIpStatus = true
          return
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
            if (res.state !== this.successFlag) {
              type = 'warning'
              message = res.info
            }
            this.$message({
              type,
              message
            })
            this.getCurrentAlarmList()
          })
        })
      }
    },
    blocked (row) {
      if (this.userInfo.level === 0 || this.userInfo.level === 2) {
        this.$confirm('您确定要将此IP进行封禁吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.rowAlarmData = row
          this.selectBlockedType = 'Akey'
          this.chooseFirewallStatus = true
        })
      } else {
        this.$message({
          type: 'warning',
          message: '您没有权限执行此操作，请与管理员联系。'
        })
      }
    },
    repairOrder (row) {
      let fd = new FormData()
      fd.append('alert_id', row.id)
      repairOrderApi(fd).then(res => {
        let type = 'success'
        if (res.state !== this.successFlag) {
          type = 'warning'
        }
        this.$message({
          type,
          message: res.info
        })
      })
    },
    // 根据红，蓝，恶意，普通的进行添加不同类名，进行颜色区分
    addClass (row) {
      // level : 0 1 2 高 中 低
      // sip_black_type: null 黑名单 0:红，1:蓝，2:重点监控
      // sip_type: "white"   白名单
      let sipType = row.row.sip_type
      let sipBlackType = row.row.sip_black_type
      if (sipType === 'white') {
        return 'cell-white'
      } else {
        if (sipBlackType === 0) {
          return 'cell-red'
        } else if (sipBlackType === 1) {
          return 'cell-blue'
        } else if (sipBlackType === 2) {
          return ''
        } else {
          return ''
        }
      }
    },
    hasAlarm (val) {
      // sip_black_type: null 黑名单 0:红，1:蓝，2:重点监控
      // sip_type: "black" 黑。白
      let bellSrc = 'general'
      if (val.sip_black_type === 0) bellSrc = 'red'
      if (val.sip_type === 'white') bellSrc = ''
      // level : 0 1 2 高 中 低
      let level = parseInt(val.level)
      let attack_type = val.attack_type ? val.attack_type : '未知'

      let customClass
      let levelTile = ''
      if (level === 0) {
        levelTile = '高危'
        customClass = 'notify-red'
      }
      if (level === 1) {
        levelTile = '中危'
        customClass = 'notify-yellow'
      }
      if (level === 2) {
        levelTile = '低危'
        customClass = 'notify-green'
      }
      // level
      if (this.characterStatus && level === 0 && this.highCharacterStatus)
        this.showNotify(levelTile, attack_type, customClass)
      if (this.characterStatus && level === 1 && this.middleCharacterStatus)
        this.showNotify(levelTile, attack_type, customClass)
      if (this.characterStatus && level === 2 && this.lowCharacterStatus)
        this.showNotify(levelTile, attack_type, customClass)
      if (this.bellStatus && level === 0 && this.highBellStatus)
        this.pushBellSrc(bellSrc)
      if (this.bellStatus && level === 1 && this.middleBellStatus)
        this.pushBellSrc(bellSrc)
      if (this.bellStatus && level === 2 && this.lowBellStatus)
        this.pushBellSrc(bellSrc)
    },
    pushBellSrc (bellSrc) {
      this.bellSrcArr.push(bellSrc)
      this.ringBell()
    },
    ringBell () {
      this.bellSrc = this.bellSrcArr[0]
      this.bellSrcArr.forEach(item => {
        this.bellSrc = ''
        setTimeout(() => {
          this.bellSrc = item
          this.bellSrcArr.shift()
        }, 1000)
      })
    },

    showNotify (levelTile, attack_type, customClass) {
      this.$notify({
        title: `发现${levelTile}攻击`,
        message: `攻击类型：${attack_type}`,
        duration: 3000,
        showClose: false,
        customClass
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getCurrentAlarmList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getCurrentAlarmList()
    },
    getSearchForm (form) {
      this.searchForm = form
      this.getCurrentAlarmList()
    },
    exportFile (selectType) {
      let fd = new FormData()
      fd.append('type', selectType)
      fd.append('attack_type', this.searchForm.attack_type)
      fd.append('device_ip', this.searchForm.device_ip)
      fd.append('dip', this.searchForm.dip)
      fd.append('level', this.searchForm.level)
      fd.append('sip', this.searchForm.sip)
      // if (this.searchForm.time.length) {
      fd.append(
        'start_time',
        this.searchForm.time[0] ? this.searchForm.time[0] : ''
      )
      fd.append(
        'end_time',
        this.searchForm.time[1] ? this.searchForm.time[1] : ''
      )
      this.$message({
        type: 'warning',
        message: '导出文件可能需要的时间较长，请等待！',
        duration: 1500
      })

      exportCurrentAlarmFlieApi(fd)
        .then(res => {
          if (res.state !== this.successFlag) {
            this.$message({
              type: 'warning',
              message: '导出失败'
            })
          } else {
            let filePath = BASE_URL + res.file_path
            // downloadFileApi(filePath)
            if (
              selectType === 'txt' ||
              selectType === 'json' ||
              selectType === 'html'
            ) {
              // 'text/plain'
              // application/json
              // text/html
              let type = ''
              if (selectType === 'txt') type = 'text/plain'
              if (selectType === 'json') type = 'application/json'
              if (selectType === 'html') type = 'text/html'
              this.downloadFile(filePath, type)
            } else {
              window.open(filePath)
            }
          }
        })
        .catch(() => {
          this.$message({
            type: 'warning',
            message: '导出文件出错，请联系管理员。'
          })
        })
    },
    downloadFile (filePath, type) {
      downloadFileApi(filePath).then(res => {
        let blob = new Blob([res], { type })
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.setAttribute('download', 'text')
        a.setAttribute('href', url)
        a.click()
      })
    },
    getCurrentAlarmList () {
      this.tableLoading = true
      let fd = new FormData()
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
      fd.append('page', this.currentPage)
      fd.append('per_page', this.pageSize)
      getCurrentAlarmListApi(fd).then(res => {
        this.tableLoading = false
        this.currentAlarmList = res.data
        this.total = res.total
        this.whitePushAlarm = res.white_show === 1 ? true : false
        this.totalAttackNum = res.total_attack_num
      })
    }
  },
  mounted () {
    // this.getCurrentAlarmList()
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>

<style lang="scss">
.current-alarm {
  position: relative;
  .alarm-setting {
    width: 200px;
    background: #e8e8e8;
    position: fixed;
    right: 0;
    top: 50px;
    bottom: 32px;
    z-index: 100;
    padding: 10px;
    box-sizing: border-box;
    transition: all 0.5s ease-in;
    .list {
      margin-bottom: 15px;
      .content {
        background: white;
        padding: 5px;
        display: flex;
        height: 50px;
        align-items: center;
        box-sizing: border-box;
        font-size: 14px;
        // justify-content: space-between;
        border: 1px dashed #f9e9e9;
        .name {
          height: 30px;
          line-height: 30px;
          text-align: center;
          background: #409eff;
          color: white;
          padding-left: 5px;
          i {
            display: inline-block;
            height: 7px;
            width: 7px;
            background: white;
            border-radius: 50%;
          }
        }
        a {
          display: inline-block;
          width: 0;
          height: 0;
          border-width: 15px;
          border-style: solid dashed dashed dashed;
          border-color: transparent transparent transparent #409eff;
          margin-right: 0px;
        }
      }
      .content:nth-child(2) {
        border-top: none;
      }
    }
  }
  .bell {
    position: absolute;
    top: 10px;
    right: 32px;
    z-index: 10;
  }

  .current-table {
    color: black;
    .cell-blue {
      background: rgb(198, 226, 255);
      .cell {
        color: black;
      }
    }
    .cell-black {
      background: rgb(144, 147, 153);
      .cell {
        color: black;
      }
    }
    .cell-red {
      background: rgb(253, 226, 226);
      .cell {
        color: black;
      }
    }
    .cell-white {
      background: #fff9f0;
      .cell {
        color: black;
      }
    }
    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: transparent !important;
    }
    .el-table td {
      border-bottom: 1px solid transparent;
    }
    .el-table--mini td,
    .el-table--mini th {
      padding-top: 12px !important;
    }
    tbody {
      tr {
        td:nth-child(2) {
          .cell {
            overflow: inherit !important;
            .triangle {
              width: 0;
              height: 0;
              border-top: 20px solid #d9534f;
              border-right: 20px solid transparent;
              float: left;
            }

            .no-triangle {
              display: inline-block;
              text-indent: 20px;
            }
            .item {
              .is-fixed {
                top: -5px;
              }
            }
          }
        }
        .cell {
          .high,
          .middle,
          .low {
            display: inline-block;
            // padding: 0px 10px;
            text-align-last: center;
            width: 40px;
            height: 25px;
            line-height: 25px;
            border-radius: 2px;
          }
          .high {
            background: #ed3f14;
            color: white;
          }
          .middle {
            background: #ff9900;
            color: white;
          }
          .low {
            background: #19be6b;
            color: white;
          }
        }
      }
    }
  }
  .attack-num {
    padding: 0px 5px;
    color: #303133;
    font-size: 13px;
    margin-top: 10px;
    line-height: 32px;
  }
}
.notify-red,
.notify-yellow,
.notify-green {
  border: none !important;
  .el-notification__title,
  .el-notification__content {
    color: white;
  }
}
.notify-red {
  background: #f56c6c;
}
.notify-yellow {
  background: #e6a23c;
}
.notify-green {
  background: #67c23a;
}
</style>
