import { request } from '../request.js'
//会务手册
export function getNote(params) {
  return request({
      url: '/meetingManual/v1/miniApp/getMeetingManual',
      method: 'POST',
      data:params
  })
}
//详情
export function getNoteDetail() {
  return request({
      url: '/meetingManual/v1/selectOne?id=1',
      method: 'POST',
  })
}