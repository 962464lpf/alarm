<template>
  <div class="white-ip">
    <!-- <el-button type="primary" @click="changAddDigIpVis">添加白名单</el-button> -->
    <el-tabs type="border-card" v-model="tabsName" class="my-elem-tabs">
      <el-tab-pane label="恶意IP" name="sip">
        <div class="my-elem-table">
          <WhiteIpList type="sip" label="恶意IP" :tableData="tableData" @removeIP="removeIP"></WhiteIpList>
        </div>
      </el-tab-pane>
      <el-tab-pane label="目的IP" name="dip">
        <div class="my-elem-table">
          <WhiteIpList type="dip" label="目的IP" :tableData="tableData" @removeIP="removeIP"></WhiteIpList>
        </div>
      </el-tab-pane>
      <el-tab-pane label="描述" name="con">
        <div class="my-elem-table">
          <WhiteIpList type="con" label="描述" :tableData="tableData" @removeIP="removeIP"></WhiteIpList>
        </div>
      </el-tab-pane>
      <el-tab-pane label="攻击类型" name="attack_type">
        <div class="my-elem-table">
          <WhiteIpList type="attack_type" label="攻击类型" :tableData="tableData" @removeIP="removeIP"></WhiteIpList>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div v-if="addIpDialogVis">
      <AddIPDialog v-model="addIpDialogVis" title="添加白队IP" @getIP="getIP"></AddIPDialog>
    </div>
  </div>
</template>

<script>
import AddIPDialog from '../../components/whiteBlackList/AddIPDialog'
import WhiteIpList from '../../components/whiteBlackList/WhiteIpList'
import { deleteIpApi, getWhiteIpBytype } from '../../tools/api'

export default {
  components: {
    AddIPDialog,
    WhiteIpList,
  },
  data() {
    return {
      addIpDialogVis: false,
      ifGetIP: false,
      tabsName: 'sip',
      tableData: [],
    }
  },
  methods: {
    changAddDigIpVis() {
      this.addIpDialogVis = true
    },
    //
    getIP(form) {
      console.log(form)
    },
    removeIP(row) {
      let fd = new FormData()
      fd.append('id', row.id)
      deleteIpApi(fd, 'white').then((res) => {
        let type = 'success'
        if (res.state !== this.successFlag) {
          type = 'warning'
        } else {
          this.getIPList()
        }
        this.$message({
          type,
          message: res.info,
        })
      })
    },
    getIPList() {
      this.tableLoading = true
      let fd = new FormData()
      fd.append('page', this.currentPage)
      fd.append('per_page', this.pageSize)

      getWhiteIpBytype(fd).then((res) => {
        this.tableData = res
        console.log(res)
      })
    },
  },
  mounted() {
    this.getIPList()
  },
}
</script>

<style scoped lang="scss">
</style>
