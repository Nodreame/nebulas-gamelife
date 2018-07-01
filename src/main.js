import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import resource from 'vue-resource'
import VueLoading from 'vue-loading-template'

import 'nasa.js/dist/nasa.js'
import HttpRequest  from 'nebulas/lib/httprequest'
import Neb from 'nebulas/lib/neb'
// // import Account from 'nebulas/lib/account'
// // import Transaction from 'nebulas/lib/transaction'
// // console.info('Neb：', Neb);
// // console.info('Account:', Account)
// // console.info('Transaction:', Transaction)
// // console.info('Utils', Utils)
// // console.info('Util', Util)
// // console.info('Api', Api)


// import payapi from '@/service'

const neb = new Neb();
neb.setRequest(new HttpRequest("https://mainnet.nebulas.io"))

// import VueUploadComponent from 'vue-upload-component'
const VueUploadComponent = require('vue-upload-component')
import Clipboard from 'clipboard'
import axios from 'axios'


Vue.config.productionTip = false
Vue.prototype.clipboard  = Clipboard
Vue.prototype.neb        = neb
Vue.prototype.$http      = axios

// Vue.prototype.$payapi    = payapi
Vue.use(VueMaterial)
Vue.use(resource)
Vue.use(VueLoading)
Vue.component('file-upload', VueUploadComponent)
// Vue.use(Clipboard)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
