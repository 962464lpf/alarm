<template>
  <div class="schedule">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <!-- <el-form-item label="公网IP">
        <el-input v-model="form.ip"></el-input>
      </el-form-item>-->
      <el-form-item>
        <!-- <el-button @click="getScheduleData"
                   type="primary"
                   size="small">查询</el-button>
        <el-button @click="reset"
                   type="primary"
        size="small">重置</el-button>-->
        <el-button @click="scheduleEdit('add')" class="my-elem-btn" type="primary" size="small">增加</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="tableLoading"
      :data="scheduleData"
      stripe
      border
      style="width: 100%"
      class="mt10"
    >
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="deleteSchedule(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="scheduleEdit('edit',scope.row)" type="text" size="small">修改</el-button>
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
    <div v-if="scheduleStatus">
      <AddSchedule
        v-model="scheduleStatus"
        :currentRow="currentRow"
        :operateType="operateType"
        @postRequest="postRequest"
      ></AddSchedule>
    </div>
  </div>
</template>

<script>
import AddSchedule from '../../components/sys/AddSchedule'
import {
  getScheduleApi,
  addScheduleApi,
  editScheduleApi,
  deleteScheduleApi,
} from '../../tools/api'
export default {
  data() {
    return {
      form: {
        ip: '',
      },
      pageSize: 20,
      total: 0,
      currentPage: 1,
      tableLoading: false,
      scheduleData: [{}],
      scheduleStatus: false,
      currentRow: null,
      operateType: 'add',
    }
  },
  components: {
    AddSchedule,
  },
  methods: {
    scheduleEdit(type, row) {
      this.operateType = type
      this.currentRow = row
      this.scheduleStatus = true
    },
    deleteSchedule(row) {
      this.$confirm('您确定要删除此数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        let fd = new FormData()
        fd.append('id', row.id)
        deleteScheduleApi(fd).then((res) => {
          let type = 'success'
          if (res.state !== this.successFlag) {
            type = 'warning'
          } else {
            this.getInsideEquip()
          }
          this.$message({
            type,
            message: res.info,
          })
        })
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getScheduleData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getScheduleData()
    },
    reset() {
      for (let key in this.form) {
        this.form[key] = ''
      }
      this.getScheduleData()
    },

    getScheduleData() {
      this.tableLoading = false
      let fd = new FormData()
      for (let key in this.form) {
        fd.append(key, this.form[key])
      }
      fd.append('page', this.currentPage)
      fd.append('per_page', this.pageSize)
      getScheduleApi(fd).then((res) => {
        this.tableLoading = false
        this.scheduleData = res.data
        this.total = res.total
      })
    },
    postRequest({ fd }) {
      let api = addScheduleApi
      if (this.operateType === 'edit') api = editScheduleApi
      api(fd).then((res) => {
        this.mixinPrompt(res, this.getScheduleData)
      })
    },
  },
  mounted() {
    this.getScheduleData()
  },
}
</script>

<style scoped lang="scss">
.schedule {
}
</style>
