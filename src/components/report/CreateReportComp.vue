<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
    <el-form>
      <el-form-item label="报告统计日期选择">
        <el-date-picker
          v-model="dateTime"
          type="datetimerange"
          value-format="yyyy-MM-dd HH-mm-ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <p>报告统计设备选择</p>
    <el-table
      v-loading="tableLoading"
      :data="safeEquip"
      border
      style="width: 100%"
      class="mt10"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
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
    <!-- <div v-if="reportType==='day'">
      <p>报告统计人员值班选择</p>
      <el-row class="mt10">
        <el-switch
          v-model="dayType"
          active-text="白班"
          inactive-text="夜班"
          active-color="#95d214"
          class="my-switch"
        ></el-switch>
        <el-col :span="24" class="mt10">
          <el-transfer
            v-model="dayData"
            v-if="dayType"
            :titles="['值班人员', '白班人员']"
            :data="peopleData"
          ></el-transfer>
          <el-transfer v-model="nightData" v-else :titles="['值班人员', '夜班人员']" :data="peopleData"></el-transfer>
        </el-col>
      </el-row>
    </div>-->

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getSafeEquipListApi, getScheduleApi } from '../../tools/api'

export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    reportType: {
      type: String,
      default: 'day',
    },
  },
  data() {
    return {
      title: '',
      dialogVisible: this.value,
      dateTime: [],
      tableLoading: false,
      safeEquip: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      multipleSelection: [],
      dayType: true,
      peopleData: [],
      dayData: [],
      nightData: [],
    }
  },
  computed: {
    // getName: (id) => {
    //   this.peopleData.forEach(item => {
    //     if (item.id === id) return item.name
    //   })
    // },
  },
  methods: {
    // getName (id) {
    //   this.peopleData.forEach(item => {
    //     if (item.id === id) return item.name
    //   })
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleClose() {
      this.$emit('input', false)
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
      fd.append('page', 1)
      fd.append('per_page', 1000)

      getSafeEquipListApi(fd).then((res) => {
        this.safeEquip = res.data
      })
    },
    submit() {
      if (this.dateTime.length > 0 && this.multipleSelection.length > 0) {
        let ids = []
        this.multipleSelection.forEach((item) => {
          ids.push(item.id)
        })
        let obj = {}
        if (this.reportType === 'day') {
          obj = {
            dateTime: this.dateTime,
            equipIds: ids.join(','),
            // baiban: this.dayData.join(','),
            // yeban: this.nightData.join(','),
          }
        } else {
          obj = {
            dateTime: this.dateTime,
            equipIds: ids.join(','),
          }
        }
        this.$emit('reportOpt', obj)
        this.handleClose()
      } else {
        this.$message({
          type: 'warning',
          message: '请先选择报告的统计日期和统计设备',
        })
      }
    },
    getScheduleData() {
      this.tableLoading = false
      let fd = new FormData()
      fd.append('page', this.currentPage)
      fd.append('per_page', this.pageSize)
      getScheduleApi(fd).then((res) => {
        res.data.forEach((item) => {
          let obj = {
            key: item.id,
            label: item.name,
          }
          this.peopleData.push(obj)
        })
      })
    },
  },
  mounted() {
    this.reportType === 'day'
      ? (this.title = '生成日报')
      : (this.title = '生成周报')
    this.getSateEquipList()
    this.getScheduleData()
  },
}
</script>

<style scoped lang="scss">
.my-switch {
  .el-switch__label {
    color: #8e8a8a !important;
  }
  .is-active {
    color: #95d214 !important;
  }
}
</style>
