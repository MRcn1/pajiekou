<!--抓取龙虎榜机构榜，净买入大于1亿的-->

<template>
    <div class="standalone">
        <button @click="longzhuashou">龙抓手</button>
    </div>
</template>
<script>
    var port = chrome.runtime.connect({
        name: 'LOGIN_DATA'
    })
    export default {
        data() {
            return {
                data: '',
                data2: [],
                data3: [],
            }
        },
        mounted() {
            port.onMessage.addListener(msg => {
                if (msg.code === 'return_save_goods_info') {
                    let data = msg.res.data.Data[0].Data
                    data = data.map(val => {
                        return val.split('|')
                    });
                    this.data = data
                    this.data2 = []
                }


                // S、遍历抓取到数据，取出需要的参数 
                this.data.filter(val => {
                    let obj = {}
                    val.filter((item, index) => {
                        switch (index) {
                            case 2:
                                obj.name = item
                                break;
                            case 9:
                                obj.code = item
                                break;
                            case 10:
                                obj.buyNum = item
                                break;
                            case 19:
                                obj.netBuy = (item / 10000).toFixed(2)
                                break;
                            default:
                                break;
                        }
                    })
                    this.data2.push(obj)
                });
                //E、

                //过滤出净买入大于一亿的
                this.data2.filter(val => {
                    if (val.netBuy > 10000) {
                        this.data3.push(val.name)
                    }
                })

                //去重
                this.data3 = Array.from(new Set(this.data3))

                // 弹出前3个，没有就显示空
                if (this.data3.length > 3) {
                    this.data3 = this.data3.splice(0, 3)
                    alert(this.data3.join())
                } else if (this.data3.length == 0) {
                    alert('空')
                } else {
                    alert(this.data3.join())
                }
            })
        },
        methods: {
            longzhuashou() {
                var date = new Date();
                let y = date.getFullYear(); //获取完整的年份(4位)
                let m = date.getMonth()+1>9?date.getMonth()+1:'0'+date.getMonth()+1; //获取完整的年份(4位)
                let d = date.getDate(); //获取完整的年份(4位)
                console.log(y,m,d);
                port.postMessage({
                    code: 'save_goods_info',
                    params: {
                        sortfield: 'PBuy',
                        sortdirec: '1',
                        pageSize: '10',
                        pageNum: '1',
                        tkn: 'eastmoney',
                        code: '',
                        mkt: '0',
                        dateNum: '',
                        cfg: 'lhbjgtj',
                        startDateTime: `${y}-${m}-${d}`,
                        endDateTime: `${y}-${m}-${d}`,
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .standalone {
        z-index: 10000000;
        position: fixed;
        right: 0;
        top: 0;
    }
</style>