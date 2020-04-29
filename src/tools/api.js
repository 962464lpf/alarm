import { POST, GET, downloadFile } from './request'

let BASE_URL = ''
if (process.env.NODE_ENV == "development") {
  BASE_URL = 'http://192.168.100.8:2020'
} else {
  BASE_URL = window.location.origin
}

function downloadFileApi(url) {
  return downloadFile(url)
}


function startRecveApi() {
  let url = BASE_URL + '/jump/warning/start_recv'
  POST(url)
}

function startListernApi() {
  let url = BASE_URL + '/jump/warning/start_listen'
  return POST(url)
}

function verifyAuthApi() {
  let url = BASE_URL + '/jump/warning/verify_auth'
  return POST(url)
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

function deleteIpApi(params) {
  let url = BASE_URL + '/jump/ip/delete'
  return POST(url, params)
}


function getAttackTrendApi(params) {
  let url = BASE_URL + '/jump/analyze/num'
  return POST(url, params)
}

function getMaliciousSourceIPTop5Api() {
  let url = BASE_URL + '/jump/analyze/top5_sip'
  return POST(url)
}

function getAttackedIPTop5Api() {
  let url = BASE_URL + '/jump/analyze/top5_dip'
  return POST(url)
}

function getDeviceIPTop5Api() {
  let url = BASE_URL + '/jump/analyze/top5_device'
  return POST(url)
}

function getPhysicalIPTop5Api() {
  let url = BASE_URL + '/jump/analyze/top5_wuli'
  return POST(url)
}

function getAttackedTypeTop5Api() {
  let url = BASE_URL + '/jump/analyze/top5_type'
  return POST(url)
}

function getRedIPTop5Api() {
  let url = BASE_URL + '/jump/analyze/top5_redip'
  return POST(url)
}

function startSendMailApi(params) {
  // 1告警开关 2 汇总开关
  let url = BASE_URL + '/jump/youjian/switch'
  return POST(url, params)
}

function getAlarmSourceApi(type = 'get', params) {
  let url = BASE_URL + '/jump/youjian/edit_alertlog'

  if (type === 'get') {
    return GET(url)
  } else {
    return POST(url, params)
  }
}

function loginApi(params) {
  let url = BASE_URL + '/jump/auth/login'
  return POST(url, params)
}

function registerApi(params) {
  let url = BASE_URL + '/jump/user/add'
  return POST(url, params)
}

function deleteUserApi(params) {
  let url = BASE_URL + '/jump/user/delete'
  return POST(url, params)
}

function logoutApi() {
  let url = BASE_URL + '/jump/auth/logout'
  return POST(url)
}

function resetPassword(params) {
  let url = BASE_URL + '/jump/user/edit'
  return POST(url, params)
}

function getUserInfo() {
  let url = BASE_URL + '/jump/user/get_userinfo'
  return POST(url)
}

function getUserListApi() {
  let url = BASE_URL + '/jump/user/index'
  return POST(url)
}

function userAllotEquipApi(params) {
  let url = BASE_URL + '/jump/user/dist_device'
  return POST(url, params)
}

function whiteIfPushAlarmApi(params) {
  let url = BASE_URL + '/jump/globalSet/white_show'
  return POST(url, params)
}

function aKeyBlockedApi(params) {
  let url = BASE_URL + '/jump/forbiddenIp/forbidden'
  return POST(url, params)
}

function getBlockedIApi(params) {
  let url = BASE_URL + '/jump/forbiddenIp/index'
  return POST(url, params)
}

function unBlockedIPApi(params) {
  let url = BASE_URL + '/jump/forbiddenIp/release_forbidden'
  return POST(url, params)
}

function factoryDataResetApi() {
  let url = BASE_URL + '/jump/globalSet/ini_db'
  return POST(url)
}

function getNetWorkManageApi() {
  let url = BASE_URL + '/jump/networkSet/set_network'
  return POST(url)
}

function postNetWorkManageApi(params) {
  let url = BASE_URL + '/jump/networkSet/set_network_do'
  return POST(url, params)
}

function resetNetWorkApi() {
  let url = BASE_URL + '/jump/networkSet/reset_network'
  return POST(url)
}


export {
  BASE_URL,
  downloadFileApi,
  startRecveApi,
  verifyAuthApi,
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
  deleteIpApi,
  startListernApi,
  getAttackTrendApi,
  getMaliciousSourceIPTop5Api,
  getAttackedIPTop5Api,
  getDeviceIPTop5Api,
  getPhysicalIPTop5Api,
  getAttackedTypeTop5Api,
  getRedIPTop5Api,
  startSendMailApi,
  getAlarmSourceApi,
  loginApi,
  registerApi,
  deleteUserApi,
  logoutApi,
  resetPassword,
  getUserInfo,
  getUserListApi,
  userAllotEquipApi,
  whiteIfPushAlarmApi,
  aKeyBlockedApi,
  getBlockedIApi,
  unBlockedIPApi,
  factoryDataResetApi,
  getNetWorkManageApi,
  postNetWorkManageApi,
  resetNetWorkApi
}
