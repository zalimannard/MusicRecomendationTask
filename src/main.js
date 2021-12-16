import Vue from 'vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  el: "#app",
  render: h => h("router-view")
});
