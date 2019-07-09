import VueRouter from 'vue-router'

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopContainer from './components/tabbar/ShopContainer.vue'
//3.创建路由对象
var router = new VueRouter({
    routes:[
        { path:'/', redirect:'/home' },
        { path:'/home', component:HomeContainer },
        { path:'/member', component:MemberContainer },
        { path:'/cart', component:SearchContainer },
        { path:'/search', component:ShopContainer },
    ],
    linkActiveClass:'mui-active' //覆盖默认的路由高亮的类,默认的类叫做 link-router-active
})
export default router