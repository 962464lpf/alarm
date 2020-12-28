<template>
  <el-dialog
    title="分配角色"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <div class="my-elem-table  my-elem-pagination">
      <el-table
        v-loading="tableLoading"
        :data="roleData"
        style="width: 100%"
        class="mt10"
        @selection-change="handleSelectionChange"
        row-key="id"
        ref="multipleTable"
      >
        <el-table-column
          type="selection"
          reserve-selection
          width="45"
        ></el-table-column>
        <el-table-column prop="name" label="角色名称"></el-table-column>
        <el-table-column prop="name" label="角色描述"></el-table-column>
      </el-table>
      <el-pagination
        class="fr mt10"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total,  prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRoleDataApi } from '../../tools/api'
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    selectRowUser: {},
  },
  data() {
    return {
      dialogVisible: this.value,
      tableLoading: false,
      roleData: [],
      currentPage: 1,
      pageSize: 10,
      total: 1,
      selectRowData: [],
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.selectRowData = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleClose() {
      this.$emit('input', false)
    },
    getRoleData() {
      let fd = new FormData()
      fd.append('page', this.currentPage)
      fd.append('per_page', this.pageSize)
      this.tableLoading = true
      getRoleDataApi(fd).then((res) => {
        this.tableLoading = false
        this.roleData = res.data
        this.total = res.total
        this.selectDefaultRole()
      })
    },
    selectDefaultRole() {
      let roleIds = []
      this.selectRowUser.user_role.forEach((item) => {
        roleIds.push(item.role_id)
      })
      let rows = []
      this.roleData.forEach((item) => {
        if (roleIds.indexOf(item.id) > -1) {
          rows.push(item)
        }
      })
      rows.forEach((row) => {
        this.$refs.multipleTable.toggleRowSelection(row)
      })
    },
    confirm() {
      if (this.selectRowData.length) {
        this.$emit('getSelectRole', this.selectRowData)
        this.handleClose()
      } else {
        this.$message({
          type: 'warning',
          message: '请选择需要分配的角色。',
        })
      }
    },
  },
  mounted() {
    this.getRoleData()
  },
}
</script>

<style scoped lang="scss"></style>
