import { POST } from './request'
const BASE_URL = 'http://192.168.100.2:5000'

function getAlarmListApi(params) {
  let url = BASE_URL + '/jump/warning/index'
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

export {
  getAlarmListApi,
  getSafeEquipListApi,
  editSafeEquipApi,
  addSafeEquipApi,
  deleteSateEquipApi
}
