<template>
    <div class="app-conteiner">
        <!--顶部 header区域 -->
        <mt-header fixed title="wenblog"></mt-header>
        <!--中间路由 router-view区域 -->
        <transition>
            <router-view></router-view>
        </transition>
        <!--底部 tabbar 区域 -->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" to="/cart">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">9</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/search">
                <span class="mui-icon mui-icon-search" ></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>


    </div>
</template>

<script>
    export default {
        name: "app",
        data(){
            return{

            }
        },
        methods:{

        },
    }
</script>

<style scoped lang="css">
    .app-conteiner{
        padding-top: 40px;
        padding-bottom: 50px;
        overflow-x: hidden;
    }
    .mui-bar{
        box-shadow: 0 0 2px rgba(0,0,0,.2);
    }
    .v-enter,
    .v-leave-to{
        opacity:0;
        transform:translateX(100%);
    }
    .v-leave-to{
        transform:translateX(-100%);
        position:absolute;
    }
    .v-enter-active,
    .v-leave-active{
        transition:all 0.5s ease
    }
</style>