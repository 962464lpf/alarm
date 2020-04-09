<template>
  <div class="header">
    <el-row class="header-row">
      <el-col :span="3" class="title">捷普告警系统</el-col>
      <el-col :span="16" class="icon-box">
        <span>
          今日攻击总数：
          <b>{{attackNum}}</b>
        </span>
        <span>
          今日高危次数：
          <b>{{attackNumHigh}}</b>
        </span>
        <span>
          今日中危次数：
          <b>{{attackNumMiddle}}</b>
        </span>
        <span>
          今日低危次数：
          <b>{{attackNumLow}}</b>
        </span>
      </el-col>
      <el-col :span="5" class="icon-box"></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getAttackNumApi } from '../../tools/api'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState([
      'attackNum',
      'attackNumHigh',
      'attackNumMiddle',
      'attackNumLow'
    ])
  },
  methods: {
    getAttackNum() {
      getAttackNumApi().then(res => {
        this.$store.commit('changeAttackNum', res)
      })
    }
  },
  mounted() {
    this.getAttackNum()
  }
}
</script>

<style lang="scss">
@import '../../assets/style/color.scss';
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
      span {
        margin-right: 30px;
        color: white;
      }
    }
  }
}
</style>
