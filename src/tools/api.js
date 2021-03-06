import { POST, GET, downloadFile } from './request'

let BASE_URL = ''
if (process.env.NODE_ENV == 'development') {
  BASE_URL = 'http://192.168.10.242:2020'
} else {
  BASE_URL = window.location.origin
}

function closeBackend() {
  let url = BASE_URL + '/jump/warning/close_backend'
  POST(url)
}

function downloadFileApi(url) {
  return downloadFile(url)
}

function formDownloadFile(url) {
  const form = document.createElement('form')
  form.action = url
  form.method = 'get'
  form.target = 'blank'
  form.type = 'hidden'
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

function startRecveApi() {
  let url = BASE_URL + '/jump/warning/start_recv'
  POST(url)
}

function startListernApi() {
  let url = BASE_URL + '/jump/warning/start_listen'
  return POST(url)
}

function getSumAlarmListApi(params) {
  let url = BASE_URL + '/jump/warning/summary'
  return POST(url, params)
}

function getSumAlarmDetailListApi(params) {
  let url = BASE_URL + '/jump/warning/summary_detail'
  return POST(url, params)
}

function getCurrentAlarmListApi(params) {
  let url = BASE_URL + '/jump/warning/index'
  return POST(url, params)
}

function exportCurrentAlarmFlieApi(params) {
  let url = BASE_URL + '/jump/warning/export_shishi'
  return POST(url, params)
}

function setCurrentAlarmNotNewApi() {
  let url = BASE_URL + '/jump/warning/read_new'
  return POST(url)
}

function setSingleAlarmNotNewApi(params) {
  let url = BASE_URL + '/jump/warning/read_new_single'
  return POST(url, params)
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

function setWhiteIPApi(params) {
  let url = BASE_URL + '/jump/warning/add_white '
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

function getWhiteIpBytype(params) {
  let url = BASE_URL + '/jump/warning/white_lst'
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

function getAttackNumApi(params) {
  let url = BASE_URL + '/jump/warning/get_attack_num'
  return POST(url, params)
}

function getStsWhiteStusApi() {
  let url = BASE_URL + '/jump/globalSet/set'
  return POST(url)
}

function addIPToWhiteBlackApi(params) {
  let url = BASE_URL + '/jump/ip/add'
  return POST(url, params)
}

function deleteIpApi(params, type) {
  let url = BASE_URL + '/jump/ip/delete'
  if (type === 'white') url = BASE_URL + '/jump/warning/delete_white'
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

function verifyLoginApi() {
  let url = BASE_URL + '/jump/warning/verify_login'
  return POST(url)
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

function whiteIfStatisticalApi(params) {
  let url = BASE_URL + '/jump/globalSet/white_switch'
  return POST(url, params)
}

function lookServerSwitchApi(params) {
  let url = BASE_URL + '/jump/globalSet/look_server_switch'
  return POST(url, params)
}

function aKeyBlockedApi(params) {
  let url = BASE_URL + '/jump/forbiddenIp/forbidden'
  return POST(url, params)
}

function repairOrderApi(params) {
  let url = BASE_URL + '/jump/warning/zhuanru'
  return POST(url, params)
}

function batchBannedApi(params) {
  let url = BASE_URL + '/jump/forbiddenIp/forbidden_batch'
  return POST(url, params)
}

function batchBannedFileApi(params) {
  let url = BASE_URL + '/jump/forbiddenIp/daoru'
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

function getReportListApi(params) {
  let url = BASE_URL + '/jump/report/index'
  return POST(url, params)
}

function createReportDayApi(params) {
  let url = BASE_URL + '/jump/report/generate_day2'
  return POST(url, params)
}

function createReportWeekApi(params) {
  let url = BASE_URL + '/jump/report/generate_week'
  return POST(url, params)
}

function deleteReportApi(params) {
  let url = BASE_URL + '/jump/report/delete'
  return POST(url, params)
}

function getAssetsListApi(params) {
  let url = BASE_URL + '/jump/ipmap/index'
  return POST(url, params)
}

function AddAssetsApi(params) {
  let url = BASE_URL + '/jump/ipmap/add'
  return POST(url, params)
}

function editAssetsApi(params) {
  let url = BASE_URL + '/jump/ipmap/edit'
  return POST(url, params)
}

function deleteAssetsApi(params) {
  let url = BASE_URL + '/jump/ipmap/delete'
  return POST(url, params)
}

function downloadBlockedIPApi(params) {
  let url = BASE_URL + '/jump/forbiddenIp/export'
  return POST(url, params)
}

// 防火墙管理
function getFireWallDataApi() {
  let url = BASE_URL + '/jump/firewall/index'
  return POST(url)
}
function deleteFirewallApi(params) {
  let url = BASE_URL + '/jump/firewall/delete'
  return POST(url, params)
}

function addFirewallApi(params) {
  let url = BASE_URL + '/jump/firewall/add'
  return POST(url, params)
}

function editFirewallApi(params) {
  let url = BASE_URL + '/jump/firewall/edit'
  return POST(url, params)
}

function getInsideEquipApi(params) {
  let url = BASE_URL + '/jump/zichan/index'
  return POST(url, params)
}

function deleteInsideEquipApi(params) {
  let url = BASE_URL + '/jump/zichan/delete'
  return POST(url, params)
}

function addSingleInsideEquipApi(params) {
  let url = BASE_URL + '/jump/zichan/add'
  return POST(url, params)
}

function addMoreInsideEquipApi(params) {
  let url = BASE_URL + '/jump/zichan/daoru'
  return POST(url, params)
}

function editInsideEquipApi(params) {
  let url = BASE_URL + '/jump/zichan/edit'
  return POST(url, params)
}

function getOrderListApi(params) {
  let url = BASE_URL + '/jump/gongdan/index'
  return GET(url, params)
}

function getOrderDetailApi(params) {
  let url = BASE_URL + '/jump/gongdan/detail'
  return POST(url, params)
}

function analyze(params) {
  let url = BASE_URL + '/jump/gongdan/analyze'
  return POST(url, params)
}

function orderIssueDisposalApi(params) {
  let url = BASE_URL + '/jump/gongdan/xiafa'
  return POST(url, params)
}

function orderBlockApi(params) {
  let url = BASE_URL + '/jump/gongdan/fengjin'
  return POST(url, params)
}

function downloadOrderApi(params) {
  let url = BASE_URL + '/jump/gongdan/export'
  return POST(url, params)
}

function getScheduleApi(params) {
  let url = BASE_URL + '/jump/zhiban_ry/index'
  return POST(url, params)
}

function addScheduleApi(params) {
  let url = BASE_URL + '/jump/zhiban_ry/add'
  return POST(url, params)
}

function editScheduleApi(params) {
  let url = BASE_URL + '/jump/zhiban_ry/edit'
  return POST(url, params)
}

function deleteScheduleApi(params) {
  let url = BASE_URL + '/jump/zhiban_ry/delete'
  return POST(url, params)
}

function getPhyInterface() {
  let url = BASE_URL + '/jump/net/ether'
  return POST(url)
}

function getStaticRouteData() {
  let url = BASE_URL + '/jump/net/static_route'
  return POST(url)
}

function getARPData() {
  let url = BASE_URL + '/jump/net/arp_table'
  return POST(url)
}

function deleteArpData(params) {
  let url
  if (params) {
    url = BASE_URL + '/jump/net/arp_del'
    return POST(url, params)
  } else {
    url = BASE_URL + '/jump/net/arp_del_all'
    return POST(url)
  }
}

function pingStart(params) {
  let url = BASE_URL + '/jump/diagnose/ping_start'
  return POST(url, params)
}

function pingEnd() {
  let url = BASE_URL + '/jump/diagnose/ping_stop'
  return POST(url)
}

function pingContinue() {
  let url = BASE_URL + '/jump/diagnose/read_ping_data'
  return POST(url)
}
function pingContinueStop() {
  let url = BASE_URL + '/jump/diagnose/read_ping_data_stop'
  return POST(url)
}

function tracerouteStart(params) {
  let url = BASE_URL + '/jump/diagnose/traceroute_start'
  return POST(url, params)
}
function tracerouteEnd() {
  let url = BASE_URL + '/jump/diagnose/traceroute_stop'
  return POST(url)
}

function tracerouteContinue() {
  let url = BASE_URL + '/jump/diagnose/read_traceroute_data'
  return POST(url)
}

function tracerouteContinueStop() {
  let url = BASE_URL + '/jump/diagnose/read_traceroute_data_stop'
  return POST(url)
}

function getCurl(params) {
  let url = BASE_URL + '/jump/diagnose/curl'
  return POST(url, params)
}

function getDns(params) {
  let url = BASE_URL + '/jump/diagnose/dns'
  return POST(url, params)
}

function getRoleDataApi(params) {
  let url = BASE_URL + '/jump/qx_role/index'
  return POST(url, params)
}

function addRoleApi(params) {
  let url = BASE_URL + '/jump/qx_role/add'
  return POST(url, params)
}

function deleteRoleApi(params) {
  let url = BASE_URL + '/jump/qx_role/delete'
  return POST(url, params)
}

function editRoleApi(params) {
  let url = BASE_URL + '/jump/qx_role/edit'
  return POST(url, params)
}

function getPermissionList() {
  let url = BASE_URL + '/jump/qx_role/node_lst'
  return POST(url)
}

function addPermissionApi(params) {
  let url = BASE_URL + '/jump/qx_role/role_update_node'
  return POST(url, params)
}

function assignRoleApi(params) {
  let url = BASE_URL + '/jump/user/update_role'
  return POST(url, params)
}

export {
  BASE_URL,
  closeBackend,
  downloadFileApi,
  formDownloadFile,
  startRecveApi,
  getSumAlarmListApi,
  getSumAlarmDetailListApi,
  getCurrentAlarmListApi,
  exportCurrentAlarmFlieApi,
  setCurrentAlarmNotNewApi,
  setSingleAlarmNotNewApi,
  getSafeEquipListApi,
  editSafeEquipApi,
  addSafeEquipApi,
  deleteSateEquipApi,
  setWhiteIPApi,
  setIpApi,
  getIPListApi,
  getWhiteIpBytype,
  exportSumAlarmFileApi,
  setMailApi,
  getMailApi,
  getAttackNumApi,
  getStsWhiteStusApi,
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
  verifyLoginApi,
  registerApi,
  deleteUserApi,
  logoutApi,
  resetPassword,
  getUserInfo,
  getUserListApi,
  userAllotEquipApi,
  whiteIfPushAlarmApi,
  whiteIfStatisticalApi,
  lookServerSwitchApi,
  aKeyBlockedApi,
  repairOrderApi,
  batchBannedApi,
  batchBannedFileApi,
  getBlockedIApi,
  unBlockedIPApi,
  factoryDataResetApi,
  getNetWorkManageApi,
  postNetWorkManageApi,
  resetNetWorkApi,
  getReportListApi,
  createReportDayApi,
  createReportWeekApi,
  deleteReportApi,
  getAssetsListApi,
  AddAssetsApi,
  editAssetsApi,
  deleteAssetsApi,
  downloadBlockedIPApi,
  getFireWallDataApi,
  deleteFirewallApi,
  addFirewallApi,
  editFirewallApi,
  getInsideEquipApi,
  deleteInsideEquipApi,
  addSingleInsideEquipApi,
  addMoreInsideEquipApi,
  editInsideEquipApi,
  getOrderListApi,
  getOrderDetailApi,
  analyze,
  orderIssueDisposalApi,
  orderBlockApi,
  downloadOrderApi,
  getScheduleApi,
  addScheduleApi,
  editScheduleApi,
  deleteScheduleApi,
  getPhyInterface,
  getStaticRouteData,
  getARPData,
  deleteArpData,
  pingStart,
  pingEnd,
  pingContinue,
  pingContinueStop,
  tracerouteStart,
  tracerouteEnd,
  tracerouteContinue,
  tracerouteContinueStop,
  getCurl,
  getDns,
  getRoleDataApi,
  addRoleApi,
  deleteRoleApi,
  editRoleApi,
  getPermissionList,
  addPermissionApi,
  assignRoleApi,
}
