<template>
  <div class="content">
    <el-row style="height: 100%;">
      <el-col :span="isCollapse ? 1 : 3" class="left" v-bind:class="{ enter: mouseEnter }">
        <Nav @changeStyle="changeStyle"></Nav>
      </el-col>
      <el-col :span="!isCollapse ? 21 : 23" class="right">
        <!-- <Breadcrumb></Breadcrumb> -->
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Nav from '../layout/Nav'
// import Breadcrumb from '../common/Breadcrumb'
export default {
  components: {
    Nav
    // Breadcrumb
  },

  data() {
    return {
      mouseEnter: false,
      isCollapse: false
    }
  },
  methods: {
    changeStyle(type) {
      if (type === 'enter') {
        this.mouseEnter = true
      } else if (type === 'leave') {
        this.mouseEnter = false
      } else if (type === 'open') {
        this.isCollapse = true
      } else if (type === 'close') {
        this.isCollapse = false
      }
    }
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
@import '../../assets/style/color.scss';
.content {
  overflow: hidden;
  .left {
    height: 100%;
    overflow: hidden;
    background: $navbg-color;
  }
  .enter {
    overflow: auto;
  }
  .right {
    height: 100%;
    overflow-y: auto;
    padding: 15px;
    box-sizing: border-box;
    background: white;
  }
}
</style>
