<template>
    <mt-swipe :auto="3000">
        <!--在组件中,使用v-for循环的话,一定要使用:key-->
        <!--其实使用v-for最后全加上:key,不然vue会很智障的原地复用,明明你选的是第五个,如果你在前面又加了一个,它还是记得你选中的是第五个,其实就是不对了-->
        <mt-swipe-item v-for="item in lunbotuList" :key="item.id"><img :src="item.pic[0].picAddr" alt="" :class="{full: isfull}">
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
    export default {
        name: "swiper",
        props:['lunbotuList','isfull']

    }
</script>

<style scoped lang="less">
    .mint-swipe{
        height: 200px;
        background-color: #fff;
    .mint-swipe-item{
        text-align: center;
    img{
        height: 100%;
    }
    .full{
        width: 100%;
    }
    }
    }
</style>