// 封装所有首页的数据请求
import { request } from './request'
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}