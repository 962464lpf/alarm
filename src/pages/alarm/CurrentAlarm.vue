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
                      class="item">
              <span>{{scope.row.sourceIp}}</span>

            </el-badge>
          </template>
        </el-table-column>
        <el-table-column prop="sourceAddress"
                         label="源物理地址">
        </el-table-column>
        <el-table-column prop="purposeIp"
                         label="目的地IP">
        </el-table-column>
        <el-table-column prop="equip"
                         label="设备">
        </el-table-column>
        <el-table-column prop="desc"
                         label="描述">
        </el-table-column>
        <el-table-column prop="time"
                         label="攻击时间">
        </el-table-column>
        <el-table-column prop="type"
                         label="攻击类型">
        </el-table-column>
        <el-table-column prop="agreeMent"
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
      <el-pagination class="fr clearfix"
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
export default {
  components: {
  },
  data () {
    return {
      bellStatus: true,
      bellSrc: require('../../assets/audio/1.mp3'),
      currentAlarmList: [
        {
          sourceIp: '192.168.10.4:55555',
          sourceAddress: '局域网',
          purposeIp: '129.168.10.1:80',
          equip: 'JIPS 192.168.100.100',
          desc: 'WEB-MISC_/etc/passwd文件',
          time: '04/01 10:24',
          type: 'struts2',
          agreeMent: 'TCP',
          alarmType: 'low',
          ifNew: false
        },
        {
          sourceIp: '192.168.10.4:55555',
          sourceAddress: '局域网',
          purposeIp: '129.168.10.1:80',
          equip: 'JIPS 192.168.100.100',
          desc: 'WEB-MISC_/etc/passwd文件',
          time: '04/01 10:24',
          type: 'struts2',
          agreeMent: 'TCP',
          alarmType: 'middle',
          ifNew: false
        },
        {
          sourceIp: '192.168.10.4:66666',
          sourceAddress: '局域网1',
          purposeIp: '129.168.10.2:80',
          equip: 'JIPS 192.168.100.100',
          desc: 'WEB-MISC_/etc/passwd文件',
          time: '04/01 12:24',
          type: 'struts2',
          agreeMent: 'TCP',
          alarmType: 'hight',
          ifNew: false
        }
      ],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      currentPage: 1,
      total: 100
    };
  },
  methods: {
    bell () {
      this.bellStatus = !this.bellStatus
    },
    addClass (row) {
      // 红色、橙色、黄色、蓝色
      if (row.row.alarmType === 'hight') {
        return 'cell-red'
      } else if (row.row.alarmType === 'middle') {
        return 'cell-orange'
      } else if (row.row.alarmType === 'low') {
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
    }
  },
  mounted () {
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
  }
};
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
      background: yellow;
    }
    .cell-orange {
      background: orange;
    }
    .cell-red {
      background: red;
    }
    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: transparent !important;
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
            }
          }
        }
      }
    }
  }
}
</style>
