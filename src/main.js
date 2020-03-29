import Vue from 'vue'
//import VeeValidate from 'vee-validate';
import vuetify from './plugins/vuetify'
import './plugins/vue-masonry'
import App from './App.vue'
import {router} from './router'
//console.log('breakpoint');
import {store} from './store/index.js'
import {apiUrl} from './helpers/api-config'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
//import VSocket from 'vue-socket.io';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';  
    
Vue.config.productionTip = false

//Vue.use(VeeValidate);
Vue.prototype.$hostname = apiUrl;

//Vue.use(
//  new VSocket({
//    debug: true,
//   connection: apiUrl,
//    vuex: {
//      store,
//      actionPrefix: 'SOCKET_',
//     mutationPrefix: 'SOCKET_' 
// },
 // }, )
//);
const socket = io(apiUrl);
 
Vue.use(VueSocketIOExt, socket, { store });  

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


