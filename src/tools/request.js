import axios from 'axios'

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
        resolve(res.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export { GET, POST }
