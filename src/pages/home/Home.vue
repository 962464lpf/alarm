<template>
  <div class="home">
    <div class="chart-box">
      <div class="trend-title">
        <span>攻击趋势图</span>
        <div class="fr">
          <el-button
            :type="cycle === 'day' ? 'primary' : ''"
            size="mini"
            @click="changeCycle('day')"
          >日</el-button>
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
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="chart-box">
          <div class="title">
            <span>恶意源IP Top5</span>
            <div class="setting fr">
              <span>
                <i class="el-icon-setting"></i>
              </span>
              <span class="ml10">
                <i class="el-icon-refresh"></i>
              </span>
            </div>
          </div>
          <ve-histogram
            :data="maliciousSourceIPTop5"
            :colors="['#c23531']"
            height="300px"
            :legend-visible="false"
          ></ve-histogram>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-box">
          <div class="title">
            <span>目的IP Top5</span>
          </div>
          <ve-histogram
            :data="attackedIPTop5"
            :colors="['#61a0a8']"
            height="300px"
            :legend-visible="false"
          ></ve-histogram>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-box">
          <div class="title">
            <span>设备来源 Top5</span>
          </div>
          <ve-histogram
            :data="deviceIPTop5"
            :colors="['#d48265']"
            height="300px"
            :legend-visible="false"
          ></ve-histogram>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-box">
          <div class="title">
            <span>物理地址 Top5</span>
          </div>
          <ve-histogram
            :data="physicalIPTop5"
            :colors="['#bda29a']"
            height="300px"
            :legend-visible="false"
          ></ve-histogram>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-box">
          <div class="title">
            <span>攻击类型 Top5</span>
          </div>
          <ve-histogram
            :data="attackedTypeTop5"
            :colors="['#bda29a']"
            height="300px"
            :legend-visible="false"
          ></ve-histogram>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-box">
          <div class="title">
            <span>红队IP Top5</span>
          </div>
          <ve-histogram :data="redIpTop5" height="300px" :legend-visible="false"></ve-histogram>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getAttackTrendApi,
  getMaliciousSourceIPTop5Api,
  getAttackedIPTop5Api,
  getDeviceIPTop5Api,
  getPhysicalIPTop5Api,
  getAttackedTypeTop5Api,
  getRedIPTop5Api
} from '../../tools/api'
export default {
  data() {
    return {
      cycle: 'day',
      attackTrend: {
        columns: ['日期', '攻击次数', '高危次数', '中危次数', '低危次数'],
        rows: [
          {
            日期: '1/1',
            攻击次数: 1393,
            高危次数: 393,
            中危次数: 400,
            低危次数: 600
          }
        ]
      },
      attackTrendSettings: {
        // stack: { 次数: ['攻击次数', '高危次数', '中危次数', '低危次数'] },
        // area: true
        area: true
      },
      attackTrendExtend: {},
      maliciousSourceIPTop5: {},
      attackedIPTop5: {},
      deviceIPTop5: {},
      physicalIPTop5: {},
      attackedTypeTop5: {},
      redIpTop5: {},
      chartData: {
        columns: ['名称', '攻击次数'],
        rows: [
          {
            名称: '192.168.1.3',
            攻击次数: 1393
          },
          {
            名称: '192.168.1.4',
            攻击次数: 1000
          },
          {
            名称: '192.168.1.5',
            攻击次数: 800
          },
          {
            名称: '192.168.1.6',
            攻击次数: 600
          },
          {
            名称: '192.168.1.7',
            攻击次数: 400
          }
        ]
      }
    }
  },
  computed: {
    getType() {
      return this.cycle === 'day' ? 'primary' : ''
    }
  },
  methods: {
    changeCycle(type) {
      this.cycle = type
      if (type === 'day') {
        this.getAttackTrend('hour')
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

    getMaliciousSourceIPTop() {
      getMaliciousSourceIPTop5Api().then(res => {
        this.formatChartData('maliciousSourceIPTop5', res, ['IP', '攻击次数'])
      })
    },
    getAttackedIPTop5() {
      getAttackedIPTop5Api().then(res => {
        this.formatChartData('attackedIPTop5', res, ['IP', '攻击次数'])
      })
    },
    getDeviceIPTop5() {
      getDeviceIPTop5Api().then(res => {
        this.formatChartData('deviceIPTop5', res, ['IP', '攻击次数'])
      })
    },
    getPhysicalIPTop5() {
      getPhysicalIPTop5Api().then(res => {
        this.formatChartData('physicalIPTop5', res, ['IP', '攻击次数'])
      })
    },
    getAttackedTypeTop5() {
      getAttackedTypeTop5Api().then(res => {
        this.formatChartData('attackedTypeTop5', res, ['类型', '攻击次数'])
      })
    },
    getRedIPTop5() {
      getRedIPTop5Api().then(res => {
        this.formatChartData('redIpTop5', res, ['IP', '攻击次数'])
      })
    }
  },
  mounted() {
    this.getAttackTrend('hour')
    this.getMaliciousSourceIPTop()
    this.getAttackedIPTop5()
    this.getDeviceIPTop5()
    this.getPhysicalIPTop5()
    this.getAttackedTypeTop5()
    this.getRedIPTop5()
  }
}
</script>

<style scoped lang="scss">
.home {
  .chart-box {
    border: 1px solid #eee;
    padding: 0 15px;
    box-sizing: border-box;
    margin-bottom: 15px;
    .trend-title {
      line-height: 50px;
      text-align: center;
    }
    .title {
      line-height: 50px;
    }
    .trend-title,
    .title {
      border-bottom: 1px solid #ececec;
      color: #333;
      font-weight: 600;
      padding: 0 5px;
    }
  }
}
</style>
