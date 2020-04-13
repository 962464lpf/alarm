<template>
  <div id="app">
    <Header class="app-header"></Header>
    <component v-bind:is="contentCmp" class="app-content"></component>
    <Footer class="app-footer"></Footer>
  </div>
</template>

<script>
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Content from './components/layout/Content'
import Login from './pages/user/Login'
export default {
  components: {
    Header,
    Footer,
    Content,
    Login
  },
  watch: {
    $route(val) {
      if (val.path === '/' || val.path === '/register') {
        this.contentCmp = 'Login'
      } else {
        this.contentCmp = Content
      }
      this.$store.commit('changeCurrentPath', val.path)
    }
  },
  data() {
    return {
      contentCmp: Content
    }
  },
  methods: {},
  mounted() {
    this.$store.dispatch('WebSocketTest')
  }
}
</script>

<style scoped lang="scss">
#app {
  position: relative;
  .app-header,
  .app-content,
  .app-footer {
    position: absolute;
    left: 0;
    right: 0;
  }
  .app-header {
    top: 0;
  }
  .app-content {
    top: 50px;
    bottom: 32px;
  }
  .app-footer {
    bottom: 0;
  }
}
</style>
