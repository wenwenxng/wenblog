<template>
    <div class="app-conteiner">
        <!--顶部 header区域 -->
        <mt-header fixed title="wenblog">
            <span slot="left" @click="goBack" v-show="flag">
                <mt-button icon="back">返回</mt-button>
            </span>
        </mt-header>
        <!--中间路由 router-view区域 -->
        <transition>
            <router-view class="main-conteiner"></router-view>
        </transition>
        <!--底部 tabbar 区域 -->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item-wen" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-wen" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item-wen" to="/cart">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge" v-show="$store.state.car.length">{{ $store.getters.getAllCount}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item-wen" to="/search">
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
                flag:false
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1)
            }
        },
        watch:{
          '$route.path':function(newVal){
              this.flag = newVal === '/home'? false : true;
          }
        },
        created(){
            this.$axios.get('/cart/queryCart').then(res=>{
                if (res.data.error === 400){
                    return
                }
                this.$store.commit('initCart',res.data)
            })
            this.flag = this.$route.path === '/home'? false : true;
        }
    }
</script>

<style scoped lang="less">
    .mint-header{
        z-index:99;
    }
    .app-conteiner{
        padding-top: 40px;
        padding-bottom: 50px;
    }
    .main-conteiner{
        overflow-x:hidden;
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

    /*改类名,解决tabbar无法点击切换的问题*/
    .mui-bar-tab .mui-tab-item-wen
    {
        display: table-cell;
        overflow: hidden;
        z-index:10;
        width: 1%;
        height: 50px;

        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;

        color: #929292;
    }
    .mui-bar-tab .mui-tab-item-wen.mui-active
    {
        color: #007aff;
    }
    .mui-bar-tab .mui-tab-item-wen .mui-icon
    {
        top: 3px;

        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .mui-bar-tab .mui-tab-item-wen .mui-icon ~ .mui-tab-label
    {
        font-size: 11px;

        display: block;
        overflow: hidden;

        text-overflow: ellipsis;
    }
    .mui-bar-tab .mui-tab-item-wen .mui-icon:active
    {
        background: none;
    }
</style>