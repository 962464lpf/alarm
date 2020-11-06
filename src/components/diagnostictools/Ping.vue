<template>
  <div class="ping">
    <el-form :model="ping" class="my-elem-form">
      <el-form-item>
        <el-radio v-model="iptype" label="1">IPV4地址(Ping)</el-radio>
        <el-input
          v-model="ping.ipv4"
          placeholder="请输入IPV4地址"
          style="width: 400px; margin-left: 50px;"
          :disabled="ipv4Disable"
        ></el-input>
        <span class="ml10">(示例: A.B.C.D)</span>
      </el-form-item>
      <el-form-item>
        <el-radio v-model="iptype" label="2">IPV6地址(Ping)</el-radio>
        <el-input
          v-model="ping.ipv6"
          placeholder="请输入IPV6地址"
          style="width: 400px; margin-left: 50px;"
          :disabled="ipv6Disable"
        ></el-input>
        <span class="ml10">(示例: X:X:X:X:X:X:X:X)</span>
      </el-form-item>
      <el-form-item>
        <div class="start-stop mb10">
          <el-button class="my-elem-btn" @click="startPing">确定</el-button>
          <el-button class="my-elem-btn" @click="endPing">停止</el-button>
        </div>
        <el-input class="mt10" type="textarea" :rows="16" v-model="textarea"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { pingStart, pingEnd, pingContinue } from '../../tools/api'
export default {
  data() {
    return {
      ping: {
        ipv4: '',
        ipv6: '',
      },
      iptype: '1',
      textarea: '',
      continueInterval: null,
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
      let fd = new FormData()
      if (this.iptype === 1) {
        fd.append('ip', this.ping.ipv4)
      } else {
        fd.append('ip', this.ping.ipv6)
      }
      pingStart(fd).then(() => {
        this.continueReceive()
      })
    },
    continueReceive() {
      this.continueInterval = setInterval(() => {
        pingContinue().then((res) => {
          this.textarea = res
        })
      }, 1000)
    },
    endPing() {
      pingEnd().then(() => {
        window.clearInterval(this.continueInterval)
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
