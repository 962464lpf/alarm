<template>
  <div>home</div>
</template>

<script>
import { GET } from '../tools/request'
export default {
  data() {
    return {}
  },
  methods: {},
  mounted() {
    let url = 'https://api.apiopen.top/getJoke'
    let params = {
      page: 1,
      count: 2,
      type: 'video'
    }
    GET(url, params)
  }
}
</script>

<style scoped lang="scss"></style>
