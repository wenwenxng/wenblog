<template>
    <div class="app-conteiner">
        <!--顶部 header区域 -->
        <mt-header fixed title="wenblog"></mt-header>
        <!--中间路由 router-view区域 -->
        <div>40</div>
        <!--底部 tabbar 区域 -->
        <nav class="mui-bar mui-bar-tab">
            <a class="mui-tab-item mui-active" href="#tabbar">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </a>
            <a class="mui-tab-item" href="#tabbar-with-chat">
                <span class="mui-icon mui-icon-email"><span class="mui-badge">9</span></span>
                <span class="mui-tab-label">消息</span>
            </a>
            <a class="mui-tab-item" href="#tabbar-with-contact">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">通讯录</span>
            </a>
            <a class="mui-tab-item" href="#tabbar-with-map">
                <span class="mui-icon mui-icon-gear"></span>
                <span class="mui-tab-label">设置</span>
            </a>
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
    }
    .mui-bar{
        box-shadow: 0 0 2px rgba(0,0,0,.2);
    }
</style>