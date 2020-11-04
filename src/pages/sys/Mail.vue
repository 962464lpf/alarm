<template>
  <div class="mail">
    <el-form :model="emailForm" inline :rules="rules" ref="emailForm" label-width="100px">
      <el-row class="item">
        <el-col :span="4" class="name">邮件服务器：</el-col>
        <el-col :span="20" class="input">
          <p class="prompt">
            <span>
              <i class="el-icon-info"></i>
              电子邮件的发送服务器
            </span>
          </p>
          <el-input v-model="emailForm.email_server"></el-input>
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="4" class="name">端口：</el-col>
        <el-col :span="20" class="input">
          <p class="prompt">
            <span>
              <i class="el-icon-info"></i>电子邮件的发送服务器端口
            </span>
          </p>
          <el-input v-model="emailForm.port"></el-input>
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="4" class="name">发件箱：</el-col>
        <el-col :span="20" class="input">
          <p class="prompt">
            <span>
              <i class="el-icon-info"></i>电子邮件的发件箱
            </span>
          </p>
          <el-input v-model="emailForm.from_addr"></el-input>
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="4" class="name">密码：</el-col>
        <el-col :span="20" class="input">
          <p class="prompt">
            <span>
              <i class="el-icon-info"></i>发件箱的密码
            </span>
          </p>
          <el-input v-model="emailForm.password"></el-input>
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="4" class="name">收件箱：</el-col>
        <el-col :span="20" class="input">
          <p class="prompt">
            <span>
              <i class="el-icon-info"></i>接收电子邮件的邮箱
            </span>
          </p>
          <el-input v-model="emailForm.to_addr"></el-input>
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="4" class="name">抄送：</el-col>
        <el-col :span="20" class="input">
          <p class="prompt">
            <span>
              <i class="el-icon-info"></i>接收电子邮件的邮箱
            </span>
          </p>
          <el-input v-model="emailForm.cc"></el-input>
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="4" class="name">主题：</el-col>
        <el-col :span="20" class="input">
          <p class="prompt">
            <span>
              <i class="el-icon-info"></i>电子邮件的主题
            </span>
          </p>
          <el-input v-model="emailForm.subject"></el-input>
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="4" class="name">内容：</el-col>
        <el-col :span="20" class="input">
          <p class="prompt">
            <span>
              <i class="el-icon-info"></i>电子邮件的内容
            </span>
          </p>
          <el-input type="textarea" v-model="emailForm.content"></el-input>
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="4" class="name">告警通知：</el-col>
        <el-col :span="20" class="input">
          <p class="prompt">
            <span>
              <i class="el-icon-info"></i>邮件告警通知开关
            </span>
          </p>
          <el-radio-group v-model="emailForm.alarm_switch">
            <el-radio :label="1">开</el-radio>
            <el-radio :label="0">关</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="4" class="name">汇总通知：</el-col>
        <el-col :span="20" class="input">
          <p class="prompt">
            <span>
              <i class="el-icon-info"></i>邮件汇总通知开关
            </span>
          </p>
          <el-radio-group v-model="emailForm.summary_switch">
            <el-radio :label="1">开</el-radio>
            <el-radio :label="0">关</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row class="item last-item">
        <el-col :span="4" class="name">选择时间：</el-col>
        <el-col :span="20" class="input">
          <p class="prompt">
            <span>
              <i class="el-icon-info"></i>选择邮件汇总发送时间
            </span>
          </p>
          <el-time-select
            v-for="(item, index) in selectTime"
            :key="index"
            v-model="item.time"
            placeholder
            class="mr10"
            :picker-options="{
              start: '06:00',
              step: '01:00',
              end: '22:00'
            }"
          ></el-time-select>
          <el-button
            class="my-elem-btn"
            @click="changeSelecttime('add')"
            style="padding: 10px 15px"
          >添加</el-button>
          <el-button
            class="my-elem-btn"
            @click="changeSelecttime('delete')"
            style="padding: 10px 15px"
          >删除</el-button>
        </el-col>
      </el-row>

      <div class="mt10 confirm-btn">
        <el-button type="primary" :loading="mailBtnLoading" @click="confirm('emailForm')">确 定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getMailApi, setMailApi, startSendMailApi } from '../../tools/api'
