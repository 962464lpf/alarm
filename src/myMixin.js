const myMixin = {
  data() {
    return {
      successFlag: 1,
    }
  },
  methods: {
    // 全局混入。请求，删除操作等功能的提示函数
    // 参数1，请求返回的对象{res: 0/1, info: ''}
    // 参数2：成功时的提示消息
    // 参数3：成功时的回调函数
    mixinPrompt(res, callback) {
      let type = 'success'
      if (res.state !== this.successFlag) {
        type = 'warning'
      } else {
        callback()
      }
      this.$message({
        type,
        message: res.info,
      })
    },
  },
}

export default myMixin
