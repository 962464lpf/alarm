<template>
  <div class="alarm-source">
    <el-form :model="alarmSource" inline :rules="rules" ref="alertSourceForm" label-width="100px">
      <el-form-item label="恶意IP" prop="sip">
        <el-input v-model="alarmSource.sip"></el-input>
      </el-form-item>
      <el-form-item label="恶意端口" prop="sport">
        <el-input v-model="alarmSource.sport"></el-input>
      </el-form-item>
      <el-form-item label="目的IP" prop="dip">
        <el-input v-model="alarmSource.dip"></el-input>
      </el-form-item>
      <el-form-item label="目的端口" prop="dport">
        <el-input v-model="alarmSource.dport"></el-input>
      </el-form-item>
      <el-form-item label="协议" prop="protocol">
        <el-input v-model="alarmSource.protocol"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="con">
        <el-input v-model="alarmSource.con"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirm('alertSourceForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getAlarmSourceApi } from '../../tools/api'
export default {
  data() {
    return {
      alarmSource: {},
      rules: {
        sip: [{ required: true, message: '', trigger: 'blur' }],
        sport: [{ required: true, message: '', trigger: 'blur' }],
        dip: [{ required: true, message: '', trigger: 'blur' }],
        dport: [{ required: true, message: '', trigger: 'blur' }],
        protocol: [{ required: true, message: '', trigger: 'blur' }],
        con: [{ required: true, message: '', trigger: 'blur' }]
      }
    }
  },
  methods: {
    getAlarmSource() {
      getAlarmSourceApi().then(res => {
        this.alarmSource = res
      })
    },
    confirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.alarmSource
          let fd = new FormData()
          for (let key in params) {
            fd.append(key, params[key])
          }
          getAlarmSourceApi('post', fd).then(res => {
            let type = 'success'
            if (res.state !== this.successFlag) {
              type = 'warning'
            }
            this.$message({
              type,
              message: res.info
            })
            this.getAlarmSource()
          })
        } else {
          return false
        }
      })
    }
  },
  mounted() {
    this.getAlarmSource()
  }
}
</script>

<style scoped lang="scss">
</style>
