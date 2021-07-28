import Axios from 'axios'
const Qs = require('qs')

const instance = Axios.create({
    timeout: 6000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        config.data = Qs.stringify(config.data) // 转为formdata数据格式
        return config
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    }
)

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error)
    }
)
export default instance