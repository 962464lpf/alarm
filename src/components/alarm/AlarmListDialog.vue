<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
    <el-table :data="currentPageData" style="width: 100%">
      <el-table-column prop="dip" label="目的IP"></el-table-column>
      <el-table-column prop="device_ip" label="告警来源"></el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.con" placement="bottom">
            <span class="curp omit">{{ scope.row.con}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="攻击时间" prop="attack_time"></el-table-column>
      <el-table-column prop="attack_type" label="攻击类型">
        <template slot-scope="scope">{{scope.row.attack_type ? scope.row.attack_type : '未知'}}</template>
      </el-table-column>
      <el-table-column prop="protocol" width="80" label="协议"></el-table-column>
    </el-table>
    <el-pagination
      class="fr clearfix"
      background
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total,  prev, pager, next"
      :total="total"
    ></el-pagination>
  </el-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogVisible: this.value,
      alarmData: this.data,
      currentPage: 1,
      pageSize: 10,
      total: this.data.length,
      currentPageData: []
    }
  },
  computed: {
    title() {
      return this.alarmData[0].sip + '告警详情'
    }
  },
  methods: {
    handleClose() {
      this.$emit('input', false)
    },
    handleCurrentChange(val) {
      console.log(this.currentPage)
      this.currentPage = val
      this.sliceAlarmData()
    },
    sliceAlarmData() {
      let start = (this.currentPage - 1) * this.pageSize
      let end = this.currentPage * this.pageSize
      this.currentPageData = this.alarmData.slice(start, end)
    }
  },
  mounted() {
    this.sliceAlarmData()
  }
}
</script>

<style scoped lang="scss"></style>
