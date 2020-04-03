<template>
  <div class="content">
    <el-row style="height: 100%;">
      <el-col :span="3"
              class="left"
              v-bind:class="{ enter: mouseEnter }">
        <Nav @changeStyle='changeStyle'></Nav>
      </el-col>
      <el-col :span="21"
              class="right">
        <Breadcrumb></Breadcrumb>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Nav from '../layout/Nav'
import Breadcrumb from '../common/Breadcrumb'
export default {
  components: {
    Nav, Breadcrumb
  },

  data () {
    return {
      mouseEnter: false
    }
  },
  methods: {
    changeStyle (type) {
      if (type === 'enter') {
        this.mouseEnter = true
      } else {
        this.mouseEnter = false

      }
    }
  },
  mounted () { }
}
</script>

<style scoped lang="scss">
.content {
  overflow: hidden;
  .left {
    height: 100%;
    overflow: hidden;
  }
  .enter {
    overflow: auto;
  }
  .right {
    height: 100%;
    overflow-y: auto;
    padding: 0 15px 10px 15px;
    box-sizing: border-box;
    background: #eaeaea;
  }
}
</style>
