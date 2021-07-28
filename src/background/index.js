import {
    eastmoney,getrobotdata
} from '../assets/js/request/api/user'
chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
        console.log(msg)
        switch (msg.code) {
            case 'save_goods_info':
                eastmoney(msg.params).then(res => {
                    port.postMessage({
                        code: 'return_save_goods_info',
                        res: res
                    })
                })
                break
                case 'xuangu':
                    getrobotdata(msg.params).then(res => {
                        port.postMessage({
                            code: 'return_xuangu',
                            res: res
                        })
                    })
                    break
            default:
                break
        }
    })
})
