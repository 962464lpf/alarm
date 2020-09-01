<template>
  <div class="equip-tatus">
    <el-row>
      <div class="title">磁盘状态</div>
      <div class="pl25">
        <el-progress :percentage="diskStatus"></el-progress>
        <p>已使用{{((equipStatus.totalDisk - equipStatus.freeDisk) * m) / m}}GB 可用{{equipStatus.freeDisk}} GB 共{{equipStatus.totalDisk}}GB</p>
      </div>
    </el-row>
    <el-row>
      <div class="title">内存状态</div>
      <div class="pl25">
        <el-progress :percentage="memoryStatus"></el-progress>
        <p>已使用{{((equipStatus.totalMemory- equipStatus.freeMemory) * m) / m}}GB 可用{{equipStatus.freeMemory}} GB 共{{equipStatus.totalMemory}}GB</p>
      </div>
    </el-row>
    <el-row>
      <div class="title">CPU状态</div>
      <div class="pl25">
        <el-progress :percentage="cpuStatus"></el-progress>
      </div>
    </el-row>
    <el-row class="mt10">
      <div class="title">系统时间</div>
      <div class="pl25">系统运行时间：{{equipStatus.runTime}} 天</div>
    </el-row>
    <el-row class="mt10">
      <div class="title">内核版本</div>
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
        totalMemory: 0,
        freeMemory: 0,
        runTime: '',
        modelName: '',
      },
      cpuStatus: 0,
      m: Math.pow(10, 20),
    }
  },
  computed: {
    diskStatus() {
      let use =
        ((this.equipStatus.totalDisk - this.equipStatus.freeDisk) * this.m) /
        this.m
      return (use / this.equipStatus.totalDisk).toFixed(3) * 100
    },
    memoryStatus() {
      let use =
        ((this.equipStatus.totalMemory - this.equipStatus.freeMemory) *
          this.m) /
        this.m
      return (use / this.equipStatus.freeMemory).toFixed(3) * 100
    },
  },
  methods: {},
  mounted() {
    getHardWareApi().then((res) => {
      this.equipStatus.totalDisk = res.total_disk
      this.equipStatus.freeDisk = parseFloat(res.free_disk)
      this.equipStatus.totalMemory = parseFloat(res.total_mem)
      this.equipStatus.freeMemory = parseFloat(res.free_mem)
      this.cpuStatus = this.equipStatus.runTime = res.run_time
      this.cpuStatus = parseFloat(res.cpu_use)
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
