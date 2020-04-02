<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/"
                   v-if="isShow">
      <el-breadcrumb-item v-for="route in routes"
                          :key='route.meta.title'>{{route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>

  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      routes: [

      ]
    };
  },
  watch: {
    $route (val) {
      this.routes = val.matched
      this.routes.length > 0 ? this.isShow = true : this.isShow = false
    }
  },
  methods: {

  },
  mounted () {
    this.routes = this.$route.matched
    this.routes.length > 0 ? this.isShow = true : this.isShow = false
  }
};
</script>

<style scoped lang="scss">
.breadcrumb {
  height: 35px;
  border: 1px solid #eee;
  div {
    line-height: 35px;
  }
}
</style>
