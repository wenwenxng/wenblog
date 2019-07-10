import Vue from 'vue'
//router模块
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat',function(dateStr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dateStr).format(pattern)
})
//mint-ui模块
import { Toast,Header,Swipe, SwipeItem,Button } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
//在runtime模式中,components只能接受单文件对象,不能接受简单对象

//vue-resource模块
import VueResource from 'vue-resource'

Vue.use(VueResource)
//设置请求的根路径,到时候改就是了
Vue.http.options.root = 'http://localhost:5000';

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

