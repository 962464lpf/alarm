<template>
  <div class="network-manage">
    <el-form :model="networkForm"
             :rules="rules"
             ref="networkForm"
             label-width="100px">
      <el-row class="item">
        <el-col :span="4"
                class="name">
          <span></span>
          IP地址：
        </el-col>
        <el-col :span="20"
                class="input">
          <el-form-item prop="IPADDR">
            <el-input v-model="networkForm.IPADDR"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="4"
                class="name">
          <span></span>子网掩码：
        </el-col>
        <el-col :span="20"
                class="input">
          <el-form-item prop="NETMASK">
            <el-input v-model="networkForm.NETMASK"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="4"
                class="name">
          <span></span>默认网关：
        </el-col>
        <el-col :span="20"
                class="input">
          <el-form-item prop="GATEWAY">
            <el-input v-model="networkForm.GATEWAY"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row class="item">
        <el-col :span="4"
                class="name">DNS服务器：</el-col>
        <el-col :span="20"
                class="input">
          <el-form-item>
            <el-input v-model="networkForm.DNS1"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="mt10"
         style="text-align: center;">
      <el-button type="primary"
                 :loading="submitBtnLoading"
                 @click="submitForm('networkForm')">更改网卡</el-button>
      <el-button type="primary"
                 :loading="resetBtnLoading"
                 @click="resetNetWork">重置网卡</el-button>
      <el-button type="primary"
                 :loading="resetBtnLoading"
                 @click="factoryDataReset">恢复出厂设置</el-button>

    </div>
  </div>
</template>

<script>
import {
  getNetWorkManageApi,
  postNetWorkManageApi,
  resetNetWorkApi,
  factoryDataResetApi,
} from '../../tools/api'
export default {
  data () {
    return {
      networkForm: {
        IPADDR: '0.0.0.0',
        NETMASK: '0.0.0.0',
        GATEWAY: '0.0.0.0',
        DNS1: '0.0.0.0'
      },
      submitBtnLoading: false,
      resetBtnLoading: false,
      rules: {
        IPADDR: [{ required: true, message: '请输入IP地址', trigger: 'blur' }],
        NETMASK: [
          { required: true, message: '请输入子网掩码', trigger: 'blur' }
        ],
        GATEWAY: [
          { required: true, message: '请输入默认网关', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm('您确定要更改网络配置吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.submitBtnLoading = true
            this.postNetWorkManage()
          })
        } else {
          return false
        }
      })
    },
    getNetWorkManage () {
      getNetWorkManageApi().then(res => {
        this.networkForm = res
      })
    },
    postNetWorkManage () {
      let fd = new FormData()
      for (let key in this.networkForm) {
        fd.append(key, this.networkForm[key])
      }
      postNetWorkManageApi(fd).then(res => {
        setTimeout(() => {
          this.submitBtnLoading = false
        }, 1000)
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
    resetNetWork () {
      this.$confirm('您确定要重置网卡吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.resetBtnLoading = true
        resetNetWorkApi().then(res => {
          this.resetBtnLoading = false
          let type = 'success'
          if (res.state !== this.successFlag) {
            type = 'warning'
          }
          this.$message({
            type,
            message: res.info
          })
          this.getNetWorkManage()
        })
      })
    },
    factoryDataReset () {
      this.$confirm('您确定要将此系统恢复出厂设置吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        factoryDataResetApi().then(res => {
          let type = 'success'
          if (res.state === this.successFlag) {
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
  mounted () {
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
      span:before {
        content: "*";
        color: #f56c6c;
        margin-right: 4px;
      }
    }
    .input {
      // padding: 5px;
      padding-right: 0;
      box-sizing: border-box;
      .el-form-item {
        margin-bottom: 0 !important;
        .el-form-item__content {
          margin-bottom: 0 !important;
          margin-left: 10px !important;
          .el-input__inner {
            border: none;
            height: 50px;
            line-height: 50px;
          }
        }
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
