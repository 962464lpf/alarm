<template>
  <div id="app">
    <Header class="app-header"></Header>
    <Content class="app-content"></Content>
    <Footer class="app-footer"></Footer>
  </div>
</template>

<script>
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Content from './components/layout/Content'

export default {
  components: {
    Header,
    Footer,
    Content
  },
  data() {
    return {}
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
