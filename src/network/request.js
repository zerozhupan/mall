import axios from 'axios'
export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
      baseURL: "http://152.136.185.210:7878/api/m5",
      timeout: 5000
    })
    // 2.axios的拦截器
    //axios设置请求拦截器
  instance.interceptors.request.use(config => {
      // config.headers.mytoken = 'nihao' //设置响应头
      return config
    }, err => {
      // console.log(err)
    })
    // 响应拦截
    //axios设置响应拦截器
  instance.interceptors.response.use(response => {
    return response.data //拦截处理响应结果，直接返回需要的数据
  }, err => {
    // console.log(err)
  })

  // 发送真正的网络请求
  return instance(config)
    // 返回的是一个promise，别人调用的时候可以直接使用.then()  .catch()
}