<template>
  <el-dialog :title="title"
             :visible.sync="dialogVisible"
             width="60%"
             :before-close="handleClose">
    <el-form :model="form"
             :rules="rules"
             inline
             label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="值班人员名称："
                        prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="值班人员电话："
                        prop="name">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary"
                 @click="confirm">确定</el-button>
    </span>

  </el-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    operateType: {
      type: String
    },
    currentRow: {
      type: Object
    }
  },
  data () {
    return {
      title: '',
      dialogVisible: this.value,
      form: {
        name: '',
        phone: ''
      },
      rules: {
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('input', false)
    },

    confirm () {
      let fd = new FormData()
      if (this.operateType === 'edit') fd.append('id', this.currentRow.id)
      for (let key in this.form) {
        fd.append(key, this.form[key])
      }
      this.$emit('postRequest', { fd })
      this.handleClose()
    }
  },
  mounted () {
    if (this.operateType === 'add') {
      this.title = '新增排班'
    } else {
      this.title = '修改排班'
      for (let key in this.form) {
        this.form[key] = this.currentRow[key]
      }
    }
  }
}
</script>

<style  lang="scss">
</style>
