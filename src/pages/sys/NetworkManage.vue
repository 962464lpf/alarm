<template>
  <div class="network-manage">
    <el-form :model="networkForm" :rules="rules" ref="networkForm" label-width="100px">
      <el-row class="item">
        <el-col :span="4" class="name">IP地址：</el-col>
        <el-col :span="20" class="input">
          <el-input v-model="networkForm.IPADDR"></el-input>
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="4" class="name">子网掩码：</el-col>
        <el-col :span="20" class="input">
          <el-input v-model="networkForm.NETMASK"></el-input>
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="4" class="name">默认网关：</el-col>
        <el-col :span="20" class="input">
          <el-input v-model="networkForm.GATEWAY"></el-input>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row class="item">
        <el-col :span="4" class="name">DNS服务器：</el-col>
        <el-col :span="20" class="input">
          <el-input v-model="networkForm.DNS1"></el-input>
        </el-col>
      </el-row>
    </el-form>
    <div class="mt10" style="text-align: center;">
      <el-button type="primary" @click="submitForm('networkForm')">立即更改</el-button>
      <el-button type="primary" @click="restartNetWork">重启</el-button>
    </div>
  </div>
</template>

<script>
import {
  getNetWorkManageApi,
  postNetWorkManageApi,
  restartNetWork
} from '../../tools/api'
export default {
  data() {
    return {
      networkForm: {
        IPADDR: '192.168.3.3',
        NETMASK: '255.255.255.0',
        GATEWAY: '192.168.100.254',
        DNS1: '61.134.1.4'
      },
      rules: {}
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm('您确定要更改网络配置吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.postNetWorkManage()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields()
    // },
    getNetWorkManage() {
      getNetWorkManageApi('get')
    },
    postNetWorkManage() {
      let fd = new FormData()
      for (let key in this.networkForm) {
        fd.append(key, this.networkForm[key])
      }
      postNetWorkManageApi(fd).then(res => {
        let type = 'success'
        if (res.state !== this.successFlag) {
          type = 'warning'
        }
        this.$message({
          type,
          message: res.info
        })
      })
    },
    restartNetWork() {
      this.$confirm('网络配置已经修改成功，是否立即重启网卡服务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        restartNetWork().then(res => {
          let type = 'success'
          if (res.state !== this.successFlag) {
            type = 'warning'
          }
          this.$message({
            type,
            message: res.info
          })
        })
      })
    }
  },
  mounted() {
    this.getNetWorkManage()
  }
}
</script>

<style  lang="scss">
.network-manage {
  padding: 0 10%;
  .item {
    // height: 80px;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    border-bottom: none;
    .name {
      line-height: 50px;
      text-align: center;
      font-weight: 400;
      font-size: 14px;
      border-right: 1px solid #e6e6e6;
    }
    .input {
      padding: 5px;
      padding-right: 0;
      box-sizing: border-box;
      .el-input__inner {
        border: none;
        height: 34px;
        line-height: 34px;
        margin-top: 3px;
      }
      .prompt {
        span {
          line-height: 34px;
          font-size: 14px;
          display: inline-block;
          background: #d2eef7;
          width: 100%;
          color: #333;
          border-radius: 5px;
          padding-left: 5px;
          box-sizing: border-box;
          i {
            margin-right: 2px;
            color: #137298;
          }
        }
      }
    }
  }
  .item:nth-last-child(even) {
    .name {
      background: #eee;
    }
  }
  .item:nth-last-child(odd) {
    .name {
      background: none;
    }
  }
  .item:last-child {
    border-bottom: 1px solid #e6e6e6;
  }
  .item:nth-child(3) {
    border-bottom: 1px solid #e6e6e6;
  }
}
</style>
