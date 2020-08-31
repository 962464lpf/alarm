<template>
  <div class="equip-tatus">
    <el-row>
      <div class="title">磁盘状态</div>
      <div class="pl25">
        <el-progress :percentage="diskStatus"></el-progress>
        <p>已使用{{equipStatus.totalDisk - equipStatus.freeDisk}}GB 可用{{equipStatus.freeDisk}} GB 共{{equipStatus.totalDisk}}GB</p>
      </div>
    </el-row>
    <el-row>
      <div class="title">内存状态</div>
      <div class="pl25">
        <el-progress :percentage="memoryStatus"></el-progress>
        <p>已使用{{equipStatus.totalMemory - equipStatus.freeMemory}}GB 可用{{equipStatus.freeMemory}} GB 共{{equipStatus.totalMemory}}GB</p>
      </div>
    </el-row>
    <!-- <el-row class="mt10">
      <div class="title">负载状态</div>
      <el-row class="pl25">
        <el-col :span="12">
          <ve-line :data="cpuChartData" :settings="cpuChartSettings"></ve-line>
        </el-col>
        <el-col :span="12">
          <ve-line :data="memoryChartData" :settings="memoryChartSettings"></ve-line>
        </el-col>
      </el-row>
    </el-row>-->
    <el-row class="mt10">
      <div class="title">系统时间</div>
      <!-- <div class="pl25">系统时间：2020-8-31 14:16:23</div> -->
      <div class="pl25">系统运行时间：{{equipStatus.runTime}} 天</div>
    </el-row>
    <el-row class="mt10">
      <div class="title">内核版本</div>
      <!-- <div class="pl25">系统时间：2020-8-31 14:16:23</div> -->
      <div class="pl25">{{equipStatus.modelName}} 天</div>
    </el-row>
  </div>
</template>

<script>
import { getHardWareApi } from '../../tools/api'
export default {
  data() {
    return {
      equipStatus: {
        totalDisk: 0,
        freeDisk: 0,
        totalMemory: '',
        freeMemory: '',
        runTime: '',
        modelName: '',
      },
      cpuChartData: {
        columns: ['日期', 'cpu使用率'],
        rows: [
          { 日期: '11:30', cpu使用率: 0.45 },
          { 日期: '12:00', cpu使用率: 0.65 },
          { 日期: '12:30', cpu使用率: 0.22 },
          { 日期: '13:00', cpu使用率: 0.36 },
          { 日期: '13:30', cpu使用率: 0.48 },
          { 日期: '14:00', cpu使用率: 0.36 },
        ],
      },
      cpuChartSettings: {
        yAxisType: ['percent'],
      },
      memoryChartData: {
        columns: ['日期', '内存使用率'],
        rows: [
          { 日期: '11:30', 内存使用率: 0.45 },
          { 日期: '12:00', 内存使用率: 0.65 },
          { 日期: '12:30', 内存使用率: 0.22 },
          { 日期: '13:00', 内存使用率: 0.36 },
          { 日期: '13:30', 内存使用率: 0.48 },
          { 日期: '14:00', 内存使用率: 0.36 },
        ],
      },
      memoryChartSettings: {
        yAxisType: ['percent'],
      },
    }
  },
  computed: {
    diskStatus() {
      return (
        (
          (this.equipStatus.totalDisk - this.equipStatus.freeDisk) /
          this.equipStatus.totalDisk
        ).toFixed(3) * 100
      )
    },
    memoryStatus() {
      return (
        (
          (this.equipStatus.totalMemory - this.equipStatus.freeMemory) /
          this.equipStatus.freeMemory
        ).toFixed(3) * 100
      )
    },
  },
  methods: {},
  mounted() {
    getHardWareApi().then((res) => {
      this.equipStatus.totalDisk = res.total_disk
      this.equipStatus.freeDisk = res.free_disk.slice(
        0,
        res.free_disk.length - 1
      )
      this.equipStatus.totalMemory = res.total_mem.slice(
        0,
        res.total_mem.length - 1
      )
      this.equipStatus.freeMemory = res.free_mem.slice(
        0,
        res.free_mem.length - 1
      )
      this.equipStatus.runTime = res.run_time
      this.equipStatus.modelName = res.model_name
    })
  },
}
</script>

<style scoped lang="scss">
.equip-tatus {
  font-size: 12px;
  color: #6d6464;
  line-height: 26px;
  .title {
    font-size: 14px;
    color: #333;
  }
  .pl25 {
    padding-left: 20px;
  }
}
</style>
