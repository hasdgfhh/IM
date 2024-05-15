import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
import TencentCloudChat from '@tencentcloud/chat';
import TIMUploadPlugin from 'tim-upload-plugin';


let options = {
  SDKAppID: 1600036085 
};

let chat = TencentCloudChat.create(options); 
chat.setLogLevel(0); 
chat.registerPlugin({'tim-upload-plugin': TIMUploadPlugin});
Vue.prototype.chat=chat;
Vue.prototype.TencentCloudChat=TencentCloudChat;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
