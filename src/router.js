import VueRouter from 'vue-router'

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopCarContainer from './components/tabbar/ShopCarContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotosList from './components/photos/PhotosList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'
import Login from './components/user/Login.vue'
//3.创建路由对象
var router = new VueRouter({
    routes:[
        { path:'/', redirect:'/home' },
        { path:'/home', component:HomeContainer },
        { path:'/member', component:MemberContainer },
        { path:'/cart', component: ShopCarContainer},
        { path:'/search', component:SearchContainer },
        { path:'/home/newslist', component:NewsList },
        { path:'/home/newsinfo/:id', component:NewsInfo },
        { path:'/home/photoslist', component:PhotosList },
        { path:'/home/photoinfo/:id', component:PhotoInfo },
        { path:'/home/goodslist', component:GoodsList },
        { path:'/home/goodsinfo/:id', component:GoodsInfo ,name:'goodsinfo'},
        { path:'/home/goodsdesc/:id', component:GoodsDesc ,name:'goodsdesc'},
        { path:'/home/goodscomment/:id', component:GoodsComment ,name:'goodscomment'},
        { path:'/login', component:Login },

    ],
    linkActiveClass:'mui-active' //覆盖默认的路由高亮的类,默认的类叫做 link-router-active
})
export default router

