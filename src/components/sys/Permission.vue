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
    role: {
      type: String,
      default: '管理员',
    },
  },
  data() {
    return {
      title: '',
      dialogVisible: this.value,
      defaultChecked: [4],
      data: [
        {
          id: 1,
          label: '导航',
          children: [
            {
              id: 4,
              label: '趋势统计',
            },
            {
              id: 2,
              label: '系统设置',
              children: [
                {
                  id: 5,
                  label: '邮件管理',
                },
                {
                  id: 6,
                  label: '账号管理',
                },
              ],
            },
          ],
        },

        {
          id: 3,
          label: '告警汇总页面',
          children: [
            {
              id: 7,
              label: '封禁',
            },
            {
              id: 8,
              label: '添加至红队IP',
            },
          ],
        },
        {
          id: 4,
          label: '账号管理页面',
          children: [
            {
              id: 41,
              label: '新增',
            },
            {
              id: 42,
              label: '删除',
            },
          ],
        },
      ],
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
    this.title = `[${this.role}]权限分配`
    this.getPermission()
  },
}
</script>

<style scoped lang="scss"></style>
