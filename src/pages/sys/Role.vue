<template>
  <div class="role">
    <el-row>
      <el-button class="my-elem-btn" @click="handleAddRole">新增角色</el-button>
    </el-row>
    <div class="my-elem-table  my-elem-pagination">
      <el-table
        v-loading="tableLoading"
        :data="roleData"
        style="width: 100%"
        class="mt10"
      >
        <el-table-column prop="name" label="角色名称"></el-table-column>
        <el-table-column prop="desc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="bottom"
            >
              <el-button
                class="my-elem-btn"
                icon="el-icon-delete"
                size="small"
                @click="deleteRole(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="修改"
              placement="bottom"
            >
              <el-button
                class="my-elem-btn"
                icon="el-icon-edit"
                size="small"
                @click="editRole(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-button
              class="my-elem-btn"
              size="small"
              @click="addPermission(scope.row)"
              >权限分配</el-button
            >
          </template>
        </el-table-column>
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
    <div v-if="permissionStatus">
      <Permission
        v-model="permissionStatus"
        @getCheckedKey="getCheckedKey"
        :rowData="rowData"
      ></Permission>
    </div>

    <div v-if="addRoleStatus">
      <AddRole
        v-model="addRoleStatus"
        @getRoleForm="getRoleForm"
        :rowData="rowData"
        :type="type"
        class="my-elem-form"
      ></AddRole>
    </div>
  </div>
</template>

<script>
import Permission from '../../components/sys/Permission'
import AddRole from '../../components/sys/AddRole'
import {
  getRoleDataApi,
  addRoleApi,
  deleteRoleApi,
  editRoleApi,
  addPermissionApi,
} from '../../tools/api'
export default {
  components: {
    Permission,
    AddRole,
  },
  data() {
    return {
      permissionStatus: false,
      addRoleStatus: false,
      tableLoading: false,
      currentPage: 1,
      pageSize: 10,
      total: 1,
      form: {},
      roleData: [{}],
      rowData: {},
      type: '',
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleAddRole() {
      this.type = 'add'
      this.addRoleStatus = true
    },
    getRoleForm(form) {
      let fd = new FormData()
      fd.append('name', form.name)
      fd.append('desc', form.desc)
      if (this.type === 'add') {
        addRoleApi(fd).then((res) => {
          this.mixinPrompt(res, this.getRoleData())
        })
      } else {
        fd.append('id', this.rowData.id)
        editRoleApi(fd).then((res) => {
          this.mixinPrompt(res, this.getRoleData())
        })
      }
    },
    deleteRole(row) {
      this.$confirm('您确定要删除此角色吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        let fd = new FormData()
        fd.append('id', row.id)
        deleteRoleApi(fd).then((res) => {
          this.mixinPrompt(res, this.getRoleData())
        })
      })
    },
    editRole(row) {
      this.type = 'edit'
      this.rowData = row
      this.addRoleStatus = true
    },
    addPermission(row) {
      this.rowData = row
      this.permissionStatus = true
    },
    getCheckedKey(data) {
      console.log(data)
      let fd = new FormData()
      fd.append('node_ids', data.join(','))
      fd.append('role_id', this.rowData.id)
      addPermissionApi(fd).then((res) => {
        this.mixinPrompt(res, this.getRoleData)
      })
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
      })
    },
  },
  mounted() {
    this.getRoleData()
  },
}
</script>

<style scoped lang="scss"></style>