export default {
  data() {
    return {
      emailForm: {
        email_server: '',
        port: '',
        from_addr: '',
        password: '',
        to_addr: '',
        cc: '',
        subject: '',
        content: '',
        alarm_switch: 1,
        summary_switch: 1,
      },
      mailAlarm: 1,
      mailAlarmSummary: 1,
      selectTime: [],
      mailBtnLoading: false,
      rules: {
        email_server: [
          { required: true, message: '请输入邮件服务器', trigger: 'blur' },
        ],
        port: [{ required: true, message: '端口', trigger: 'blur' }],
        from_addr: [
          { required: true, message: '请输入发件箱', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        to_addr: [{ required: true, message: '请输入收件箱', trigger: 'blur' }],
        cc: [{ required: true, message: '请输入抄送邮箱', trigger: 'blur' }],
        subject: [{ required: true, message: '请输入主题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
      },
    }
  },
  methods: {
    changeSelecttime(type) {
      if (type === 'add') {
        this.selectTime.push({
          time: '',
        })
      } else {
        if (this.selectTime.length > 1) {
          this.selectTime.pop()
        }
      }
    },
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        this.mailBtnLoading = true
        if (valid) {
          let params = this.emailForm
          let fd = new FormData()
          for (let key in params) {
            if (key !== 'summary_set') fd.append(key, params[key])
          }
          let summaryTime = []
          this.selectTime.forEach((item) => {
            let hour = parseInt(item.time.slice(0, 2))
            summaryTime.push(hour)
          })
          fd.append('summary_set', summaryTime.join(','))
          setMailApi(fd).then((res) => {
            this.mailBtnLoading = false
            let type = 'success'
            if (res.state !== this.successFlag) {
              type = 'warning'
            }
            this.$message({
              type,
              message: res.info,
            })
          })
        } else {
          return false
        }
      })
    },
    getMailSetting() {
      let params = {
        id: 1,
      }
      getMailApi(params).then((res) => {
        this.emailForm = res
        let selectTimeArr = res.summary_set.split(',')
        for (let i in selectTimeArr) {
          if (selectTimeArr[i] < 10) selectTimeArr[i] = '0' + selectTimeArr[i]
          let time = selectTimeArr[i] + ': 00'
          let obj = {
            time,
          }
          this.selectTime.push(obj)
        }
      })
    },
    startSendMail() {
      let fd = new FormData()
      // let params = {
      //   alarm_switch: 1,
      //   summary_switch: 1
      // }
      // fd.append('alarm_switch', this.mailAlarm)
      // fd.append('summary_switch', this.mailAlarmSummary)
      startSendMailApi(fd)
    },
  },
  mounted() {
    this.getMailSetting()
  },
}
</script>

<style  lang="scss">
.mail {
  padding: 0 10%;
  .item {
    // height: 80px;
    border: 1px solid #95d214;
    box-sizing: border-box;
    border-bottom: none;
    .name {
      line-height: 80px;
      text-align: center;
      font-weight: 400;
      font-size: 14px;
      border-right: 1px solid #95d214;
      color: white;
    }
    .input {
      padding: 5px;
      box-sizing: border-box;
      .el-input__inner {
        height: 34px;
        line-height: 34px;
        margin-top: 3px;
        background: transparent;
      }
      .el-textarea__inner {
        background: transparent;
      }
      .prompt {
        span {
          line-height: 34px;
          font-size: 14px;
          display: inline-block;
          background: #1a2332;
          width: 100%;
          color: #a4b1cd;
          border-radius: 5px;
          padding-left: 5px;
          box-sizing: border-box;
          i {
            margin-right: 2px;
            color: #95d214;
          }
        }
      }
    }
  }
  .item:nth-last-child(even) {
    .name {
      background: #2f3644;
    }
  }
  .item:nth-last-child(odd) {
    .name {
      background: #141d2b;
    }
  }
  .last-item {
    border-bottom: 1px solid #95d214 !important;
  }
  .confirm-btn {
    width: 70%;
    text-align: center;
    button {
      padding: 15px 30px;
      background: #9fef00;
      border: none;
      color: #141d2b;
      font-size: 20px;
    }
  }
}
</style>
