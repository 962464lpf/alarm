<template>
  <el-dialog title="生成报告" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
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

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getSafeEquipListApi } from '../../tools/api'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: this.value,
      dateTime: [],
      tableLoading: false,
      safeEquip: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      multipleSelection: []
    }
  },
  methods: {
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
      fd.append('page', this.currentPage)
      fd.append('per_page', this.pageSize)
      fd.append('ip', '')

      getSafeEquipListApi(fd).then(res => {
        this.tableLoading = false
        this.safeEquip = res.data
        this.total = res.total
      })
    },
    submit() {
      if (this.dateTime.length > 0 && this.multipleSelection.length > 0) {
        let ids = []
        this.multipleSelection.forEach(item => {
          ids.push(item.id)
        })
        this.$emit('reportOpt', {
          dateTime: this.dateTime,
          equipIds: ids.join(',')
        })
        this.handleClose()
      } else {
        this.$message({
          type: 'warning',
          message: '请先选择报告的统计日期和统计设备'
        })
      }
    }
  },
  mounted() {
    this.getSateEquipList()
  }
}
</script>

<style scoped lang="scss">
</style>
