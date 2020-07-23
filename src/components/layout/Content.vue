<template>
  <div class="content">
    <el-row style="height: 100%;">
      <el-col :span="isCollapse ? 1 : 3" class="left">
        <Nav @changeStyle="changeStyle"></Nav>
      </el-col>
      <el-col :span="!isCollapse ? 21 : 23" class="right">
        <!-- <Breadcrumb></Breadcrumb> -->
        <router-view class="right-view"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Nav from '../layout/Nav'
// import Breadcrumb from '../common/Breadcrumb'

import { getUserInfo, startListernApi, startRecveApi } from '../../tools/api'
export default {
  components: {
    Nav
    // Breadcrumb
  },

  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    changeStyle(type) {
      if (type === 'open') {
        this.isCollapse = true
      } else if (type === 'close') {
        this.isCollapse = false
      }
    }
  },
  mounted() {
    window.addEventListener('beforeunload', () => {
      this.$store.dispatch('disconnectEventSource')
    })
    startListernApi()
    startRecveApi()
    getUserInfo().then(res => {
      this.$store.commit('changeUserInfo', res)
      this.$store.dispatch('connectEventSource', res)
    })
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/style/color.scss';
.content {
  overflow: hidden;
  .left {
    height: 100%;
    overflow: auto;
    background: $navbg-color;
  }
  .right {
    height: 100%;
    overflow-y: auto;
    padding: 10px 15px;
    border-radius: 5px;
    box-sizing: border-box;
    background: #e7ebf1;
    .right-view {
      background: white;
      padding: 10px;
      border-radius: 5px;
      box-sizing: border-box;
      // height: 100%;
    }
  }
}
</style>
