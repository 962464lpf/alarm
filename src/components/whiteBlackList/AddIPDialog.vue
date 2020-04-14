<template>
  <div class="add-red-blue">
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="130px">
        <el-form-item label="请输入IP或IP范围">
          <el-input v-model="form.ip"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="fr clearfloat">
        <el-button type="primary" @click="onConfirm">确定</el-button>
        <el-button @click="handleClose">取消</el-button>
      </el-row>
      <div class="clearfloat"></div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: this.value,
      form: {
        ip: ''
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('input', false)
    },
    onConfirm() {
      this.$emit('getIP', this.form)
      this.handleClose()
      // let fd = new FormData()
      // fd.append('ip_addr', this.form.ip)
      // fd.append('type', 'black')
      // // 0:红，1:蓝，2:重点监控
      // if (this.title === '添加红队IP') {
      //   fd.append('black_type', 0)
      // } else {
      //   fd.append('black_type', 1)
      // }
      // addIPToWhiteBlackApi(fd).then(res => {
      //   let type = 'success'
      //   if (res.state == 0) {
      //     this.$emit('getIP', this.form)
      //     this.handleClose()
      //   } else {
      //     type = 'warning'
      //   }
      //   this.$message({
      //     message: res.info,
      //     type
      //   })
      // })
    }
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
</style>
