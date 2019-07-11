import VueRouter from 'vue-router'

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopContainer from './components/tabbar/ShopContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotosList from './components/photos/PhotosList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
//3.创建路由对象
var router = new VueRouter({
    routes:[
        { path:'/', redirect:'/home' },
        { path:'/home', component:HomeContainer },
        { path:'/member', component:MemberContainer },
        { path:'/cart', component:SearchContainer },
        { path:'/search', component:ShopContainer },
        { path:'/home/newslist', component:NewsList },
        { path:'/home/newsinfo/:id', component:NewsInfo },
        { path:'/home/photoslist', component:PhotosList },
        { path:'/home/photoinfo/:id', component:PhotoInfo },
        { path:'/home/goodslist', component:GoodsList },
        { path:'/home/goodsinfo/:id', component:GoodsInfo ,name:'goodsinfo'},

    ],
    linkActiveClass:'mui-active' //覆盖默认的路由高亮的类,默认的类叫做 link-router-active
})
export default router

