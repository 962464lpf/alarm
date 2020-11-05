<template>
  <div class="fire-wall">
    <el-button type="primary" @click="openAddFireWall" class="my-elem-btn">新增防火墙</el-button>
    <div class="my-elem-table my-elem-pagination">
      <el-table
        class="mt10"
        v-loading="tableLoading"
        :data="fireWallData"
        border
        style="width: 100%"
      >
        <el-table-column prop="name" label="防火墙名称"></el-table-column>
        <el-table-column prop="url" label="地址"></el-table-column>
        <el-table-column prop="created_time" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openEditFireWall( scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="deleteFireWall(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="fr mt10"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <div class="clearfloat"></div>
    <div v-if="addFireWallStatus">
      <AddFirewall
        v-model="addFireWallStatus"
        :title="AddfireWallTitle"
        :currentRow="currentRow"
        @getFirewallForm="getFirewallForm"
        class="my-elem-form"
      ></AddFirewall>
    </div>
  </div>
</template>

<script>
import {
  getFireWallDataApi,
  deleteFirewallApi,
  addFirewallApi,
  editFirewallApi,
} from '../../tools/api'
import AddFirewall from '../../components/blockedIP/AddFirewall'
export default {
  data() {
    return {
      tableLoading: false,
      fireWallData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      addFireWallStatus: false,
      currentRow: {},
      AddfireWallTitle: '',
    }
  },
  components: {
    AddFirewall,
  },
  methods: {
    openAddFireWall() {
      this.addFireWallStatus = true
      this.AddfireWallTitle = 'add'
    },
    openEditFireWall(row) {
      this.currentRow = row
      this.addFireWallStatus = true
      this.AddfireWallTitle = 'edit'
    },
    getFirewallForm(form) {
      let fd = new FormData()
      for (let key in form.form) {
        fd.append(key, form.form[key])
      }
      let api
      let message
      if (form.type === 'add') {
        api = addFirewallApi
        message = '新增成功'
      } else {
        api = editFirewallApi
        fd.append('id', this.currentRow.id)
        message = '修改成功'
      }
      api(fd).then((res) => {
        let type = 'success'
        if (res.state !== this.successFlag) {
          type = 'warning'
          message = res.info
        } else {
          this.getFireWallData()
        }
        this.$message({
          type,
          message,
        })
      })
    },

    deleteFireWall(row) {
      this.$confirm('此操作将删除该防火墙, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        let fd = new FormData()
        fd.append('id', row.id)
        deleteFirewallApi(fd).then((res) => {
          let type = 'success'
          let message = '删除成功'
          if (res.state !== this.successFlag) {
            type = 'warning'
            message = res.info
          } else {
            this.getFireWallData()
          }
          this.$message({
            type,
            message,
          })
        })
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getFireWallData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getFireWallData()
    },
    getFireWallData() {
      this.tableLoading = true
      getFireWallDataApi().then((res) => {
        this.total = res.total
        this.fireWallData = res.data
        this.tableLoading = false
      })
    },
  },
  mounted() {
    this.getFireWallData()
  },
}
</script>

<style scoped lang="scss">
</style>
