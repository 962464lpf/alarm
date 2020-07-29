<template>
  <div class="inside">
    <el-form :inline="true"
             :model="form"
             class="demo-form-inline">
      <el-form-item label="IP">
        <el-input v-model="form.ip"></el-input>
      </el-form-item>
      <el-form-item label="资产名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="责任人">
        <el-input v-model="form.staff"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getInsideEquip"
                   type="primary"
                   size="small">查询</el-button>
        <el-button @click="reset"
                   type="primary"
                   size="small">重置</el-button>
        <el-button @click="entryInsideEquip('single')"
                   type="primary">内部设备录入</el-button>
        <el-button @click="entryInsideEquip('more')"
                   type="primary">批量录入内部设备</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="tableLoading"
              :data="insideEquipData"
              stripe
              border
              style="width: 100%"
              class="mt10">
      <el-table-column prop="name"
                       label="资产名称"></el-table-column>
      <el-table-column prop="ip"
                       label="IP"></el-table-column>
      <el-table-column prop="anquanyu"
                       label="安全域"></el-table-column>
      <el-table-column prop="cat"
                       label="类型"></el-table-column>
      <el-table-column prop="staff"
                       label="责任人"></el-table-column>
      <el-table-column prop="phone"
                       label="联系电话"></el-table-column>
      <el-table-column label="操作"
                       width="180">
        <template slot-scope="scope">
          <el-button @click="deleteEquip(scope.row)"
                     type="text"
                     size="small">删除设备</el-button>
          <el-button @click="modify(scope.row)"
                     type="text"
                     size="small">修改设备</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="fr mt10"
                   background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[10, 20, 30, 40]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total"></el-pagination>
    <div class="clearfloat"></div>
    <div v-if="addInsideEquipStatus">
      <AddInsideEquip v-model="addInsideEquipStatus"
                      :addInsideEquipType='addInsideEquipType'
                      :currentRow='currentRow'
                      @refresh='getInsideEquip'></AddInsideEquip>
    </div>
  </div>
</template>

<script>
import AddInsideEquip from '../../components/sys/AddInsideEquip'
import { getInsideEquipApi, deleteInsideEquipApi } from '../../tools/api'
export default {
  data () {
    return {
      form: {
        ip: '',
        name: '',
        staff: ''
      },
      pageSize: 20,
      total: 0,
      currentPage: 1,
      tableLoading: false,
      insideEquipData: [],
      addInsideEquipStatus: false,
      addInsideEquipType: '',
      currentRow: null
    }
  },
  components: {
    AddInsideEquip
  },
  methods: {
    entryInsideEquip (type) {
      this.addInsideEquipStatus = true
      this.addInsideEquipType = type
    },
    deleteEquip (row) {
      this.$confirm('您确定要删除此设备吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let fd = new FormData()
        fd.append('id', row.id)
        deleteInsideEquipApi(fd).then(res => {
          let type = 'success'
          if (res.state !== this.successFlag) {
            type = 'warning'
          } else {
            this.getBlockedIP()
          }
          this.$message({
            type,
            message: res.info
          })
        })
      })
    },
    modify (row) {
      this.currentRow = row
      this.addInsideEquipStatus = true
      this.addInsideEquipType = 'modify'
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getInsideEquip()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getInsideEquip()
    },
    reset () {
      for (let key in this.form) {
        this.form[key] = ''
      }
      this.getInsideEquip()
    },
    getInsideEquip () {
      this.tableLoading = false
      let fd = new FormData()
      for (let key in this.form) {
        fd.append(key, this.form[key])
      }
      fd.append('page', this.currentPage)
      fd.append('per_page', this.pageSize)
      getInsideEquipApi(fd).then(res => {
        this.tableLoading = false
        this.insideEquipData = res.data
        this.total = res.total
      })
    }
  },
  mounted () {
    this.getInsideEquip()
  }
};
</script>

<style scoped lang="scss">
.inside {
}
</style>
