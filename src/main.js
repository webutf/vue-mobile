import './styles/index.scss'
import 'babel-polyfill'
import Vue from 'vue'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

import router from './mods/router'
import components from './components/index.js'
Vue.use(components)

new Vue({
  el: '#app',
  router,
  data: {

  },
  render: h => h('router-view')
})
