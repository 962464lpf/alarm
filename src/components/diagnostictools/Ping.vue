<template>
  <div class="ping">
    <el-form class="my-elem-form">
      <el-form-item>
        <el-radio v-model="iptype" label="1">IPV4地址(Ping)</el-radio>
        <el-input
          v-model="ipv4"
          placeholder="请输入IPV4地址"
          style="width: 400px; margin-left: 50px;"
          :disabled="ipv4Disable"
        ></el-input>
        <span class="ml10">(示例: A.B.C.D)</span>
      </el-form-item>
      <el-form-item>
        <el-radio v-model="iptype" label="2">IPV6地址(Ping)</el-radio>
        <el-input
          v-model="ipv6"
          placeholder="请输入IPV6地址"
          style="width: 400px; margin-left: 50px;"
          :disabled="ipv6Disable"
        ></el-input>
        <span class="ml10">(示例: X:X:X:X:X:X:X:X)</span>
      </el-form-item>
      <el-form-item>
        <div class="start-stop mb10">
          <el-button class="my-elem-btn" @click="startPing" :disabled="pingDisable">开始</el-button>
          <el-button class="my-elem-btn" @click="endPing">停止</el-button>
        </div>
        <el-input class="mt10" type="textarea" :rows="16" v-model="textarea"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  pingStart,
  pingEnd,
  pingContinue,
  pingContinueStop,
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
      ipv4: '',
      ipv6: '',
      iptype: '1',
      textarea: '',
      pingDisable: this.disableStatus,
    }
  },
  computed: {
    ipv6Disable() {
      return this.iptype === '1'
    },
    ipv4Disable() {
      return this.iptype === '2'
    },
  },
  methods: {
    startPing() {
      this.pingDisable = true
      var ip = /((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)(\.((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)){3}/
      var domain = /[a-zA-Z0-9][a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/
      let checkIp = ip.test(this.ipv4)
      let checkDomain = domain.test(this.ipv4)
      if (checkIp || checkDomain) {
        let fd = new FormData()
        if (this.iptype === '1') {
          fd.append('ip', this.ipv4)
        } else {
          fd.append('ip', this.ipv6)
        }
        this.textarea = '请等待...'
        pingStart(fd)
          .then((res) => {
            if (res.state === -999) {
              this.textarea = res.info
            }
            this.endPing(false)
          })
          .catch(() => {
            this.endPing(false)
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
        pingContinue()
          .then((res) => {
            if (res.length > 20) {
              this.endPing()
            } else {
              this.textarea = ''
              res.forEach((item) => {
                this.textarea += item
              })
            }
          })
          .catch(() => {
            this.endPing(false)
          })
      }, 1000)
      this.$emit('getContinueInterval', continueInterval)
    },
    endPing(isClean = true) {
      this.pingDisable = false
      window.clearInterval(this.continueInterval)
      pingEnd().then(() => {
        pingContinueStop().then((res) => {
          if (isClean) {
            this.textarea = ''
            res.forEach((item) => {
              this.textarea += item
            })
          }
        })
      })
    },
  },

  mounted() {},
}
</script>

<style  lang="scss">
.ping {
  .start-stop {
    display: flex;
    justify-content: center;
  }
}
</style>
