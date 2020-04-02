<template>
  <div class="current-alarm">
    <span class="bell">
      <i class=" curp"
         :class="{ 'el-icon-bell': bellStatus, 'el-icon-close-notification': !bellStatus }"
         @click="bell"></i>

    </span>

    <div class="current-table">
      <el-table :data="currentAlarmList"
                style="width: 100%"
                :row-class-name='addClass'>
        <el-table-column label=源IP>
          <template slot-scope="scope">
            <el-badge value="new"
                      class="item"
                      v-if="scope.row.ifNew">
              <span>{{scope.row.sip}}</span>

            </el-badge>
            <span v-else>{{scope.row.sip}}</span>
          </template>
        </el-table-column>
        <el-table-column label="源物理地址">
          <template slot-scope="scope">
            <el-tooltip class="item"
                        effect="dark"
                        :content="scope.row.wuli_addr"
                        placement="bottom">
              <span class="curp">{{scope.row.wuli_addr.slice(0, 6) + '...'}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="dip"
                         label="目的地IP">
        </el-table-column>
        <el-table-column prop="device_ip"
                         label="设备">
        </el-table-column>
        <el-table-column prop=""
                         label="描述">
          <template slot-scope="scope">
            <el-tooltip class="item"
                        effect="dark"
                        :content="scope.row.con"
                        placement="bottom">
              <span class="curp">{{scope.row.con.slice(0, 15)+ '...'}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="攻击时间">
          <template slot-scope="scope">
            <span>{{formatDate1(scope)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="attack_type"
                         label="攻击类型">
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
import formatDate from '../../tools/formatDate'
export default {
  components: {
  },
  data () {
    return {
      interval: null,
      bellStatus: true,
      bellSrc: require('../../assets/audio/1.mp3'),
      currentAlarmList: [],
      value: '',
      currentPage: 1,
      total: 100
    }
  },
  methods: {

    formatDate1 (scope) {
      return formatDate("YYYY-mm-dd HH:MM", scope.row.attack_time)
    },
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
    formatData (list) {
      // level: null

      //     alarmType: 'low',
      let ifNew = (date) => {

        let attack_time = parseInt(date) * 1000
        let currentDate = new Date().getTime()
        let differTime = (currentDate - attack_time) / 1000 / 60
        if (differTime > 10) {
          return false
        }
        return true

      }
      this.currentAlarmList = list
      list.forEach(item => {
        item.ifNew = false
        if (ifNew(item.attack_time)) {
          item.ifNew = true
        }
      })
    },
    getAlarmList () {
      let fd = new FormData()
      fd.append('page', this.currentPage)
      getAlarmListApi(fd).then(res => {
        this.formatData(res)
      })
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      this.getAlarmList()
    }, 1000 * 10)
    this.getAlarmList()
    let types = [
      'success', 'warning', 'info', 'error',
      'success', 'warning', 'info', 'error'
    ]
    let i = 0
    let interval = setInterval(() => {
      if (i > types.length) clearInterval(interval)
      switch (types[i]) {
        case 'success':
          this.bellSrc = require('../../assets/audio/1.mp3')
          break
        case 'warning':
          this.bellSrc = require('../../assets/audio/2.mp3')
          break
        case 'info':
          this.bellSrc = require('../../assets/audio/3.mp3')
          break
        case 'error':
          this.bellSrc = require('../../assets/audio/4.mp3')
          break
        default:
          this.bellSrc = require('../../assets/audio/1.mp3')

      }
      // this.$notify({
      //   title: types[i],
      //   message: '...警告',
      //   type: types[i],
      //   duration: 4000
      // });
      i++
    }, 3000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>

<style  lang="scss">
.current-alarm {
  .bell {
    position: absolute;
    top: 10px;
    right: 25px;
    i {
      color: red;
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
