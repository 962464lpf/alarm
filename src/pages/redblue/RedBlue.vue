<template>
  <div class="red-blue">
    <el-row>
      <el-button type="primary" @click="openAddDialogStatus('blue')">添加蓝队IP</el-button>
      <el-button type="danger" @click="openAddDialogStatus('red')">添加红队IP</el-button>
    </el-row>
    <el-row :gutter="20" class="list-content mt10">
      <el-col :span="12" class="first-col">
        <div class="title">
          蓝队IP
          <WhiteBlackList type="blue" class="mt10" :ifGetIP="ifGetIP" @removeIP="removeIP"></WhiteBlackList>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="title">
          红队IP
          <WhiteBlackList type="red" class="mt10" :ifGetIP="ifGetIP" @removeIP="removeIP"></WhiteBlackList>
        </div>
      </el-col>
    </el-row>

    <div v-if="addDialogStatus">
      <AddIPDialog v-model="addDialogStatus" :title="addDialogTitle" @getIP="getIP"></AddIPDialog>
    </div>
  </div>
</template>

<script>
import AddIPDialog from '../../components/whiteBlackList/AddIPDialog'
import WhiteBlackList from '../../components/whiteBlackList/WhiteBlackList'
import { addIPToWhiteBlackApi, deleteIpApi } from '../../tools/api'
export default {
  components: {
    AddIPDialog,
    WhiteBlackList
  },
  data() {
    return {
      addDialogStatus: false,
      addDialogTitle: '',
      ifGetIP: false
    }
  },
  methods: {
    openAddDialogStatus(type) {
      if (type === 'red') {
        this.addDialogTitle = '添加红队IP'
      } else {
        this.addDialogTitle = '添加蓝IP'
      }
      this.addDialogStatus = true
    },
    getIP(form) {
      let fd = new FormData()
      fd.append('ip_addr', form.ip)
      fd.append('type', 'black')
      // 0:红，1:蓝，2:重点监控
      if (this.addDialogTitle === '添加红队IP') {
        fd.append('black_type', 0)
      } else {
        fd.append('black_type', 1)
      }
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
.red-blue {
  .list-content {
    // background: #e8e8e8;
    padding: 10px 0;
    box-sizing: border-box;
    .first-col {
      // border-right: 1px solid red;
    }
    .title {
      text-align: center;
      background: white;
    }
  }
}
</style>
