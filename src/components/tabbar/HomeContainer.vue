<template>
    <div>

        <mt-swipe :auto="1000">
            <!--在组件中,使用v-for循环的话,一定要使用:key-->
            <!--其实使用v-for最后全加上:key,不然vue会很智障的原地复用,明明你选的是第五个,如果你在前面又加了一个,它还是记得你选中的是第五个,其实就是不对了-->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id"><img :src="item.pic[0].picAddr" alt="">
            </mt-swipe-item>

        </mt-swipe>

        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div></a></li>
            </ul>
        </div>

    </div>

</template>

<script>
    var api = 'http://localhost:5000'
    export default {
        name: "HomeContainer",
        data(){
            return {
                lunbotuList:[]//保存轮播图的数组
            }
        },
        created(){
            this.getLunBoTu()
        },
        methods:{
            getLunBoTu(){
                this.$http.get('http://localhost:5000/product/queryProduct?page=1&pageSize=8').then(function(data){

                    if (data.body.error){
                        return toast("获取轮播图失败")
                    }
                    console.log(data.body.data)
                    data.body.data.forEach(function(item){
                        if (item.pic.length){
                            item.pic[0].picAddr = api+item.pic[0].picAddr
                        }else{
                            item.pic = [{picAddr:api+'/m/images/none.jpg'}]
                        }
                    })
                    this.lunbotuList = data.body.data

                })
            }
        },

    }
</script>

<style lang="less" scoped>
    .mint-swipe{
        height: 200px;
        .mint-swipe-item{
            &:nth-child(1){
                background-color: skyblue;
            }
            &:nth-child(2){
                background-color: red;
            }
            &:nth-child(3){
                background-color: lightcyan;
            }
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .mui-grid-view.mui-grid-9{
        border:none;
        background-color: #fff;
        .mui-table-view-cell{
            border:none;
            img{
                width: 60px;
                height: 60px;
            }
            .mui-media-body{
                font-size: 13px;
            }
        }
    }
    .mui-content>.mui-table-view:first-child{
        margin: 0;
    }
</style>