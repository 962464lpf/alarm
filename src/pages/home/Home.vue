<template>
  <div class="home">
    <div class="chart-box">
      <div class="title">
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
      <ve-line :data="chartData" height="300px" :legend-visible="false"></ve-line>
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="chart-box">
          <div class="title">
            <span>高危趋势图</span>
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
          <ve-line :data="chartData" height="300px" :legend-visible="false"></ve-line>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-box">
          <div class="title">
            <span>中危趋势图</span>
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
          <ve-line :data="chartData" height="300px" :legend-visible="false"></ve-line>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-box">
          <div class="title">
            <span>低危趋势图</span>
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
          <ve-line :data="chartData" height="300px" :legend-visible="false"></ve-line>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cycle: 'day',
      chartData: {
        columns: ['日期', '攻击次数'],
        rows: [
          { 日期: '1/1', 攻击次数: 1393 },
          { 日期: '1/2', 攻击次数: 3530 },
          { 日期: '1/3', 攻击次数: 2923 },
          { 日期: '1/4', 攻击次数: 1723 },
          { 日期: '1/5', 攻击次数: 3792 },
          { 日期: '1/6', 攻击次数: 4593 }
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
        this.chartData = {
          columns: ['日期', '攻击次数'],
          rows: [
            { 日期: '1/1', 攻击次数: 1393 },
            { 日期: '1/2', 攻击次数: 3530 },
            { 日期: '1/3', 攻击次数: 2923 },
            { 日期: '1/4', 攻击次数: 1723 },
            { 日期: '1/5', 攻击次数: 3792 },
            { 日期: '1/6', 攻击次数: 4593 }
          ]
        }
      } else if (type === 'month') {
        this.chartData = {
          columns: ['日期', '攻击次数'],
          rows: [
            { 日期: '1月', 攻击次数: 1393 },
            { 日期: '2月', 攻击次数: 3530 },
            { 日期: '3月', 攻击次数: 2923 },
            { 日期: '4月', 攻击次数: 1723 },
            { 日期: '5月', 攻击次数: 3792 },
            { 日期: '6月', 攻击次数: 4593 },
            { 日期: '7月', 攻击次数: 3593 },
            { 日期: '8月', 攻击次数: 4093 },
            { 日期: '9月', 攻击次数: 4193 },
            { 日期: '10月', 攻击次数: 4393 },
            { 日期: '11月', 攻击次数: 4553 },
            { 日期: '12月', 攻击次数: 4593 }
          ]
        }
      } else {
        this.chartData = {
          columns: ['日期', '攻击次数'],
          rows: [
            { 日期: '2018年', 攻击次数: 1393 },
            { 日期: '2019年', 攻击次数: 3530 },
            { 日期: '2020年', 攻击次数: 2923 },
            { 日期: '2021年', 攻击次数: 1723 }
          ]
        }
      }
    }
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
.home {
  .chart-box {
    border: 1px solid #eee;
    padding: 0 15px;
    box-sizing: border-box;
    margin-bottom: 15px;
    .title {
      line-height: 50px;
      text-align: center;
    }
  }
}
</style>
