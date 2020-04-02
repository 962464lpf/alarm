<template>
  <div class="sage-equip">
    <el-form :inline="true" v-model="searchForm" ref="searchForm">
      <el-form-item label="审批人">
        <el-input v-model="searchForm.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">重置</el-button>
        <el-button type="success" @click="updateEqp('add')">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="safeEquip" border style="width: 100%">
      <el-table-column prop="date" label="IP地址" width="180">
      </el-table-column>
      <el-table-column prop="name" label="名称" width="180"> </el-table-column>
      <el-table-column prop="address" label="连接"> </el-table-column>
      <el-table-column prop="address" label="描述"> </el-table-column>
      <el-table-column prop="address" label="账号"> </el-table-column>
      <el-table-column prop="address" label="密码"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="updateEqp('edit', scope.row)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="deleteRow(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="fr clearfix mt10"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <div v-if="updEqipDiaStatus">
      <UpdEquiqDialog
        v-model="updEqipDiaStatus"
        :title="updEqipDiaTitle"
        :equipData="equipData"
      ></UpdEquiqDialog>
    </div>

    <el-table :data="newAlarmData" border style="width: 100%">
      <el-table-column prop="ip" label="IP地址" width="180"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import UpdEquiqDialog from '../../components/objmgt/UpdEquipDialog'
import { mapState } from 'vuex'
export default {
  components: {
    UpdEquiqDialog
  },
  computed: {
    ...mapState(['newAlarmData'])
  },
  watch: {
    newAlarmData(val) {
      console.log(val)
    }
  },
  data() {
    return {
      searchForm: [],
      safeEquip: [
        {
          ip: '2',
          name: '2',
          link: '2',
          userName: '2',
          password: '2',
          desc: '2'
        }
      ],
      currentPage: 1,
      total: 100,
      updEqipDiaStatus: false,
      equipData: {},
      updEqipDiaTitle: ''
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(val)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getAlarmList()
    },
    deleteRow(row) {
      this.$confirm('此操作将永久删除该安全设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row)
      })
    },
    updateEqp(type, row) {
      this.updEqipDiaTitle = '修改安全设备信息'
      this.equipData = row
      if (type === 'add') {
        this.updEqipDiaTitle = '新增安全设备'
      }
      this.updEqipDiaStatus = true
    }
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
.sage-equip {
}
</style>
