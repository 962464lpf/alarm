<template>
  <div class="traceroute">
    <el-form :model="traceroute" class="my-elem-form">
      <el-form-item>
        <span>路由追踪</span>
        <el-input v-model="traceroute.ip" style="width: 400px; margin-left: 50px;"></el-input>

        <span class="ml10">
          <el-button class="my-elem-btn" @click="startTraceroute">确定</el-button>
          <el-button class="my-elem-btn" @click="endTraceroute">停止</el-button>
        </span>
      </el-form-item>

      <el-form-item>
        <el-input class="mt10" type="textarea" :rows="16" v-model="textarea"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  tracerouteStart,
  tracerouteEnd,
  tracerouteContinue,
} from '../../tools/api'
export default {
  data() {
    return {
      traceroute: {
        ip: '',
      },
    }
  },
  methods: {
    startTraceroute() {
      let fd = new FormData()
      fd.append('ip', this.traceroute.ip)
      tracerouteStart(fd).then(() => {
        this.continueReceive()
      })
    },
    continueReceive() {
      this.continueInterval = setInterval(() => {
        tracerouteContinue().then((res) => {
          this.textarea = res
        })
      }, 1000)
    },
    endTraceroute() {
      tracerouteEnd().then(() => {
        window.clearInterval(this.continueInterval)
      })
    },
  },
  mounted() {},
}
</script>

<style scoped lang="scss">
.traceroute {
}
</style>
