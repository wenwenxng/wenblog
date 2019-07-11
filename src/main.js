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
// import { Toast,Header,Swipe, SwipeItem,Button,Lazyload} from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload);
//在runtime模式中,components只能接受单文件对象,不能接受简单对象
import MintUI from 'mint-ui'

Vue.use(MintUI)

import 'mint-ui/lib/style.css'

//axios模块
import axios from 'axios';
axios.defaults.baseURL = 'http://192.168.31.98:5000';

Vue.prototype.$axios = axios;


import './lib/mui/dist/css/mui.min.css'
import './lib/mui/dist/css/icons-extra.css'
import './css/app.css'
import app from './app.vue'
import router from './router.js'

//安装图片预览插件
import VuePreview from 'vue-preview'

Vue.use(VuePreview)

var vm = new Vue({
    el:'#app',
    render:c => c(app),
    router,
})

