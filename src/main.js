import Vue from 'vue'
//router模块
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//vuex模块
import Vuex from 'vuex'
Vue.use(Vuex)

var store = new Vuex.Store({
    state:{//this.$store.state.****
        car:[]//将购物车中的商品的数据,用一个数组存储起来,在car数组中,存储一些商品的对象,我们可以把涉及购物车的商品对象都放在这,{id:商品的id,count:要购买的数量,price:商品的单价,selected:true}

    },
    mutations:{//this.$store.commit('',参数)
        addToCart(state,goodsinfo){
            //1.如果购物车中,之前已经有这个商品了
            //2.如果没有,则直接把商品数据,push到car中即可
            // var flag = state.car.some(t => {
            //     if (t.productId === goodsinfo.productId){
            //         t.num += parseInt(goodsinfo.num)
            //         return true
            //     }
            // })
            // if (!flag){
            //     state.car.push(goodsinfo)
            // }
            //数据库原因,暂不实现这功能
            state.car.push(goodsinfo)
        },
        initCart(state,cartList){

            state.car = cartList
        },
        updateCart(state,that){
            //添加后update
            that.loginAxiosGet('/cart/queryCart',function(res){
                state.car =  res.data
            })
        },
        numChangeUpdateCart(state,info){
            var updateGoods = state.car.find(item => item.id === info.id)
            updateGoods.num = info.num
        }
    },
    getters:{//this.$store.getters.****
        getAllCount(state){
            var sum = 0;
            state.car.forEach(t => {
                sum += t.num
            })
            return sum
        },
        getCar(state){
            return state.car
        }
    }
})

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
//上线的时候可以删除的两项
axios.defaults.baseURL = 'http://192.168.31.98:5000';
axios.defaults.withCredentials = true;

Vue.prototype.$axios = axios;

Vue.prototype.loginAxiosGet=function(url,config,callback){
    if (!callback){callback=config}
    axios.get(url,config).then(res => {
        if (res.data.error === 400){
            return this.$router.push({path:'/login',query:{returnUrl:this.$route.path}})
        }
        callback(res)
    })
}
Vue.prototype.loginAxiosPost = function(url,body,config,callback){
    if (!callback){callback=config}
    axios.post(url,body,config).then(res => {
        if (res.data.error === 400){
            return this.$router.push({path:'/login',query:{returnUrl:this.$route.path}})
        }
        callback(res)
    })

}
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
    store
})

