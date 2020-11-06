<template>
  <div class="diagnostic-tools">
    <el-tabs type="border-card" v-model="tabsName" class="my-elem-tabs">
      <el-tab-pane label="Ping" name="ping">
        <Ping></Ping>
      </el-tab-pane>
      <el-tab-pane label="Traceroute" name="traceroute">
        <Traceroute></Traceroute>
      </el-tab-pane>
      <el-tab-pane label="CURL" name="curl">
        <CURL></CURL>
      </el-tab-pane>
      <el-tab-pane label="域名解析" name="dns">
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
    }
  },
  methods: {},
  mounted() {},
}
</script>

<style  lang="scss">
.diagnostic-tools {
  color: white;
}
</style>
