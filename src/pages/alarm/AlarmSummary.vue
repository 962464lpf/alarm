<template>
  <div class="alarm-summary">
    <div class="alarm-summary-search">
      <el-form :inline="true"
               :model="searchForm"
               ref="searchForm">
        <el-form-item label="审批人">
          <el-input v-model="searchForm.user"
                    placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="searchForm.region"
                     placeholder="活动区域">
            <el-option label="区域一"
                       value="shanghai"></el-option>
            <el-option label="区域二"
                       value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker v-model="searchForm.time"
                          type="datetimerange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     @click="onSearch(true)">查询</el-button>
          <el-button type="primary"
                     @click="onSearch(false)">充值</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="alarm-summary-table">
      <el-table :data="summaryAlarmList"
                style="width: 100%">
        <el-table-column prop='sip'
                         label=源IP>
        </el-table-column>
        <el-table-column prop="wuli_addr"
                         label="源物理地址">
        </el-table-column>
        <el-table-column prop="dip"
                         label="目的地IP">
        </el-table-column>
        <el-table-column prop="device_ip"
                         label="设备">
        </el-table-column>
        <el-table-column label="描述">
          <template slot-scope="scope">
            <el-tooltip class="item"
                        effect="dark"
                        :content="scope.row.con"
                        placement="bottom">
              <span class="curp">{{scope.row.con.slice(0, 15)+ '...'}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="攻击时间">
          <template slot-scope="scope">
            <span>{{formatDate1(scope)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="attack_type"
                         label="攻击类型">
        </el-table-column>
        <el-table-column prop="protocol"
                         width="80"
                         label="协议">
        </el-table-column>
        <el-table-column label="操作"
                         width="100">
          <template slot-scope="scope">
            <el-dropdown>
              <span class="el-dropdown-link el-button--lightblue dropbutton">
                操 作<i class="el-icon-arrow-down el-icon--right"></i>
              </span>

              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="operation(scope.row, 'detail')">详情</el-dropdown-item>
                <el-dropdown-item @click.native="operation(scope.row, 'white')">添加白名单</el-dropdown-item>
                <el-dropdown-item @click.native="operation(scope.row, 'black')">添加黑名单</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="fr clearfix"
                     background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="100"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { getAlarmListApi } from '../../tools/api'
import formatDate from '../../tools/formatDate'

export default {
  data () {
    return {
      searchForm: {
        user: '',
        region: ''
      },
      summaryAlarmList: [],
      currentPage: 1,
      total: 100
    };
  },
  methods: {
    formatDate1 (scope) {
      return formatDate("YYYY-mm-dd HH:MM", scope.row.attack_time)
    },
    operation (row, type) {
      console.log(row)
      console.log(type)
    },
    onSearch (type) {
      if (type) {
        console.log(type)
        console.log(this.searchForm)
      } else {
        this.searchForm = {}
      }
    },
    handleSizeChange (val) {
      console.log(val)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getAlarmList()
    },
    getAlarmList () {
      let fd = new FormData()
      fd.append('page', this.currentPage)
      getAlarmListApi(fd).then(res => {
        this.summaryAlarmList = res
      })
    }
  },
  mounted () {
    this.getAlarmList()
  },
};
</script>

<style scoped lang="scss">
.alarm-summary {
}
</style>
