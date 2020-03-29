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

Vue.config.productionTip = false

//Vue.use(VeeValidate);
Vue.prototype.$hostname = apiUrl;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


