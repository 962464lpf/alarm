import { POST, GET } from './request'
const BASE_URL = 'http://192.168.100.2:5000'
// const BASE_URL = window.location.origin



function startRecveApi() {
  let url = BASE_URL + '/jump/warning/start_recv'
  POST(url)
}

function getSumAlarmListApi(params) {
  let url = BASE_URL + '/jump/warning/summary'
  return POST(url, params)
}
function getCurrentAlarmListApi(params) {
  let url = BASE_URL + '/jump/warning/index'
  return POST(url, params)
}

function setCurrentAlarmNotNewApi() {
  let url = BASE_URL + '/jump/warning/read_new'
  return POST(url)
}

function getSafeEquipListApi(params) {
  let url = BASE_URL + '/jump/device/index'
  return POST(url, params)
}

function editSafeEquipApi(params) {
  let url = BASE_URL + '/jump/device/edit'
  return POST(url, params)
}

function addSafeEquipApi(params) {
  let url = BASE_URL + '/jump/device/add'
  return POST(url, params)
}

function deleteSateEquipApi(params) {
  let url = BASE_URL + '/jump/device/delete'
  return POST(url, params)
}

function setIpApi(type, params) {
  let url = ''
  if (type === 'white') {
    url = BASE_URL + '/jump/warning/set_whiteip'
  } else {
    url = BASE_URL + '/jump/warning/set_blackip'
  }
  return POST(url, params)
}

function getIPListApi(params) {
  let url = BASE_URL + '/jump/warning/ip_lst'
  return POST(url, params)
}

function exportSumAlarmFileApi(paramas) {
  let url = BASE_URL + '/jump/warning/export'
  return POST(url, paramas)
}

function setMailApi(params) {
  let url = BASE_URL + '/jump/youjian/edit'
  return POST(url, params)
}

function getMailApi(params) {
  let url = BASE_URL + '/jump/youjian/edit'
  return GET(url, params)
}

function getAttackNumApi() {
  let url = BASE_URL + '/jump/warning/get_attack_num'
  return POST(url)
}

function addIPToWhiteBlackApi(params) {
  let url = BASE_URL + '/jump/ip/add'
  return POST(url, params)
}

function startListernApi() {
  let url = BASE_URL + '/jump/warning/start_listen'
  return POST(url)
}

export {
  startRecveApi,
  getSumAlarmListApi,
  getCurrentAlarmListApi,
  setCurrentAlarmNotNewApi,
  getSafeEquipListApi,
  editSafeEquipApi,
  addSafeEquipApi,
  deleteSateEquipApi,
  setIpApi,
  getIPListApi,
  exportSumAlarmFileApi,
  setMailApi,
  getMailApi,
  getAttackNumApi,
  addIPToWhiteBlackApi,
  startListernApi
}
