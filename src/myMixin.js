import { Message } from 'element-ui';
const myMixin = {
  data() {
    return {
      successFlag: 1
    }
  },
  methods: {
    thePromptmessage(type, message) {
      Message({
        type,
        message
      })
    }
  }
}

export default myMixin