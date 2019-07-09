import Vue from 'vue'
//导入mint-UI样式
import MintUI from 'mint-ui'
import VueRouter from 'vue-router'


Vue.use(MintUI)
Vue.use(VueRouter)


import './lib/mui/dist/css/mui.min.css'
import './css/app.css'
import app from './app.vue'
import router from './router.js'


var vm = new Vue({
    el:'#app',
    render:c => c(app),
    router,
})

