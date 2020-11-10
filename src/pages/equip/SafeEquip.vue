<template>
  <div class="sage-equip">
    <el-form :inline="true" v-model="searchForm" ref="searchForm" class="my-elem-form">
      <el-form-item label="IP地址">
        <el-input v-model="searchForm.ip" placeholder="请输入IP地址">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="my-elem-btn" @click="getSateEquipList">查询</el-button>
        <el-button type="primary" class="my-elem-btn" @click="onReset">重置</el-button>
        <el-button type="success" class="my-elem-btn" @click="updateEqp('add')">新增</el-button>
      </el-form-item>
    </el-form>
    <div class="my-elem-table">
      <el-table v-loading="tableLoading" :data="safeEquip" border style="width: 100%">
        <el-table-column prop="ip" label="IP地址" width="140"></el-table-column>
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column prop="link" label="链接">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.link" placement="bottom">
              <p class="omit">{{scope.row.link}}</p>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="描述"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button class="my-elem-btn" size="small" @click="updateEqp('edit', scope.row)">编辑</el-button>
            <el-button class="my-elem-btn" size="small" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="my-elem-pagination">
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
import UpdEquiqDialog from '../../components/equip/UpdEquipDialog'
import { getSafeEquipListApi, deleteSateEquipApi } from '../../tools/api'
export default {
  components: {
    UpdEquiqDialog,
  },
  data() {
    return {
      searchForm: {
        ip: '',
      },
      tableLoading: false,
      safeEquip: [],
      currentPage: 1,
      pageSize: 10,
      total: 100,
      updEqipDiaStatus: false,
      equipData: {},
      updEqipDiaTitle: '',
    }
  },
  methods: {
    onReset() {
      this.searchForm.ip = ''
      this.getSateEquipList()
    },
    deleteRow(row) {
      this.$confirm('此操作将永久删除该安全设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        let fd = new FormData()
        fd.append('id', row.id)
        deleteSateEquipApi(fd).then((res) => {
          let type = 'warning'
          let message = '删除失败'
          if (res.state === 1) {
            type = 'success'
            message = '删除成功'
            this.getSateEquipList()
          }
          this.$message({
            type,
            message,
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
      this.getSateEquipList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getSateEquipList()
    },
    getSateEquipList() {
      this.tableLoading = true
      let fd = new FormData()
      fd.append('page', this.currentPage)
      fd.append('per_page', this.pageSize)
      fd.append('ip', this.searchForm.ip)

      getSafeEquipListApi(fd).then((res) => {
        this.tableLoading = false
        this.safeEquip = res.data
        this.total = res.total
      })
    },
  },
  mounted() {
    this.getSateEquipList()
  },
}
</script>

<style  lang="scss">
.sage-equip {
}
</style>
