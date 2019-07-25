
import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import'./config/bootstrap'
import store from './config/store'
import router from './config/router'
import'./config/axios'
import'./config/msg'
import './config/mq'

const app = express('express')

app.set('port',(process.env.port || 8000))
app.listen(app.get('port'),function( ){
  console.log("escutando 2" + app.get('port'))
})


Vue.config.productionTip = false

//temporario
require('axios').defaults.headers.common['authorization']= 'bearer '

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')