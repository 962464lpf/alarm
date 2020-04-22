<template>
  <div class="white-ip">
    <el-button type="primary" @click="changAddDigIpVis">添加白名单</el-button>
    <WhiteBlackList type="white" :ifGetIP="ifGetIP" @removeIP="removeIP"></WhiteBlackList>
    <div v-if="addIpDialogVis">
      <AddIPDialog v-model="addIpDialogVis" title="添加白队IP" @getIP="getIP"></AddIPDialog>
    </div>
  </div>
</template>

<script>
import WhiteBlackList from '../../components/whiteBlackList/WhiteBlackList.vue'
import AddIPDialog from '../../components/whiteBlackList/AddIPDialog'
import { addIPToWhiteBlackApi, deleteIpApi } from '../../tools/api'

export default {
  components: {
    WhiteBlackList,
    AddIPDialog
  },
  data() {
    return {
      addIpDialogVis: false,
      ifGetIP: false
    }
  },
  methods: {
    changAddDigIpVis() {
      this.addIpDialogVis = true
    },
    getIP(form) {
      let fd = new FormData()
      fd.append('ip_addr', form.ip)
      fd.append('type', 'white')
      addIPToWhiteBlackApi(fd).then(res => {
        let type = 'success'
        if (res.state == 1) {
          this.ifGetIP = true
          setTimeout(() => {
            this.ifGetIP = false
          })
        } else {
          type = 'warning'
        }
        this.$message({
          message: res.info,
          type
        })
      })
    },
    removeIP(row) {
      let fd = new FormData()
      fd.append('id', row.id)
      deleteIpApi(fd).then(res => {
        let type = 'success'
        if (res.state !== this.successFlag) {
          type = 'warning'
        } else {
          this.ifGetIP = true
          setTimeout(() => {
            this.ifGetIP = false
          })
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
</style>
