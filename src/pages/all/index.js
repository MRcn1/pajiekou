import Vue from 'vue'
import longzhuashou from './component/longzhuashou.vue'
import xuangu from './component/xuangu.vue'
import Wc from './wc'

Vue.config.productionTip = false

// 获取vue实例
function initApp(e) {
    const app = new Vue({
        render: h => h(e)
    }).$mount()
    return app
}

const vue1 = initApp(longzhuashou)
const vue2 = initApp(xuangu)

// 挂载节点
new Wc({
    app: vue1,
    name: 'chrome-extension-longzhuashou'
}).mount('body')

// 挂载节点
new Wc({
    app: vue2,
    name: 'chrome-extension-xuangu'
}).mount('body')
