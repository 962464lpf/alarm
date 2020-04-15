<template>
  <div class="mail">
    <el-form :model="emailForm" :rules="rules" ref="emailForm" label-width="100px">
      <p class="prompt">
        <span>电子邮件的发送服务器</span>
      </p>
      <el-form-item label="邮件服务器" prop="email_server">
        <el-input v-model="emailForm.email_server"></el-input>
      </el-form-item>
      <p class="prompt">
        <span>电子邮件的发送服务器端口</span>
      </p>
      <el-form-item label="端口" prop="port">
        <el-input v-model.number="emailForm.port"></el-input>
      </el-form-item>
      <p class="prompt">
        <span>电子邮件的发件箱</span>
      </p>
      <el-form-item label="发件箱" prop="from_addr">
        <el-input v-model="emailForm.from_addr"></el-input>
      </el-form-item>
      <p class="prompt">
        <span>发件箱的密码</span>
      </p>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="emailForm.password"></el-input>
      </el-form-item>
      <p class="prompt">
        <span>接收电子邮件的邮箱</span>
      </p>
      <el-form-item label="收件箱" prop="to_addr">
        <el-input v-model="emailForm.to_addr" placeholder="多个邮箱时，请用逗号(,)分隔"></el-input>
      </el-form-item>
      <p class="prompt">
        <span>接收电子邮件的邮箱</span>
      </p>
      <el-form-item label="抄送" prop="cc">
        <el-input v-model="emailForm.cc" placeholder="多个邮箱时，请用逗号(,)分隔"></el-input>
      </el-form-item>
      <p class="prompt">
        <span>电子邮件的主题</span>
      </p>
      <el-form-item label="主题" prop="subject">
        <el-input v-model="emailForm.subject"></el-input>
      </el-form-item>
      <p class="prompt">
        <span>电子邮件的内容</span>
      </p>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" v-model="emailForm.content"></el-input>
      </el-form-item>
      <p class="prompt">
        <span>邮件告警通知开关</span>
      </p>
      <el-form-item label="告警通知">
        <el-radio-group v-model="mailAlarm" @change="startSendMail">
          <el-radio :label="1">开</el-radio>
          <el-radio :label="0">关</el-radio>
        </el-radio-group>
      </el-form-item>
      <p class="prompt">
        <span>邮件汇总通知开关</span>
      </p>
      <el-form-item label="汇总通知">
        <el-radio-group v-model="mailAlarmSummary" @change="startSendMail">
          <el-radio :label="1">开</el-radio>
          <el-radio :label="0">关</el-radio>
        </el-radio-group>
      </el-form-item>
      <p class="prompt">
        <span>选择邮件汇总发送时间</span>
      </p>
      <el-form-item label="选择时间">
        <el-time-picker
          v-for="(item, index) in selectTime"
          :key="index"
          v-model="item.time"
          placeholder
          class="ml10"
        ></el-time-picker>
        <el-button @click="changeSelecttime('add')">添加</el-button>
        <el-button @click="changeSelecttime('delete')">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirm('emailForm')">确定</el-button>
      </el-form-item>
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
      selectTime: [
        {
          time: ''
        }
      ],
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
            let hour = item.time.getHours().toString()
            summaryTime.push(hour)
          })

          fd.append('summary_set', summaryTime.join(','))
          setMailApi(fd).then(res => {
            let type = 'success'
            if (res.state !== 1) {
              type = 'warning'
            }
            this.$message({
              type,
              message: res.info
            })
            this.getMailSetting()
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

<style scoped lang="scss">
.mail {
  .prompt {
    padding-left: 100px;
    box-sizing: border-box;
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
    }
  }
}
</style>
