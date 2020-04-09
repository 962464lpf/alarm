<template>
  <div class="nav" @mouseenter="mouseMove('enter')" @mouseleave="mouseMove('leave')">
    <div class="scaling">
      <i
        class="curp fr"
        :class="{ 'el-icon-s-fold': !isCollapse,  'el-icon-s-unfold': isCollapse}"
        @click="handleScaling"
      ></i>
    </div>
    <el-menu
      router
      style="width: 100%;"
      :default-active="defaultActive"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#333"
      active-text-color="#2285c6"
      :collapse-transition="false"
    >
      <template v-for="(route, index) in routes">
        <el-submenu :index="route.path" v-if="route.children && route.children.length" :key="index">
          <template slot="title">
            <i :class="route.meta.icon"></i>
            <span>{{route.meta.title}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :key="todo.path"
              :index="todo.path"
              v-for="todo in route.children"
            >{{todo.meta.title}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item :index="route.path" :key="route.path" v-else-if="!route.children">
          <i :class="route.meta.icon"></i>
          <span slot="title">{{route.meta.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import ROUTES from '../../router/routes'
export default {
  data() {
    return {
      isCollapse: false,
      defaultActive: '/',
      routes: ROUTES,
      scaling: false
    }
  },
  computed: {},
  methods: {
    mouseMove(type) {
      this.$emit('changeStyle', type)
    },
    handleScaling() {
      this.isCollapse = !this.isCollapse
      this.isCollapse ? 'open' : 'close'
      let scaling = this.isCollapse ? 'open' : 'close'
      this.$emit('changeStyle', scaling)
    }
  },
  mounted() {}
}
</script>

<style lang="scss">
@import '../../assets/style/color.scss';

.nav {
  height: 100%;
  background: $navbg-color;
  .scaling {
    height: 30px;
    i {
      line-height: 30px;
      color: $hfbg-color;
      margin-right: 15px;
      font-size: 20px;
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
  }
  .el-menu-item:hover {
    background: transparent !important;
    span {
      color: #2285c6;
      font-weight: 700;
    }
  }
  .el-submenu__title:hover {
    background: transparent !important;
    span {
      color: #2285c6;
    }
  }
  .el-menu-item.is-active {
    background: transparent !important;
    span {
      font-weight: 700;
    }
  }
  .el-submenu__title.is-active {
    background: transparent !important;
    span {
      font-weight: 700;
    }
  }
}
</style>
