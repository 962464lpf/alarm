<template>
  <div class="nav">
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
      background-color="#111927"
      text-color="#a4b1cd"
      active-text-color="#b0ea49"
      :collapse-transition="false"
      unique-opened
    >
      <template v-for="(route, index) in routes">
        <el-submenu
          :index="route.path"
          v-if="route.children && route.children.length && route.meta && isPermission(route) "
          :key="index"
        >
          <template slot="title" v-if="isPermission(route)">
            <i :class="route.meta.icon"></i>
            <span>{{route.meta.title}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :key="todo.path"
              :index="todo.path"
              v-for="todo in route.children"
              v-show="isPermission"
            >{{todo.meta.title}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item
          :index="route.path"
          :key="route.path"
          v-else-if="!route.children && route.meta && isPermission(route)"
        >
          <i :class="route.meta.icon"></i>
          <span slot="title">{{route.meta.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import ROUTES from '../../router/routes'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isCollapse: false,
      defaultActive: '/',
      routes: ROUTES,
      scaling: false,
    }
  },
  computed: {
    ...mapState(['userInfo', 'currentPath']),
  },
  watch: {
    currentPath(val) {
      this.defaultActive = val
    },
  },
  methods: {
    isPermission(page) {
      // 超级管理员为0  普通用户为1
      let permission = this.userInfo.level
      let pagePermission = page.meta.level
      if (permission <= pagePermission) {
        return true
      } else {
        return false
      }
    },
    handleScaling() {
      this.isCollapse = !this.isCollapse
      this.isCollapse ? 'open' : 'close'
      let scaling = this.isCollapse ? 'open' : 'close'
      this.$emit('changeStyle', scaling)
    },
  },
  mounted() {
    this.defaultActive = this.currentPath
  },
}
</script>

<style lang="scss">
@import '../../assets/style/color.scss';

.nav {
  height: 100%;
  .scaling {
    height: 30px;
    i {
      line-height: 30px;
      color: #b0ea49;
      margin-right: 15px;
      font-size: 20px;
    }
  }
  .el-menu {
    border-right: none;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 100%;
    }
    .el-menu-item {
      i {
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-right: 3px;
      }
      .baimingdan {
        background: url('../../assets/images/baimingdan.png') no-repeat;
        background-size: contain;
      }
      .duikang {
        background: url('../../assets/images/duikang.png') no-repeat;
        background-size: contain;
      }
      .fengjin {
        background: url('../../assets/images/fengjin.png') no-repeat;
        background-size: contain;
      }
      .huizong {
        background: url('../../assets/images/huizong.png') no-repeat;
        background-size: contain;
      }
      .luru {
        background: url('../../assets/images/luru.png') no-repeat;
        background-size: contain;
      }
      .qushitongji {
        background: url('../../assets/images/qushitongji.png') no-repeat;
        background-size: contain;
      }
      .shishi {
        background: url('../../assets/images/shishi.png') no-repeat;
        background-size: contain;
      }
      .baogao {
        background: url('../../assets/images/baogao.png') no-repeat;
        background-size: contain;
      }
    }
    .el-submenu__title {
      i {
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-right: 3px;
      }
      // .baogao {
      //   background: url('../../assets/images/baogao.png') no-repeat;
      //   background-size: contain;
      // }
      .fengjin {
        background: url('../../assets/images/fengjin.png') no-repeat;
        background-size: contain;
      }
    }

    .el-menu-item:hover {
      background: #1a2332 !important;
      color: #b0ea49 !important;
      font-weight: 700 !important;
      span {
        color: #b0ea49 !important;
        font-weight: 700 !important;
      }
    }

    .is-active {
      background: #1a2332 !important;
      box-sizing: border-box;
      span {
        font-weight: 700;
      }
    }

    .el-submenu__title:hover {
      background: #2b3c53 !important;
      span {
        color: #b0ea49;
      }
    }
  }
}
</style>
