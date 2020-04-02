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
      <el-table :data="currentAlarmList"
                style="width: 100%">
        <el-table-column prop='sourceIp'
                         label=源IP>
        </el-table-column>
        <el-table-column prop="sourceAddress"
                         label="源物理地址">
        </el-table-column>
        <el-table-column prop="purposeIp"
                         label="目的地IP">
        </el-table-column>
        <el-table-column prop="equip"
                         label="设备">
        </el-table-column>
        <el-table-column prop="desc"
                         label="描述">
        </el-table-column>
        <el-table-column prop="time"
                         label="攻击时间">
        </el-table-column>
        <el-table-column prop="type"
                         label="攻击类型">
        </el-table-column>
        <el-table-column prop="agreeMent"
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
export default {
  data () {
    return {
      searchForm: {
        user: '',
        region: ''
      },
      currentAlarmList: [
        {
          sourceIp: '192.168.10.4:55555',
          sourceAddress: '局域网',
          purposeIp: '129.168.10.1:80',
          equip: 'JIPS 192.168.100.100',
          desc: 'WEB-MISC_/etc/passwd文件',
          time: '04/01 10:24',
          type: 'struts2',
          agreeMent: 'TCP',
          alarmType: 'low',
          ifNew: false
        },
        {
          sourceIp: '192.168.10.4:55555',
          sourceAddress: '局域网',
          purposeIp: '129.168.10.1:80',
          equip: 'JIPS 192.168.100.100',
          desc: 'WEB-MISC_/etc/passwd文件',
          time: '04/01 10:24',
          type: 'struts2',
          agreeMent: 'TCP',
          alarmType: 'middle',
          ifNew: false
        },
        {
          sourceIp: '192.168.10.4:66666',
          sourceAddress: '局域网1',
          purposeIp: '129.168.10.2:80',
          equip: 'JIPS 192.168.100.100',
          desc: 'WEB-MISC_/etc/passwd文件',
          time: '04/01 12:24',
          type: 'struts2',
          agreeMent: 'TCP',
          alarmType: 'hight',
          ifNew: false
        }
      ],
      currentPage: 1,
      total: 100
    };
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
    }
  },
  mounted () {

  },
};
</script>

<style scoped lang="scss">
.alarm-summary {
}
</style>
