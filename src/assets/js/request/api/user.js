import instance from '../index'
/**
 * get方法
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getInnerPlugsVersion(url) {
    return instance.get(url + '/public/getInnerPlugsVersion')
}

/**
 * post方法
 * @returns {Promise<AxiosResponse<any>>}
 */
export function postDemo() {
    return instance.post('/public/getInnerPlugsVersion')
}

/**
 * 龙虎榜机构榜
 * 
 * @returns {Promise<AxiosResponse<any>>}
 */

export function eastmoney(data) {
    return instance.get(`https://datainterface3.eastmoney.com/EM_DataCenter_V3/api/LHBJGTJ/GetHBJGTJ`, {
        params: data
    })
}

/**
 * 条件选股
 * @returns {Promise<AxiosResponse<any>>}
 */

export function getrobotdata(data) {
    return instance.post(`http://www.iwencai.com/unifiedwap/unified-wap/v2/result/get-robot-data`, data)
}