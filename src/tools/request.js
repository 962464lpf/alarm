import axios from 'axios'
let Router
if (process.env.NODE_ENV != "development") {
  Router = require('../router/index')
}


function GET(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

function POST(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => {
        if (process.env.NODE_ENV != "development") {
          if (res.data.state === -1) Router.push('/')
        }
        resolve(res.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export { GET, POST }
