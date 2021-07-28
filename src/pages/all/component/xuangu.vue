<!--大白话选股-->

<template>
    <div class="standalone">
        <input type="text" v-model="value" />
        <button @click="xuangu">条件选股</button>
    </div>
</template>
<script>
    var port = chrome.runtime.connect({
        name: 'LOGIN_DATA'
    })
    export default {
        data() {
            return {
                value:'',
            }
        },
        mounted() {
            port.onMessage.addListener(msg => {
                if (msg.code === 'return_xuangu') {
                    let data = msg.res.data.data.answer[0].txt[0].content.components[0].data.datas
                    console.log(data);
                }
            })
        },
        methods: {
            xuangu() {
                port.postMessage({
                    code: 'xuangu',
                    params: {
                        question: this.value,
                        perpage: 200,
                        page: 1,
                        secondary_intent: '',
                        log_info: JSON.stringify({
                            "input_type": "typewrite"
                        }),
                        source: 'Ths_iwencai_Xuangu',
                        version: '2.0',
                        query_area: '',
                        block_list: '',
                        add_info: JSON.stringify({
                            "urp": {
                                "scene": 1,
                                "company": 1,
                                "business": 1
                            },
                            "contentType": "json",
                            "searchInfo": true
                        })
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
        right: 100px;
        top: 0;
    }
    input{
        border: 1px solid rgb(196, 196, 196)
    };
</style>