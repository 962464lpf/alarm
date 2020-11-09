<template>
  <div class="curl">
    <el-form :model="curl" class="my-elem-form">
      <el-form-item>
        <span>CURL</span>
        <el-input
          v-model="curl.ip"
          style="width: 400px; margin-left: 50px;"
          placeholder="请输入完整的地址格式。例如:https://www.baidu.com"
        ></el-input>

        <span class="ml10">
          <el-button class="my-elem-btn" @click="confirmCurl">开始</el-button>
        </span>
      </el-form-item>

      <el-form-item>
        <el-input class="mt10" type="textarea" :rows="16" v-model="textarea"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCurl } from '../../tools/api'
export default {
  data() {
    return {
      curl: {
        ip: '',
      },
      textarea: '',
    }
  },
  methods: {
    confirmCurl() {
      let urlReg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/
      if (urlReg.test(this.curl.ip)) {
        let fd = new FormData()
        fd.append('url_addr', this.curl.ip)
        this.textarea = '请等待...'
        getCurl(fd).then((res) => {
          this.textarea = res
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请输入请输入完整的地址格式。例如:https://www.baidu.com',
        })
      }
    },
  },
  mounted() {},
}
</script>

<style scoped lang="scss">
</style>
