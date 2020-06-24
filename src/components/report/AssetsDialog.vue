<template>
  <div class="assets-dialog">
    <el-dialog :title="title"
               :visible.sync="dialogVisible"
               width="60%"
               :before-close="handleClose">
      <el-row class="item">
        <el-col :span="4"
                class="name">IP地址：</el-col>
        <el-col :span="20"
                class="input">
          <p class="prompt">
            <span>
              <i class="el-icon-info"></i>
              IP地址
            </span>
          </p>
          <el-input v-model="assetsForm.ip"></el-input>
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="4"
                class="name">域名：</el-col>
        <el-col :span="20"
                class="input">
          <p class="prompt">
            <span>
              <i class="el-icon-info"></i>
              域名
            </span>
          </p>
          <el-input v-model="assetsForm.domainName"></el-input>
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="4"
                class="name">平台名称：</el-col>
        <el-col :span="20"
                class="input">
          <p class="prompt">
            <span>
              <i class="el-icon-info"></i>
              平台名称
            </span>
          </p>
          <el-input v-model="assetsForm.name"></el-input>
        </el-col>
      </el-row>
      <span slot="footer"
            class="dialog-footer"
            v-if="footerStatus">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary"
                   @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { AddAssetsApi, editAssetsApi } from '../../tools/api'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    footerStatus: {
      type: Boolean,
      default: false
    },
    currentAssetsData: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      dialogVisible: this.value,
      assetsForm: {
        ip: '',
        name: '',
        domainName: ''
      }
    }
  },
  methods: {
    handleClose () {
      this.assetsForm = {
        ip: '',
        name: ''
      }
      this.$emit('input', false)
    },
    submit () {
      let api = null
      let fd = new FormData()
      fd.append('ip', this.assetsForm.ip)
      fd.append('name', this.assetsForm.name)
      fd.append('domain', this.assetsForm.domainName)

      if (this.type === 'add') {
        api = AddAssetsApi
      } else if (this.type === 'edit') {
        api = editAssetsApi
        fd.append('id', this.currentAssetsData.id)
      }
      api(fd).then(res => {
        this.$emit('updateAssetsData')
        let type = 'success'
        let message = '设置成功'
        if (res.state !== this.successFlag) {
          type = 'warning'
          message = res.info
        }
        this.$message({
          type,
          message
        })

        this.handleClose()
      })
    }
  },
  mounted () {
    this.assetsForm.ip = this.currentAssetsData.ip
    this.assetsForm.name = this.currentAssetsData.name
  }
}
</script>

<style scoped lang="scss">
.assets-dialog {
  .item {
    // height: 80px;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    border-right: none;
    border-bottom: none;
    .name {
      line-height: 80px;
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
}
</style>
