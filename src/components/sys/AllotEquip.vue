<template>
  <el-dialog title="请分配安全设备" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
    <el-table
      :data="safeEquip"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      row-key="id"
    >
      <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
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
    </el-table>
    <el-pagination
      class="mt10"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <div class="clearfloat"></div>

    <div class="fr">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
    <div class="clearfloat"></div>
  </el-dialog>
</template>

<script>
import { getSafeEquipListApi } from '../../tools/api'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: this.value,
      safeEquip: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      selectEquip: []
    }
  },
  methods: {
    handleClose() {
      this.$emit('input', false)
    },
    handleSelectionChange(val) {
      this.selectEquip = []
      val.forEach(item => {
        this.selectEquip.push(item.id)
      })
      console.log(val)
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getSateEquipList()
    },
    getSateEquipList() {
      let fd = new FormData()
      fd.append('page', this.currentPage)
      fd.append('per_page', this.pageSize)
      getSafeEquipListApi(fd).then(res => {
        this.safeEquip = res.data
        this.total = res.total
      })
    },
    confirm() {
      this.$emit('getSelectEquip', this.selectEquip)
      this.handleClose()
    }
  },
  mounted() {
    this.getSateEquipList()
  }
}
</script>

<style scoped lang="scss">
</style>
