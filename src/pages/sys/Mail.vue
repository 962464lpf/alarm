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
          <el-radio-group v-model="mailAlarm" @change="startSendMail">
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
          <el-radio-group v-model="mailAlarmSummary" @change="startSendMail">
            <el-radio :label="1">开</el-radio>
            <el-radio :label="0">关</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row class="item">
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
          <el-button @click="changeSelecttime('add')" style="padding: 10px 15px">添加</el-button>
          <el-button @click="changeSelecttime('delete')" style="padding: 10px 15px">删除</el-button>
        </el-col>
      </el-row>

      <div class="mt10 confirm-btn">
        <el-button type="primary" @click="confirm('emailForm')">确定</el-button>
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
        content: ''
      },
      mailAlarm: 1,
      mailAlarmSummary: 1,
      selectTime: [],
      rules: {
        email_server: [
          { required: true, message: '请输入邮件服务器', trigger: 'blur' }
        ],
        port: [{ required: true, message: '端口', trigger: 'blur' }],
        from_addr: [
          { required: true, message: '请输入发件箱', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        to_addr: [{ required: true, message: '请输入收件箱', trigger: 'blur' }],
        cc: [{ required: true, message: '请输入抄送邮箱', trigger: 'blur' }],
        subject: [{ required: true, message: '请输入主题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      }
    }
  },
  methods: {
    changeSelecttime(type) {
      if (type === 'add') {
        this.selectTime.push({
          time: ''
        })
      } else {
        if (this.selectTime.length > 1) {
          this.selectTime.pop()
        }
      }
    },
    confirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.emailForm
          let fd = new FormData()
          for (let key in params) {
            if (key !== 'summary_set') fd.append(key, params[key])
          }
          let summaryTime = []
          this.selectTime.forEach(item => {
            let hour = parseInt(item.time.slice(0, 2))
            summaryTime.push(hour)
          })
          fd.append('summary_set', summaryTime.join(','))
          setMailApi(fd).then(res => {
            let type = 'success'
            if (res.state !== this.successFlag) {
              type = 'warning'
            }
            this.$message({
              type,
              message: res.info
            })
            // this.selectTime = []
            // this.getMailSetting()
          })
        } else {
          return false
        }
      })
    },
    getMailSetting() {
      let params = {
        id: 1
      }
      getMailApi(params).then(res => {
        this.emailForm = res
        // this.selectTime = res.summary_set
        //   selectTime: [
        //   {
        //     time: ''
        //   }
        // ],
        let selectTimeArr = res.summary_set.split(',')
        for (let i in selectTimeArr) {
          if (selectTimeArr[i] < 10) selectTimeArr[i] = '0' + selectTimeArr[i]
          let time = selectTimeArr[i] + ': 00'
          let obj = {
            time
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
      fd.append('alarm_switch', this.mailAlarm)
      fd.append('summary_switch', this.mailAlarmSummary)
      startSendMailApi(fd)
    }
  },
  mounted() {
    this.getMailSetting()
  }
}
</script>

<style  lang="scss">
.mail {
  padding: 0 10%;
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
  .confirm-btn {
    width: 70%;
    text-align: center;
  }
}
</style>
