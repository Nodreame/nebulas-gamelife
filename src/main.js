import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import payapi from '@/service'
import resource from 'vue-resource'
const VueUploadComponent = require('vue-upload-component')

import Clipboard from 'clipboard'

Vue.config.productionTip = false
Vue.prototype.clipboard  = Clipboard
Vue.prototype.$payapi     = payapi
Vue.use(VueMaterial)
Vue.use(resource)
Vue.component('file-upload', VueUploadComponent)
// Vue.use(Clipboard)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
