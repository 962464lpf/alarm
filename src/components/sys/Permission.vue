<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="60%"
    :before-close="handleClose"
    ref="tree"
  >
    <el-tree
      :data="data"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps"
      :default-checked-keys="defaultChecked"
    >
    </el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="getCheckedKey">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getPermissionList } from '../../tools/api'
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    rowData: {
      type: Object,
    },
  },
  data() {
    return {
      title: '',
      dialogVisible: this.value,
      defaultChecked: [],
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
  methods: {
    handleClose() {
      this.$emit('input', false)
    },
    getCheckedKey() {
      this.$emit('getCheckedKey', this.$refs.tree.getCheckedKeys())
      this.handleClose()
    },
    getPermission() {
      getPermissionList().then((res) => {
        this.data = res
      })
    },
  },
  mounted() {
    this.title = `[${this.rowData.name}]权限分配`
    this.getPermission()
    this.defaultChecked = this.rowData.role_node
  },
}
</script>

<style scoped lang="scss"></style>
