<template>
  <div class="dns">
    <el-form :model="dns" class="my-elem-form">
      <el-form-item>
        <span>域名解析</span>
        <el-input v-model="dns.ip" style="width: 400px; margin-left: 50px;"></el-input>

        <span class="ml10">
          <el-button class="my-elem-btn" @click="confirmDns">开始</el-button>
        </span>
      </el-form-item>

      <el-form-item>
        <el-input class="mt10" type="textarea" :rows="16" v-model="textarea"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getDns, pingEnd } from '../../tools/api'
export default {
  data() {
    return {
      dns: {
        ip: '',
      },
      textarea: '',
    }
  },
  methods: {
    confirmDns() {
      var domain = /[a-zA-Z0-9][a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/
      if (domain.test(this.dns.ip)) {
        let fd = new FormData()
        fd.append('domain_name', this.dns.ip)
        this.textarea = '请等待...'
        getDns(fd).then((res) => {
          if (res.state === 0) {
            this.$message({
              message: res.info,
              type: 'warning',
            })
          } else {
            this.textarea = res.info
          }
        })
        setTimeout(() => {
          pingEnd()
        }, 2000)
      } else {
        this.$message({
          message: '请输入正确的域名',
          type: 'warning',
        })
      }
    },
  },
  mounted() {},
}
</script>

<style scoped lang="scss"></style>
