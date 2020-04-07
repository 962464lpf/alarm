<template>
  <div class="nav"
       @mouseenter="mouseMove('enter')"
       @mouseleave="mouseMove('leave')">
    <el-menu router
             style="width: 100%; height: 100%;"
             :default-active="defaultActive"
             class="el-menu-vertical-demo"
             background-color="transparent"
             text-color="#333"
             active-text-color="#2285c6">

      <template v-for="(route, index) in routes">

        <el-submenu :index="route.path"
                    v-if="route.children && route.children.length"
                    :key='index'>
          <template slot="title">
            <i :class="route.meta.icon"></i>
            <span>{{route.meta.title}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :key="todo.path"
                          :index="todo.path"
                          v-for="todo in route.children">{{todo.meta.title}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item :index="route.path"
                      :key="route.path"
                      v-else-if="!route.children">
          <i :class="route.meta.icon"></i>
          <span>{{route.meta.title}}</span>
        </el-menu-item>

      </template>

    </el-menu>
  </div>
</template>

<script>
import ROUTES from '../../router/routes'
export default {
  data () {
    return {
      isCollapse: false,
      defaultActive: '/alarm/summary',
      routes: ROUTES
    }
  },
  methods: {
    mouseMove (type) {
      this.$emit('changeStyle', type)
    }

  },
  mounted () {
    console.log(this.$route)
    console.log(this.defaultActive)
    this.defaultActive = this.$route.fullPath
  }
}
</script>

<style lang="scss">
@import "../../assets/style/color.scss";

.nav {
  height: 100%;
  background: $navbg-color;
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
