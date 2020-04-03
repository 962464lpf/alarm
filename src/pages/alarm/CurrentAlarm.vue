<template>
  <div class="current-alarm">
    <span class="bell">
      <i class=" curp"
         :class="{
          'el-icon-bell': bellStatus,
          'el-icon-close-notification': !bellStatus
        }"
         @click="bell"></i>
    </span>

    <div class="current-table">
      <el-table :data="currentAlarmList"
                style="width: 100%"
                :row-class-name="addClass">
        <el-table-column label="源IP">
          <template slot-scope="scope">
            <div>
              <span class="triangle"
                    v-if="scope.row.ifNew"></span>
              <span>
                {{ scope.row.sip }}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="源物理地址">
          <template slot-scope="scope">
            <el-tooltip class="item"
                        effect="dark"
                        :content="scope.row.wuli_addr"
                        placement="bottom">
              <span class="curp omit">{{
                scope.row.wuli_addr
              }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="dip"
                         label="目的地IP"> </el-table-column>
        <el-table-column prop="device_ip"
                         label="设备"> </el-table-column>
        <el-table-column prop=""
                         label="描述">
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
                         prop='attack_time'>
        </el-table-column>
        <el-table-column prop="attack_type"
                         label="攻击类型">
          <template slot-scope="scope">
            {{scope.row.attack_type ? scope.row.attack_type: '未知'}}
          </template>
        </el-table-column>
        <el-table-column prop="protocol"
                         width="80"
                         label="协议">
        </el-table-column>
        <el-table-column label="操作"
                         width="100">
          <template slot-scope="scope">
            <el-dropdown>
              <span class="el-dropdown-link el-button--lightblue dropbutton">
                操 作<i class="el-icon-arrow-down el-icon--right"></i>
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
      <el-pagination class="fr clearfix mt10"
                     background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="100"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>

    <audio v-if="bellStatus"
           :src="bellSrc"
           autoplay
           loop>
      您的浏览器不支持 audio 标签。
    </audio>
  </div>
</template>

<script>
import { getAlarmListApi } from '../../tools/api'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      interval: null,
      bellStatus: true,
      bellSrc: '',
      currentAlarmList: [],
      value: '',
      currentPage: 1,
      total: 0
    }
  },
  computed: {
    ...mapState(['newAlarmData'])
  },
  watch: {
    newAlarmData (val) {
      let length = val.length
      this.hasAlarm(val)
      this.currentAlarmList = [val[length - 1], ...this.currentAlarmList]
      this.formatData(this.currentAlarmList)
    }
  },
  methods: {
    bell () {
      this.bellStatus = !this.bellStatus
    },
    addClass (row) {
      // 红色、橙色、黄色、蓝色
      if (row.row.level === 'hight') {
        return 'cell-red'
      } else if (row.row.level === 'middle') {
        return 'cell-orange'
      } else if (row.row.level === 'low') {
        return 'cell-yellow'
      } else {
        return ''
      }
    },
    operation (row, type) {
      if (type === 'detail') {
        window.open('')
      }
      console.log(row)
      console.log(type)
    },
    handleSizeChange (val) {
      console.log(val)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getAlarmList()
    },
    // formatData (list) {
    //   // level: null

    //   //     alarmType: 'low',
    //   let ifNew = d => {
    //     let date = new Date(d).getTime()
    //     let currentDate = new Date().getTime()
    //     let differTime = (currentDate - date) / 1000 / 60
    //     if (differTime > 10) {
    //       return false
    //     }
    //     return true
    //   }
    //   list.forEach(item => {
    //     item.ifNew = false
    //     if (ifNew(item.attack_time)) {
    //       item.ifNew = true
    //     }
    //   })
    //   this.currentAlarmList = list
    // },
    hasAlarm (val) {
      this.bellSrc = require('../../assets/audio/1.wav')
      this.$notify({
        title: '发现攻击',
        message: `攻击类型：${val.attack_type}`,
        type: 'warning',
        duration: 3000
      });
    },
    getAlarmList () {
      let fd = new FormData()
      fd.append('page', this.currentPage)
      fd.append('start_time', '')
      fd.append('end_time', '')
      getAlarmListApi(fd).then(res => {
        // this.formatData(res.data)
        this.currentAlarmList = res.data
        this.total = res.total
      })
    }
  },
  mounted () {
    // this.bellSrc = require('../../assets/audio/1.mp3')
    this.interval = setInterval(() => {
      this.getAlarmList()
    }, 1000 * 60 * 10)
    this.getAlarmList()
  },
  beforeDestroy () {
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
    .cell-yellow {
      // background: #5bc0de;
      .cell {
        color: #5bc0de;
      }
    }
    .cell-orange {
      background: #f0ad4e;
    }
    .cell-red {
      background: #d9534f;
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
              .el-badge__content {
                background-color: #f56c6c;
                border-radius: 10px;
                color: #fff;
                display: inline-block;
                font-size: 10px;
                height: 14px;
                line-height: 14px;
                padding: 0 4px;
                text-align: center;
                white-space: nowrap;
                border: 1px solid transparent;
              }
            }
          }
        }
      }
    }
  }
}
</style>
