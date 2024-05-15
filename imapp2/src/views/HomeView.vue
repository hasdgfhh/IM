<template>
    <div class="home">
        <h2>im api使用</h2>
        <div>
            userId:<input type="text" v-model="userId"><button @click="loginhandler">点击登录</button>
        </div>
        <hr>
        <div>
            消息:<input type="text" v-model="message"><button @click="sendMsghandler">点击发送消息</button>
        </div>
        <div>
            <ul>
                <li v-for ="ele in messageList">{{ele.payload.text}}</li>
             </ul>
        </div>
        </div>
</template>

<script>

    import { genTestUserSig } from '../debug/GenerateTestUserSig';
    export default {
        name: 'HomeView',
        data() {
            return {
                userId: '',
                message: '',
                isReady: false,
                messageList:[],
            }
        },
        created() {
            let onSdkReady = function (event) {
                console.log('代表登录成功');
                // let message = this.chat.createTextMessage({
                //to: 'user1',
                //conversationType: 'C2C',
                //payload: { text: 'Hello world!' }
                //});
                //this.chat.sendMessage(message);
                this.isReady = true;
            };
            this.chat.on(this.TencentCloudChat.EVENT.SDK_READY, onSdkReady, this);
            let onMessageReceived = function (event) {
                this.messageList.push(event.data[0]);
            };
            this.chat.on(this.TencentCloudChat.EVENT.MESSAGE_RECEIVED, onMessageReceived,this);
        },
        methods: {
            sendMsghandler() {
                if (!this.isReady) {
                    alert('im 还在准备中');
                    return;
                }
                if (this.message.trim()== '') {
                    alert('请写入消息');
                    return;
                }
                let message = this.chat.createTextMessage({
                    to: '111',
                    conversationType: this.TencentCloudChat.TYPES.CONV_C2C,
                    payload: {
                        text: this.message,
                    },
                    needReadReceipt: true
                });
                let promise = this.chat.sendMessage(message);
                promise.then(function (imResponse) {
                    // 发送成功  
                    console.log(imResponse,'发送成功');
                }).catch(function (imError) {
                    // 发送失败
                    console.warn('sendMessage error:', imError);
                });


            },
            loginhandler() {
                if (this.userId.trim() == '') {
                    alert('请输入userId');
                    return;
                }
                console.log('loginhandler');
                let userSig = genTestUserSig(this.userId).userSig;
                let promise = this.chat.login({ userID: this.userId, userSig: userSig });
                promise.then(function (imResponse) {
                    console.log(imResponse.data, '登录成功'); // 登录成功
                    if (imResponse.data.repeatLogin === true) {
                        console.log(imResponse.data.errorInfo);
                    }
                }).catch(function (imError) {
                    console.warn('login error:', imError); // 登录失败的相关信息
                });

            }
        }
    }
</script>
