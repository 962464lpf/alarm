<template>
  <div class="traceroute">
    <el-form :model="traceroute" class="my-elem-form">
      <el-form-item>
        <span>路由追踪</span>
        <el-input v-model="traceroute.ip" style="width: 400px; margin-left: 50px;"></el-input>

        <span class="ml10">
          <el-button class="my-elem-btn" @click="startTraceroute" :disabled="routeDisable">开始</el-button>
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
  tracerouteContinueStop,
} from '../../tools/api'
export default {
  props: {
    continueInterval: {},
    disableStatus: {
      defaule: false,
    },
  },
  data() {
    return {
      traceroute: {
        ip: '',
      },
      textarea: '',
      routeDisable: this.disableStatus,
    }
  },
  methods: {
    startTraceroute() {
      this.routeDisable = true
      var ip = /((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)(\.((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)){3}/
      var domain = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/
      let checkIp = ip.test(this.traceroute.ip)
      let checkDomain = domain.test(this.traceroute.ip)
      if (checkIp || checkDomain) {
        let fd = new FormData()
        fd.append('ip', this.traceroute.ip)
        this.textarea = '请等待...'
        tracerouteStart(fd).then((res) => {
          if (res.state === 1) {
            this.endTraceroute(false)
          }
          window.clearInterval(this.continueInterval)
        })
        setTimeout(() => {
          this.continueReceive()
        }, 1000)
      } else {
        this.$message({
          message: '请输入正确的域名或ip',
          type: 'warning',
        })
      }
    },
    continueReceive() {
      let continueInterval = setInterval(() => {
        tracerouteContinue().then((res) => {
          this.textarea = ''
          res.forEach((item) => {
            this.textarea += item
          })
        })
      }, 1000)
      this.$emit('getContinueInterval', continueInterval)
    },
    endTraceroute() {
      this.routeDisable = false
      tracerouteEnd().then(() => {
        tracerouteContinueStop().then((res) => {
          this.textarea = ''
          res.forEach((item) => {
            this.textarea += item
          })
        })
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
