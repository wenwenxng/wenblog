import Vue from 'vue'
//router模块
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//mint-ui模块
import { Toast,Header,Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Toast.name, Toast)

//vue-resource模块
import VueResource from 'vue-resource'

Vue.use(VueResource)


import './lib/mui/dist/css/mui.min.css'
import './lib/mui/dist/css/icons-extra.css'
import './css/app.css'
import app from './app.vue'
import router from './router.js'


var vm = new Vue({
    el:'#app',
    render:c => c(app),
    router,
})

