<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="65%" :before-close="handleClose">
    <el-table :data="currentPageData" style="width: 100%">
      <el-table-column prop="dip" label="目的IP">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.dip" placement="bottom">
            <span class="curp omit">{{ scope.row.dip }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="device_ip" label="告警来源">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.device_ip" placement="bottom">
            <span class="curp omit">{{ scope.row.device_ip }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.con" placement="bottom">
            <span class="curp omit">{{ scope.row.con}}</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="攻击时间" prop="attack_time">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.attack_time"
            placement="bottom"
          >
            <span class="curp omit">{{ scope.row.attack_time }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="attack_type" label="攻击类型">
        <template slot-scope="scope">{{scope.row.attack_type ? scope.row.attack_type : '未知'}}</template>
      </el-table-column>
      <el-table-column prop="protocol" width="80" label="协议"></el-table-column>
    </el-table>
    <el-pagination
      class="fr mt10"
      background
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total,  prev, pager, next"
      :total="total"
    ></el-pagination>
    <div class="clearfloat"></div>
  </el-dialog>
</template>

<script>
import { getSumAlarmDetailListApi } from '../../tools/api'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    rowId: {
      type: Number
    },
    searchForm: {
      type: Object
    },
    rowSip: {}
  },
  data() {
    return {
      dialogVisible: this.value,
      // alarmData: this.data,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      currentPageData: []
    }
  },
  computed: {
    title() {
      return this.rowSip + '告警详情'
    }
  },
  methods: {
    handleClose() {
      this.$emit('input', false)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getDetailData()
    },
    getDetailData() {
      let fd = new FormData()
      for (let k in this.searchForm) {
        if (k === 'time') {
          fd.append(
            'start_time',
            this.searchForm[k][0] ? this.searchForm[k][0] : ''
          )
          fd.append(
            'end_time',
            this.searchForm[k][1] ? this.searchForm[k][1] : ''
          )
        } else {
          fd.append(k, this.searchForm[k])
        }
      }
      fd.append('id', this.rowId)
      fd.append('page', this.currentPage)
      fd.append('per_page', this.pageSize)
      getSumAlarmDetailListApi(fd).then(res => {
        this.currentPageData = res.data
        this.total = res.total
      })
    }
  },
  mounted() {
    this.getDetailData()
  }
}
</script>

<style scoped lang="scss"></style>
