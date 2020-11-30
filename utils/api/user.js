import { request } from '../request.js'
//帮助中心
export function getHelp() {
  return request({
      url: '/helpCenter/v1/minApp/pageQuery?page=1&size=10&type=CULTURAL_TOURISM',
      method: 'POST',
  })
}
//帮助中心详情
export function getHelpDetail(params) {
  return request({
      url: '/helpCenter/v1/selectOne',
      method: 'POST',
      data:params
  })
}
// 联系我们
export function getPhone() {
  return request({
      url: '/contact/v1/findGroupContact?type=CULTURAL_TOURISM',
      method: 'POST',
  })
}
//关于我们
export function getAbout() {
  return request({
      url: '/about/v1/select?type=CULTURAL_TOURISM',
      method: 'POST',
  })
}