// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './vuex/user'

Vue.config.productionTip = false

$.ajaxSettings.crossDomain = true;
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store
})
