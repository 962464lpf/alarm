<template>
  <div class="new-alarm">
    <p class="title">告警信息</p>
    <el-row :gutter="20">
      <el-col :span="6" class="data-card-col">
        <div class="data-card first curp" @click="jumpTo()">
          <p>攻击总数</p>
          <p>{{attackNumDesc}}</p>
          <p>{{attackNum}}</p>
        </div>
      </el-col>
      <el-col :span="6" class="data-card-col">
        <div class="data-card second">
          <p>高危次数</p>
          <p>{{attackNumHighDesc}}</p>
          <p>{{attackNumHigh}}</p>
        </div>
      </el-col>
      <el-col :span="6" class="data-card-col">
        <div class="data-card third">
          <p>中危次数</p>
          <p>{{attackNumMiddleDesc}}</p>
          <p>{{attackNumMiddle}}</p>
        </div>
      </el-col>
      <el-col :span="6" class="data-card-col">
        <div class="data-card forth">
          <p>低危次数</p>
          <p>{{attackNumLowDesc}}</p>
          <p>{{attackNumLow}}</p>
        </div>
      </el-col>
    </el-row>
    <p class="title">趋势统计</p>
    <div class="chart-box">
      <div class="trend-title" style="height: 34px;">
        <div class="fr">
          <el-button
            :type="cycle === 'day' ? 'primary' : ''"
            size="mini"
            @click="changeCycle('day')"
          >日</el-button>
          <el-button
            :type="cycle === 'week' ? 'primary' : ''"
            size="mini"
            @click="changeCycle('week')"
          >周</el-button>
          <el-button
            :type="cycle === 'month' ? 'primary' : ''"
            size="mini"
            @click="changeCycle('month')"
          >月</el-button>
          <el-button :type="cycle === 'year' ? 'primary' : ''" @click="changeCycle('year')">年</el-button>
        </div>
      </div>
      <ve-line
        :data="attackTrend"
        height="300px"
        :settings="attackTrendSettings"
        :extend="attackTrendExtend"
      ></ve-line>
    </div>
    <el-row :gutter="20" class="mt10">
      <el-col :span="8" v-for="(item, index) in top5ChartsList" :key="index">
        <div class="chart-box" :id="item.id">
          <div class="title">
            <span>{{item.title}}</span>
            <div class="setting fr">
              <span class="curp" @click="settingCycleTop(item.fun)">
                <i class="el-icon-setting"></i>
              </span>
              <span class="ml10 curp" @click="refreshTop(item.fun, item.dataKey)">
                <i class="el-icon-refresh"></i>
              </span>
              <span class="ml10 curp" @click="fullScreenTop(item.id)">
                <i class="el-icon-full-screen"></i>
              </span>
              <span class="ml10 curp" @click="toTop(index)">
                <i class="el-icon-top"></i>
              </span>
            </div>
          </div>
          <ve-histogram
            :data="item.data()"
            :colors="item.colors"
            height="300px"
            :legend-visible="false"
            :data-empty="item.dataEmpty"
          ></ve-histogram>
        </div>
      </el-col>
    </el-row>
    <div v-if="topSettingDialogStatus">
      <TopSettingDialog v-model="topSettingDialogStatus" @getTopSetting="getTopSetting"></TopSettingDialog>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import {
  getAttackTrendApi,
  getMaliciousSourceIPTop5Api,
  getAttackedIPTop5Api,
  getDeviceIPTop5Api,
  getPhysicalIPTop5Api,
  getAttackedTypeTop5Api,
  getRedIPTop5Api,
  getAttackNumApi
} from '../../tools/api'
import TopSettingDialog from '../../components/home/TopSettingDialog'
export default {
  components: {
    TopSettingDialog
  },
  data() {
    return {
      cycle: 'day',
      attackTrend: {
        columns: ['日期', '攻击总数', '高危次数', '中危次数', '低危次数'],
        rows: [
          {
            日期: '1/1',
            攻击总数: 1393,
            高危次数: 393,
            中危次数: 400,
            低危次数: 600
          }
        ]
      },
      attackTrendSettings: {
        // stack: { 数量: ['攻击总数', '低危次数', '中危次数', '高危次数'] },
        area: true
        // area: true
      },
      attackTrendExtend: {},

      top5ChartsList: [
        {
          title: '恶意源IP Top5',
          fun: 'getMaliciousSourceIPTop',
          data: () => this.maliciousSourceIPTop5,
          // data: () => this.chartData,
          colors: ['#c23531'],
          id: 'maliciousSource',
          dataKey: 'maliciousSourceIPTop5',
          dataEmpty: true
        },
        {
          title: '目的IP Top5',
          fun: 'getAttackedIPTop5',
          data: () => this.attackedIPTop5,
          colors: ['#61a0a8'],
          id: 'attacked',
          dataKey: 'attackedIPTop5',
          dataEmpty: true
        },
        {
          title: '设备来源 Top5',
          fun: 'getDeviceIPTop5',
          data: () => this.deviceIPTop5,
          // data: () => this.chartData,
          colors: ['#d48265'],
          id: 'device',
          dataKey: 'deviceIPTop5',
          dataEmpty: true
        },
        {
          title: '物理地址 Top5',
          fun: 'getPhysicalIPTop5',
          data: () => this.physicalIPTop5,
          // data: () => this.chartData,
          colors: ['#bda29a'],
          id: 'physical',
          dataKey: 'physicalIPTop5',
          dataEmpty: true
        },
        {
          title: '攻击类型 Top5',
          fun: 'getAttackedTypeTop5',
          data: () => this.attackedTypeTop5,
          // data: () => this.chartData,
          colors: ['#bda29a'],
          id: 'attackedType',
          dataKey: 'attackedTypeTop5',
          dataEmpty: true
        },
        {
          title: '红队IP Top5',
          fun: 'getRedIPTop5',
          data: () => this.redIpTop5,
          // data: () => this.chartData,
          colors: ['#d48265'],
          id: 'red',
          dataKey: 'redIpTop5',
          dataEmpty: true
        }
      ],
      selectSettingTop: '',
      topSettingDialogStatus: false,
      maliciousSourceIPTop5: {},
      attackedIPTop5: {},
      deviceIPTop5: {},
      physicalIPTop5: {},
      attackedTypeTop5: {},
      redIpTop5: {},
      chartData: {
        columns: ['名称', '攻击次数', '高危'],
        rows: [
          {
            名称: '192.168.1.3',
            攻击次数: 1393,
            高危: 1200
          },
          {
            名称: '192.168.1.4',
            攻击次数: 1000,
            高危: 1221
          },
          {
            名称: '192.168.1.5',
            攻击次数: 800,
            高危: 1235
          },
          {
            名称: '192.168.1.6',
            攻击次数: 600,
            高危: 1278
          },
          {
            名称: '192.168.1.7',
            攻击次数: 400,
            高危: 1212
          }
        ]
      }
    }
  },
  computed: {
    getType() {
      return this.cycle === 'day' ? 'primary' : ''
    },
    ...mapState([
      'attackNum',
      'attackNumHigh',
      'attackNumMiddle',
      'attackNumLow',
      'attackNumDesc',
      'attackNumHighDesc',
      'attackNumMiddleDesc',
      'attackNumLowDesc'
    ])
  },
  methods: {
    jumpTo() {
      this.$router.push('/alarm/summary')
    },
    getTopSetting(form) {
      this[this.selectSettingTop](form.cycle)
    },
    settingCycleTop(top) {
      this.selectSettingTop = top
      this.topSettingDialogStatus = true
    },
    refreshTop(method, dataKey) {
      this[dataKey] = {}
      this[method]()
    },
    fullScreenTop(id) {
      let dom = document.getElementById(id)
      //W3C
      if (dom.requestFullscreen) {
        dom.requestFullscreen()
      }
      //FireFox
      else if (dom.mozRequestFullScreen) {
        dom.mozRequestFullScreen()
      }
      //Chrome等
      else if (dom.webkitRequestFullScreen) {
        dom.webkitRequestFullScreen()
      }
      //IE11
      else if (dom.msRequestFullscreen) {
        dom.msRequestFullscreen()
      }
      dom.style.backgroundColor = 'white'
      // dom.webkitRequestFullScreen()
    },
    toTop(index) {
      let currentChart = this.top5ChartsList[index]
      this.top5ChartsList.splice(index, 1)
      this.top5ChartsList.unshift(currentChart)
    },
    changeCycle(type) {
      this.cycle = type
      if (type === 'day') {
        this.getAttackTrend('hour')
      } else if (type === 'week') {
        this.getAttackTrend('week')
      } else if (type === 'month') {
        this.getAttackTrend('day')
      } else {
        this.getAttackTrend('month')
      }
    },
    getAttackTrend(type) {
      let fd = new FormData()
      fd.append('type', type)
      getAttackTrendApi(fd).then(res => {
        this.attackTrend = {
          columns: [],
          rows: []
        }
        this.attackTrend.columns = [
          'time',
          '攻击总数',
          '高危次数',
          '中危次数',
          '低危次数'
        ]
        let time = ''
        switch (this.cycle) {
          case 'day':
            time = ':00'
            break
          case 'month':
            time = '号'
            break
          case 'week':
            time = ''
            break
          case 'year':
            time = '月'
            break
          default:
            time = ':00'
            break
        }
        let all = res.all
        let high = res.high
        let middle = res.middle
        let low = res.low
        for (let k in all) {
          let obj = {
            time: k + time,
            攻击总数: all[k],
            高危次数: high[k],
            中危次数: middle[k],
            低危次数: low[k]
          }
          this.attackTrend.rows.push(obj)
        }
      })
    },
    formatChartData(data, res, columns) {
      this[data] = {
        columns: [],
        rows: []
      }
      this[data].columns = columns
      for (let key in res) {
        let obj = {
          [columns[0]]: key,
          [columns[1]]: res[key]
        }
        this[data].rows.push(obj)
      }
    },
    isDataEmpth(res, funName) {
      let keyLens = Object.keys(res).length
      this.top5ChartsList.forEach(item => {
        if (item.fun === funName && keyLens) item.dataEmpty = false
      })
    },
    getMaliciousSourceIPTop(cycle = 'day') {
      getMaliciousSourceIPTop5Api().then(res => {
        this.isDataEmpth(res[cycle], 'getMaliciousSourceIPTop')
        this.formatChartData('maliciousSourceIPTop5', res[cycle], [
          'IP',
          '攻击次数'
        ])
      })
    },
    getAttackedIPTop5(cycle = 'day') {
      getAttackedIPTop5Api().then(res => {
        this.isDataEmpth(res[cycle], 'getAttackedIPTop5')
        this.formatChartData('attackedIPTop5', res[cycle], ['IP', '攻击次数'])
      })
    },
    getDeviceIPTop5(cycle = 'day') {
      getDeviceIPTop5Api().then(res => {
        this.isDataEmpth(res[cycle], 'getDeviceIPTop5')
        this.formatChartData('deviceIPTop5', res[cycle], ['IP', '攻击次数'])
      })
    },
    getPhysicalIPTop5(cycle = 'day') {
      getPhysicalIPTop5Api().then(res => {
        this.isDataEmpth(res[cycle], 'getPhysicalIPTop5')
        this.formatChartData('physicalIPTop5', res[cycle], ['IP', '攻击次数'])
      })
    },
    getAttackedTypeTop5(cycle = 'day') {
      getAttackedTypeTop5Api().then(res => {
        this.isDataEmpth(res[cycle], 'getAttackedTypeTop5')
        this.formatChartData('attackedTypeTop5', res[cycle], [
          '类型',
          '攻击次数'
        ])
      })
    },
    getRedIPTop5(cycle = 'day') {
      getRedIPTop5Api().then(res => {
        this.isDataEmpth(res[cycle], 'getRedIPTop5')
        this.formatChartData('redIpTop5', res[cycle], ['IP', '攻击次数'])
      })
    }
  },
  mounted() {
    let refresh = sessionStorage.getItem('refresh')
    if (refresh === 'false') {
      sessionStorage.setItem('refresh', true)
      location.reload()
    }
    this.getAttackTrend('hour')
    this.getMaliciousSourceIPTop()
    this.getAttackedIPTop5()
    this.getDeviceIPTop5()
    this.getPhysicalIPTop5()
    this.getAttackedTypeTop5()
    this.getRedIPTop5()
    getAttackNumApi().then(res => {
      this.$store.commit('changeAttackNum', res)
    })
  }
}
</script>

