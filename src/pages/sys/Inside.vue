<template>
  <div class="inside">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="IP">
        <el-input v-model="form.ip"></el-input>
      </el-form-item>
      <el-form-item label="资产名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="责任人">
        <el-input v-model="form.staff"></el-input>
      </el-form-item>
      <el-form-item label="服务器区">
        <el-switch v-model="form.is_server" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button @click="getInsideEquip" type="primary" size="small">查询</el-button>
        <el-button @click="reset" type="primary" size="small">重置</el-button>
        <el-button @click="entryInsideEquip('single')" type="primary">资产录入</el-button>
        <el-button @click="entryInsideEquip('more')" type="primary">批量录入</el-button>
        <el-button type="primary" @click="downloadInsideFile">下载录入模板</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="tableLoading"
      :data="insideEquipData"
      stripe
      border
      style="width: 100%"
      class="mt10"
    >
      <el-table-column prop="name" label="资产名称"></el-table-column>
      <el-table-column prop="ip" label="IP"></el-table-column>
      <el-table-column prop="anquanyu" label="安全域"></el-table-column>
      <el-table-column prop="com_dep" label="单位-部门"></el-table-column>
      <el-table-column prop="cat" label="类型"></el-table-column>
      <el-table-column prop="staff" label="责任人"></el-table-column>
      <el-table-column prop="phone" label="联系电话"></el-table-column>
      <el-table-column prop="is_server" label="服务器区">
        <template slot-scope="scope">{{scope.row.is_server === 0 ? '否' : '是'}}</template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="deleteEquip(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="modify(scope.row)" type="text" size="small">修改</el-button>
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
    <div class="clearfloat"></div>
    <div v-if="addInsideEquipStatus">
      <AddInsideEquip
        v-model="addInsideEquipStatus"
        :addInsideEquipType="addInsideEquipType"
        :currentRow="currentRow"
        @postRequest="postRequest"
        @showNotify="showNotify"
      ></AddInsideEquip>
    </div>
  </div>
</template>

<script>
import AddInsideEquip from '../../components/sys/AddInsideEquip'
import {
  getInsideEquipApi,
  deleteInsideEquipApi,
  BASE_URL
} from '../../tools/api'
export default {
  data() {
    return {
      form: {
        ip: '',
        name: '',
        staff: '',
        is_server: false
      },
      pageSize: 20,
      total: 0,
      currentPage: 1,
      tableLoading: false,
      insideEquipData: [],
      addInsideEquipStatus: false,
      addInsideEquipType: '',
      currentRow: null,
      notify: null
    }
  },
  components: {
    AddInsideEquip
  },
  methods: {
    showNotify() {
      this.duration = 0
      this.notify = this.$notify({
        title: '提示',
        message: '资产正在录入...',
        type: 'info',
        duration: 0,
        position: 'bottom-right'
      })
    },
    downloadInsideFile() {
      let a = document.createElement('a')
      a.setAttribute('download', '模板')
      a.setAttribute('href', BASE_URL + '/zichan.xlsx')
      a.click()
    },
    entryInsideEquip(type) {
      this.addInsideEquipStatus = true
      this.addInsideEquipType = type
    },
    deleteEquip(row) {
      this.$confirm('您确定要删除此数据吗?', '提示', {
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
            this.getInsideEquip()
          }
          this.$message({
            type,
            message: res.info
          })
        })
      })
    },
    modify(row) {
      this.currentRow = row
      this.addInsideEquipStatus = true
      this.addInsideEquipType = 'modify'
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getInsideEquip()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getInsideEquip()
    },
    reset() {
      for (let key in this.form) {
        this.form[key] = ''
      }
      this.getInsideEquip()
    },

    getInsideEquip() {
      this.tableLoading = false
      let fd = new FormData()
      for (let key in this.form) {
        if (key === 'is_server') {
          fd.append(key, Number(this.form[key]))
        } else {
          fd.append(key, this.form[key])
        }
      }
      fd.append('page', this.currentPage)
      fd.append('per_page', this.pageSize)
      getInsideEquipApi(fd).then(res => {
        this.tableLoading = false
        this.insideEquipData = res.data
        this.total = res.total
      })
    },

    postRequest({ api, fd }) {
      api(fd).then(res => {
        if (this.notify) this.notify.close()
        let type = 'success'
        if (res.state !== this.successFlag) {
          type = 'warning'
        } else {
          this.getInsideEquip()
        }
        this.$message({
          type,
          message: res.info
        })
      })
    }
  },
  mounted() {
    this.getInsideEquip()
  }
}
</script>

<style scoped lang="scss">
.inside {
}
</style>
