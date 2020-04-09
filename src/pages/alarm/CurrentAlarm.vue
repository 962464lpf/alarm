<template>
  <div class="current-alarm" @click="changeNewAlarm">
    <audio v-if="bellStatus" :src="bellSrc" autoplay loop>您的浏览器不支持 audio 标签。</audio>
    <span class="bell">
      <i
        class="curp"
        :class="{
          'el-icon-bell': bellStatus,
          'el-icon-close-notification': !bellStatus
        }"
        @click="bell"
      ></i>
    </span>

    <div class="current-table">
      <el-table :data="currentAlarmList" style="width: 100%" :row-class-name="addClass">
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column label="源IP">
          <template slot-scope="scope">
            <div>
              <!-- 0 为新告警 -->
              <span class="triangle" v-if="scope.row.is_new === 0"></span>
              <span>{{ scope.row.sip }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="源物理地址">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.wuli_addr"
              placement="bottom"
            >
              <span class="curp omit">
                {{
                scope.row.wuli_addr
                }}
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="dip" label="目的地IP"></el-table-column>
        <el-table-column prop="device_ip" label="设备"></el-table-column>
        <el-table-column prop label="描述">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.con" placement="bottom">
              <span class="curp omit">{{ scope.row.con}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="攻击时间" prop="attack_time"></el-table-column>
        <el-table-column prop="attack_type" label="攻击类型" width="80">
          <template slot-scope="scope">{{scope.row.attack_type ? scope.row.attack_type: '未知'}}</template>
        </el-table-column>
        <el-table-column prop="attack_type" label="攻击等级" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.level == 0" class="hight">高</span>
            <span v-if="scope.row.level == 1" class="middle">中</span>
            <span v-if="scope.row.level == 2" class="low">低</span>
          </template>
        </el-table-column>
        <el-table-column prop="protocol" width="80" label="协议"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-dropdown>
              <span class="el-dropdown-link el-button--lightblue dropbutton">
                操 作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>

              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="operation(scope.row, 'detail')">详情</el-dropdown-item>
                <el-dropdown-item @click.native="operation(scope.row, 'white')">添加白名单</el-dropdown-item>
                <el-dropdown-item @click.native="operation(scope.row, 'black')">添加黑名单</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="fr clearfix mt10"
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

    <div v-if="blackTypeDialogStatus">
      <ChooseBlackType v-model="blackTypeDialogStatus" @emitChooseType="emitChooseType"></ChooseBlackType>
    </div>
    <el-button plain @click="open2">不会自动关闭</el-button>
  </div>
</template>

<script>
import {
  getCurrentAlarmListApi,
  setIpApi,
  setCurrentAlarmNotNewApi
} from '../../tools/api'
import { mapState } from 'vuex'
import ChooseBlackType from '../../components/alarm/ChooseBlackType'
export default {
  components: {
    ChooseBlackType
  },
  data() {
    return {
      interval: null,
      bellStatus: true,
      bellSrc: '',
      currentAlarmList: [],
      rowAlarmData: {},
      currentPage: 1,
      pageSize: 10,
      total: 0,
      blackTypeDialogStatus: false,
      blackType: 2
    }
  },
  computed: {
    ...mapState(['newAlarmData'])
  },
  watch: {
    newAlarmData(val) {
      let length = val.length
      if (length) {
        this.hasAlarm(val[length - 1])
        this.currentAlarmList = [val[length - 1], ...this.currentAlarmList]
        this.bellSrc = ''
      }
    }
  },
  methods: {
    open2() {
      this.$notify({
        title: '提示',
        message: '这是一条不会自动关闭的消息',
        duration: 0,
        customClass: 'notify-red',
        showClose: false
      })
    },
    changeNewAlarm() {
      for (let i = 0; i < this.currentAlarmList.length; i++) {
        if (this.currentAlarmList[i].is_new === 0) {
          setCurrentAlarmNotNewApi().then(res => {
            if (res.state === 1) {
              this.getCurrentAlarmList()
              this.$store.commit('clearNewAlarmData')
              // this.bellSrc = ''
            }
          })
          return
        }
      }
    },
    bell() {
      this.bellStatus = !this.bellStatus
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
        window.open('https://192.168.100.100:2000/index.html')
        return
      } else if (type === 'white') {
        this.$confirm('您确定将此源IP设置为白名单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          fd.append('type', 'white')
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
      } else {
        this.$confirm('您确定将此源IP设置为黑名单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.blackTypeDialogStatus = true
        })
      }
    },
    // 根据红，蓝，恶意，普通的进行添加不同类名，进行颜色区分
    addClass(row) {
      // level : 0 1 2 高 中 低
      // sip_black_type: null 黑名单 0:红，1:蓝，2:重点监控
      // sip_type: "white"   白名单
      let sipType = row.row.sip_type
      let sipBlackType = row.row.sip_black_type
      if (sipType === 'white') {
        return ''
      } else {
        if (sipBlackType === 0) {
          return 'cell-red'
        } else if (sipBlackType === 1) {
          return 'cell-blue'
        } else if (sipBlackType === 2) {
          return 'cell-black'
        } else {
          return ''
        }
      }
    },
    hasAlarm(val) {
      this.bellSrc = require('../../assets/audio/1.wav')
      let type = ['error', 'warning', 'info']
      let bellSrc = [
        require('../../assets/audio/1.wav'),
        require('../../assets/audio/red.wav'),
        require('../../assets/audio/general.wav')
      ]
      let level = parseInt(val.level)
      this.bellSrc = bellSrc[level]
      let attack_type = val.attack_type ? val.attack_type : '未知'
      // level : 0 1 2 高 中 低
      let customClass
      switch (level) {
        case 0:
          customClass = 'notify-red'
          break
        case 1:
          customClass = 'notify-yellow'
          break
        case 2:
          customClass = 'notify-green'
          break
        default:
          customClass = ''
          break
      }
      this.$notify({
        title: '发现攻击',
        message: `攻击类型：${attack_type}`,
        type: type[level],
        duration: 3000,
        showClose: false,
        customClass
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getCurrentAlarmList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getCurrentAlarmList()
    },
    getCurrentAlarmList() {
      let fd = new FormData()
      fd.append('page', this.currentPage)
      fd.append('per_page', this.pageSize)
      fd.append('start_time', '')
      fd.append('end_time', '')
      getCurrentAlarmListApi(fd).then(res => {
        this.currentAlarmList = res.data
        this.total = res.total
      })
    }
  },
  mounted() {
    this.getCurrentAlarmList()
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>

<style lang="scss">
.current-alarm {
  .bell {
    position: absolute;
    top: 6px;
    right: 32px;
    z-index: 10;
    i {
      color: red;
      font-size: 30px;
    }
  }

  .current-table {
    color: black;
    .cell-blue {
      background: rgb(160, 207, 255);
      .cell {
        color: white;
      }
    }
    .cell-black {
      background: rgb(144, 147, 153);
      .cell {
        color: white;
      }
    }
    .cell-red {
      background: rgb(253, 226, 226);
      .cell {
        color: white;
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
        td:first-child {
          .cell {
            overflow: inherit !important;
            .triangle {
              width: 0;
              height: 0;
              border-top: 15px solid #d9534f;
              border-right: 15px solid transparent;
            }
            .item {
              .is-fixed {
                top: -5px;
              }
            }
          }
        }
        .cell {
          .hight,
          .middle,
          .low {
            display: inline-block;
            padding: 0px 10px;
            border-radius: 7px;
          }
          .hight {
            background: #f56c6c;
          }
          .middle {
            background: #e6a23c;
          }
          .low {
            background: #67c23a;
          }
        }
      }
    }
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
