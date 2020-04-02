<template>
  <div class="header">
    <el-row class="header-row">
      <el-col :span="4"
              class="title">捷普告警系统</el-col>
      <el-col :span="10"
              class="icon-box">
        <span>
          <el-badge :value="3"
                    class="item">
            <el-tooltip class="item"
                        effect="light"
                        content="告警"
                        placement="bottom-end">
              <img src="../../assets/images/alarm.png"
                   alt="">
            </el-tooltip>
          </el-badge>

        </span>

        <span>
          <el-badge :value="3"
                    class="item">
            <el-tooltip class="item"
                        effect="light"
                        content="告警"
                        placement="bottom-end">
              <img src="../../assets/images/alarm.png"
                   alt="">
            </el-tooltip>
          </el-badge>

        </span>

        <span>
          <el-badge :value="3"
                    class="item">
            <el-tooltip class="item"
                        effect="light"
                        content="告警"
                        placement="bottom-end">
              <img src="../../assets/images/alarm.png"
                   alt="">
            </el-tooltip>
          </el-badge>

        </span>

      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {},
  mounted () { }
}
</script>

<style lang="scss">
.header {
  height: 50px;
  width: 100%;
  background: #22242a;
  .header-row {
    height: 50px;
    line-height: 50px;
    .title {
      color: white;
      text-align: center;
    }
    .icon-box {
      display: flex;
      align-items: center;
      height: 100%;
      span {
        margin-right: 30px;
        img {
          height: 20px;
          width: 20px;
        }
        .item {
          margin-right: 10px;
          .el-badge__content.is-fixed {
            top: 12px;
          }
        }
      }
    }
  }
}
</style>
