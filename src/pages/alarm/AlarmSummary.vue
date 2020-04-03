<template>
  <div class="alarm-summary">
    <div class="alarm-summary-search">
      <el-form :inline="true"
               :model="searchForm"
               ref="searchForm">
        <el-form-item label="源IP">
          <el-input v-model="searchForm.ip"
                    placeholder="源IP"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker v-model="searchForm.time"
                          type="datetimerange"
                          value-format='yyyy-MM-dd HH-mm-ss'
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <div v-if="moreSearch">
          <el-form-item label="目的地IP">
            <el-input v-model="searchForm.ip"
                      placeholder="目的地IP"></el-input>
          </el-form-item>
          <el-form-item label="设备IP">
            <el-input v-model="searchForm.ip"
                      placeholder="设备IP"></el-input>
          </el-form-item>
          <el-form-item label="攻击类型">
            <el-input v-model="searchForm.ip"
                      placeholder="攻击类型"></el-input>
          </el-form-item>
        </div>

        <el-form-item>
          <el-button type="primary"
                     @click="moreSearch = !moreSearch">更多搜索条件</el-button>
          <el-button type="primary"
                     @click="onSearch(true)">查询</el-button>
          <el-button type="primary"
                     @click="onSearch(false)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="alarm-summary-table">
      <el-table :data="summaryAlarmList"
                style="width: 100%">
        <el-table-column prop="sip"
                         label="源IP"> </el-table-column>
        <el-table-column prop="wuli_addr"
                         label="源物理地址">
          <template slot-scope="scope">
            <el-tooltip class="item"
                        effect="dark"
                        :content="scope.row.wuli_addr"
                        placement="bottom">
              <span class="curp omit">{{
                scope.row.wuli_addr
              }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="dip"
                         label="目的地IP"> </el-table-column>
        <el-table-column prop="device_ip"
                         label="设备"> </el-table-column>
        <el-table-column label="描述">
          <template slot-scope="scope">
            <el-tooltip class="item"
                        effect="dark"
                        :content="scope.row.con"
                        placement="bottom">
              <span class="curp omit">{{ scope.row.con}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="攻击时间"
                         prop='attack_time'>
        </el-table-column>
        <el-table-column prop="attack_type"
                         label="攻击类型">
          <template slot-scope="scope">
            {{scope.row.attack_type ? scope.row.attack_type : '未知'}}
          </template>
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

export default {
  data () {
    return {
      moreSearch: false,
      searchForm: {
        ip: '',
        time: ''
      },
      summaryAlarmList: [],
      currentPage: 1,
      total: 0
    }
  },
  methods: {
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
        this.summaryAlarmList = res.data
        this.total = res.total
      })
    }
  },
  mounted () {
    this.getAlarmList()
  }
}
</script>

<style scoped lang="scss">
.alarm-summary {
}
</style>