<style  lang="scss">
.new-alarm {
  .title {
    font-size: 16px;
    font-weight: 400;
    line-height: 48px;
  }
  .data-card-col {
    display: flex;
    justify-content: center;
    .data-card {
      // height: 120px;
      width: 100%;
      border-radius: 10px;
      padding: 10px 0 10px 20px;
      box-sizing: border-box;
      color: white;
      font-size: 12px;
      line-height: 24px;
      p:nth-of-type(3) {
        font-size: 24px;
        line-height: 48px;
      }
    }
    .first {
      background: #8693f3;
      box-shadow: 0 0 8px #8693f3;
    }
    .second {
      background: #bc8dee;
      box-shadow: 0 0 8px #bc8dee;
    }
    .third {
      background: #ffa897;
      box-shadow: 0 0 8px #ffa897;
    }
    .forth {
      background: #89c3f8;
      box-shadow: 0 0 8px #89c3f8;
    }
  }
  .chart-box {
    // border: 1px solid #dadada;
    // padding: 0 15px;
    box-shadow: 0 0 5px #dadada;
    box-sizing: border-box;
    margin-bottom: 15px;
    .trend-title {
      line-height: 50px;
      text-align: center;
    }
    .trend-title,
    .title {
      border-radius: 5px 5px 0 0;
      border-bottom: 1px solid #dadada;
      padding: 8px;
      line-height: 34px;
    }
    .v-charts-data-empty {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: hsla(0, 0%, 100%, 0.9);
      color: #888;
      font-size: 14px;
    }
  }
}
</style>
