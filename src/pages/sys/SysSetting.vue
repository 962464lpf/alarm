<template>
  <div class="sys-setting">
    <div>
      <span>白名单是否推送:</span>
      <span class="ml10">
        <el-switch v-model="whitePush" @change="handleChange"></el-switch>
      </span>
    </div>
  </div>
</template>

<script>
import { whiteIfPushAlarmApi } from '../../tools/api'
export default {
  data() {
    return {
      whitePush: true
    }
  },
  methods: {
    handleChange(val) {
      let fd = new FormData()
      fd.append('white_show', Number(val))
      whiteIfPushAlarmApi(fd).then(res => {
        let type = 'success'
        if (res.state !== this.successFlag) {
          type = 'warning'
        }
        this.$message({
          type,
          message: res.info
        })
      })
    }
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
.sys-setting {
}
</style>
