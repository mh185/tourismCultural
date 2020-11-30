import { request } from '../request.js'
//首页公告内容
export function getNotice() {
  return request({
      url: '/proclamation/v1/miniApp/getList?page=1&size=10&sort=sort',
      method: 'POST',
  })
}
//公告详情
export function getNoticeDetail(params) {
  return request({
      url: '/proclamation/v1/selectOne',
      method: 'POST',
      data:params
  })
}