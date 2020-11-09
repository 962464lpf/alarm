<template>
  <div class="diagnostic-tools">
    <el-tabs type="border-card" v-model="tabsName" class="my-elem-tabs" @tab-click="handleClick">
      <el-tab-pane label="Ping" name="ping" lazy>
        <Ping :continueInterval="Interval" @getContinueInterval="getContinueInterval"></Ping>
      </el-tab-pane>
      <el-tab-pane label="Traceroute" name="traceroute" lazy>
        <Traceroute :continueInterval="Interval" @getContinueInterval="getContinueInterval"></Traceroute>
      </el-tab-pane>
      <el-tab-pane label="CURL" name="curl" lazy>
        <CURL></CURL>
      </el-tab-pane>
      <el-tab-pane label="域名解析" name="dns" lazy>
        <Dns></Dns>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Ping from '../../components/diagnostictools/Ping'
import Traceroute from '../../components/diagnostictools/Traceroute'
import CURL from '../../components/diagnostictools/CURL'
import Dns from '../../components/diagnostictools/Dns'
import {
  pingEnd,
  tracerouteEnd,
  tracerouteContinueStop,
  pingContinueStop,
} from '../../tools/api'
export default {
  components: {
    Ping,
    Traceroute,
    CURL,
    Dns,
  },
  data() {
    return {
      tabsName: 'ping',
      Interval: null,
    }
  },
  methods: {
    getContinueInterval(val) {
      this.Interval = val
    },
    handleClick() {
      if (this.tabsName === 'traceroute') {
        pingEnd().then(() => {
          pingContinueStop()
        })
      } else {
        tracerouteEnd().then(() => {
          tracerouteContinueStop()
        })
      }
      if (this.Interval) {
        window.clearInterval(this.Interval)
      }
      this.Interval = null
    },
  },
  mounted() {},
  beforeDestroy() {
    pingEnd()
    tracerouteEnd().then(() => {
      tracerouteContinueStop()
    })
  },
}
</script>

<style  lang="scss">
.diagnostic-tools {
  color: white;
}
</style>
