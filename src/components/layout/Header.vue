<template>
  <div class="header">
    <el-row class="header-row">
      <el-col :span="3"
              class="title">捷普告警系统</el-col>
      <el-col :span="16"
              class="icon-box">
        <span>
          <el-badge :value="123"
                    class="item">
            <el-tooltip class="item"
                        effect="light"
                        content="攻击总数"
                        placement="bottom-end">
              <img src="../../assets/images/ALL1.png"
                   alt="">
            </el-tooltip>
          </el-badge>

        </span>
        <span>
          <el-badge :value="23"
                    class="item">
            <el-tooltip class="item"
                        effect="light"
                        content="高危次数"
                        placement="bottom-end">
              <img src="../../assets/images/hight.png"
                   alt="">
            </el-tooltip>
          </el-badge>

        </span>

        <span>
          <el-badge :value="50"
                    class="item">
            <el-tooltip class="item"
                        effect="light"
                        content="中危次数"
                        placement="bottom-end">
              <img src="../../assets/images/middle.png"
                   alt="">
            </el-tooltip>
          </el-badge>

        </span>

        <span>
          <el-badge :value="50"
                    class="item">
            <el-tooltip class="item"
                        effect="light"
                        content="低危次数"
                        placement="bottom-end">
              <img src="../../assets/images/low.png"
                   alt="">
            </el-tooltip>
          </el-badge>

        </span>

      </el-col>
      <el-col :span="5"
              class="icon-box">

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
@import "../../assets/style/color.scss";
.header {
  height: 50px;
  width: 100%;
  background: $hfbg-color;
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
      padding-left: 15px;
      box-sizing: border-box;
      .el-badge {
        margin-top: 15px;
      }
      span {
        margin-right: 30px;
        img {
          height: 25px;
          width: 25px;
        }
        .item {
          margin-right: 10px;
          .el-badge__content.is-fixed {
            top: 12px;
          }
          .el-badge__content {
            background: #ef2929;
            border: none;
          }
        }
      }
    }
  }
}
</style>
