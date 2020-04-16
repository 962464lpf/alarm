<template>
  <div class="user">
    <el-table :data="userData" stripe border style="width: 100%">
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column label="权限">
        <template slot-scope="scope">{{getLevel(scope)}}</template>
      </el-table-column>
      <el-table-column prop label="当前分配设备"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="deleteUser(scope.row)" type="text" size="small">删除用户</el-button>
          <el-button type="text" size="small" @click="allotEquip(scope.row)">分配设备</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="allotEquipStatus">
      <TopSettingDialog v-model="allotEquipStatus"></TopSettingDialog>
    </div>
    <div v-if="allotEquipStatus">
      <AllotEquip v-model="allotEquipStatus" @getSelectEquip="getSelectEquip"></AllotEquip>
    </div>
  </div>
</template>

<script>
import AllotEquip from '../../components/sys/AllotEquip'
import TopSettingDialog from '../../components/home/TopSettingDialog'
import { getUserListApi, userAllotEquipApi } from '../../tools/api'
export default {
  components: {
    AllotEquip,
    TopSettingDialog
  },
  data() {
    return {
      userData: [
        {
          username: '123',
          level: 0
        },
        {
          username: 'admin',
          level: 1
        }
      ],
      allotEquipStatus: false,
      selectRowUser: ''
    }
  },
  methods: {
    getLevel(scope) {
      if (scope.row.level === 0) {
        return '超级管理员'
      } else if (scope.row.level === 1) {
        return '普通用户'
      }
    },
    deleteUser(row) {
      this.$confirm('您确定删除此用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row)
      })
    },
    allotEquip(row) {
      console.log(row)
      this.selectRowUser = row
      this.allotEquipStatus = true
    },
    getSelectEquip(data) {
      this.userAllotEquip(data.join(','))
    },
    userAllotEquip(equips) {
      let fd = new FormData()
      fd.append('id', this.selectRowUser.id)
      fd.append('device_auth', equips)
      userAllotEquipApi(fd).then(res => {
        let type = 'success'
        if (res.state !== 1) {
          type = 'warning'
        }
        this.$message({
          type,
          message: res.info
        })
      })
    },
    getUserList() {
      getUserListApi().then(res => {
        this.userData = res
      })
    }
  },
  mounted() {
    this.getUserList()
  }
}
</script>

<style scoped lang="scss">
</style>
