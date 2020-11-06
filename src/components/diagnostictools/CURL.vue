<template>
  <div class="curl">
    <el-form :model="curl" class="my-elem-form">
      <el-form-item>
        <span>CURL</span>
        <el-input v-model="curl.ip" style="width: 400px; margin-left: 50px;"></el-input>

        <span class="ml10">
          <el-button class="my-elem-btn" @click="confirmCurl">确定</el-button>
          <el-button class="my-elem-btn">停止</el-button>
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
      let fd = new FormData()
      fd.append('url_addr', this.curl.ip)
      getCurl(fd).then((res) => {
        this.textarea = res
      })
    },
  },
  mounted() {},
}
</script>

<style scoped lang="scss">
</style>
