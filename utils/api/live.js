import { request } from '../request.js'
//在线直播列表
export function getOnlineList(params) {
  return request({
    url: `/meetingLive/v1/getMeetingLiveList?page=${params.page}&size=10&type=LIVE`,
    method: 'POST',
    data: params
  })
}
//精彩回放列表
export function getPlaybackList(params) {
  return request({
    url: `/meetingLive/v1/getMeetingLiveList?page=${params.page}&size=10&type=PLAYBACK`,
    method: 'POST',
    data: params
  })
}
//直播详情
export function getDetail(params) {
  return request({
      url: '/meetingLive/v1/getMeetingLiveById',
      method: 'POST',
      data:params
  })
}
//点赞！
export function thumbsUp(params){
  return request({
    url:'/meetingLiveLikeUser/v1/likeOrNotMeetingLive',
    method:'POST',
    data:params
  })
}
// 分享次数
export function getShare(params) {
  return request({
    url: '/meetingLive/v1/shareMeetingLive',
    method: 'POST',
    data: params
  })
}
//图文直播详情
// export function getRadioList(){
//   return request({
//     url:'/imageTextLive/v1/getImageTextLiveByMeetingId?getContent=1&meetingLiveId=1&page=1&size=10&sort=sort',
//     method:'POST',
//   })
// }

// 图文直播列表
export function getWrittenLiveByMeetingId(params) {
  return request({
    url: `/imageTextLive/v1/getImageTextLiveByMeetingId?page=${params.page}&size=10`,
    method: 'POST',
    data: params
  })
}
//图文直播分享  imageTextLive/v1/shareImageTextlive?pictureId=1
export function shareImageTextlive(params) {
  return request({
    url: `/imageTextLive/v1/shareImageTextlive`,
    method: 'POST',
    data: params
  })
}
//图文直播点赞  imageTextLive/v1/likeImageTextLive?pictureId=1
export function likeImageTextLive(params) {
  return request({
    url: `/imageTextLive/v1/likeImageTextLive`,
    method: 'POST',
    data: params
  })
}
// 图文根据ID获取详情
export function getInfoById(params) {
  return request({
    url: `/imageTextLive/v1/getInfoById`,
    method: 'POST',
    data: params
  })
}

// 图片直播列表
export function getPictureLiveByMeetingId(params) {
  return request({
    url: `/imageLive/v1/getImageTextLiveByMeetingId?page=${params.page}&size=10`,
    method: 'POST',
    data: params
  })
}
// 图片根据ID获取详情
export function getPicById(params) {
  return request({
    url: `/imageLive/v1/getInfoById`,
    method: 'POST',
    data: params
  })
}
