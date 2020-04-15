<template>
  <div class="sage-equip">
    <el-form :inline="true" v-model="searchForm" ref="searchForm">
      <el-form-item label="IP">
        <el-input v-model="searchForm.ip" placeholder></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">重置</el-button>
        <el-button type="success" @click="updateEqp('add')">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="safeEquip" border style="width: 100%">
      <el-table-column prop="ip" label="IP地址" width="140"></el-table-column>
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="link" label="连接">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.link" placement="bottom">
            <p class="omit">{{scope.row.link}}</p>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="描述"></el-table-column>
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column label="密码">
        <template slot-scope>
          <span>******</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="updateEqp('edit', scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteRow(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="fr clearfix mt10"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <div v-if="updEqipDiaStatus">
      <UpdEquiqDialog
        v-model="updEqipDiaStatus"
        :title="updEqipDiaTitle"
        :equipData="equipData"
        @getSateEquipList="getSateEquipList"
      ></UpdEquiqDialog>
    </div>
  </div>
</template>

<script>
import UpdEquiqDialog from '../../components/objmgt/UpdEquipDialog'
import { getSafeEquipListApi, deleteSateEquipApi } from '../../tools/api'
export default {
  components: {
    UpdEquiqDialog
  },
  data() {
    return {
      searchForm: {
        ip: ''
      },
      safeEquip: [],
      currentPage: 1,
      pageSize: 10,
      total: 100,
      updEqipDiaStatus: false,
      equipData: {},
      updEqipDiaTitle: ''
    }
  },
  methods: {
    deleteRow(row) {
      this.$confirm('此操作将永久删除该安全设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let fd = new FormData()
        fd.append('id', row.id)
        deleteSateEquipApi(fd).then(res => {
          let type = 'warning'
          let message = '删除失败'
          if (res.state === 1) {
            type = 'success'
            message = '删除成功'
            this.getSateEquipList()
          }
          this.$message({
            type,
            message
          })
        })
      })
    },
    updateEqp(type, row) {
      this.updEqipDiaTitle = '修改安全设备信息'
      this.equipData = row
      if (type === 'add') {
        this.updEqipDiaTitle = '新增安全设备'
      }
      this.updEqipDiaStatus = true
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getAlarmList()
    },
    getSateEquipList() {
      let params = {
        page: this.currentPage,
        per_page: this.pageSize
      }
      getSafeEquipListApi(params).then(res => {
        this.safeEquip = res.data
        this.total = res.total
      })
    }
  },
  mounted() {
    this.getSateEquipList()
  }
}
</script>

<style scoped lang="scss">
.sage-equip {
}
</style>
