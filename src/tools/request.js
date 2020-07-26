import axios from 'axios'
import Router from '../router/index'
// eslint-disable-next-line no-unused-vars
let router
if (process.env.NODE_ENV != 'development') {
  router = Router
}

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        responseType: 'arraybuffer',
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function GET(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function POST(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        if (process.env.NODE_ENV != 'development') {
          if (res.data.state === -1) {
            router.push('/')
          } else {
            // if (Router.history.current.fullPath === '/') router.push('/index')
          }
        }
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export { GET, POST, downloadFile }
