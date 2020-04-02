import { POST } from './request'
const BASE_URL = 'http://192.168.100.2:5000'
function getAlarmListApi(params) {
  let url = BASE_URL + '/jump/warning/index'
  return POST(url, params)
}

export { getAlarmListApi }
