<template>
    <div class="goods-list">
       <!--<router-link tag="div" class="good-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/' + item.id">-->
           <!--<img :src="item.pic[0].picAddr" alt="">-->
           <!--<h1 class="title">{{item.proName}}</h1>-->
           <!--<div class="info">-->
               <!--<p class="price">-->
                   <!--<span class="now">&yen;{{item.price}}</span>-->
                   <!--<span class="old">&yen;{{item.oldPrice}}</span>-->
               <!--</p>-->
               <!--<p class="sell">-->
                   <!--<span>热卖中</span>-->
                   <!--<span>剩{{item.num}}件</span>-->
               <!--</p>-->
           <!--</div>-->
       <!--</router-link>-->

        <!--在网页中,有两种跳转方式-->
        <!--方式1: 使用a标签的形式叫做标签跳转-->
        <!--方式2: 使用window.location.href=的形式,叫做编程式导航-->
        <div class="good-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.pic[0].picAddr" alt="">
            <h1 class="title">{{item.proName}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">&yen;{{item.price}}</span>
                    <span class="old">&yen;{{item.oldPrice}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.num}}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        name: "GoodsList",
        data(){
            return{
                goodslist:[],
                pageindex:1//分页的页数
            }
        },
        methods:{
            getGoodsList(){
                this.$axios.get('product/queryProduct?pageSize=4&page=' + this.pageindex)
                    .then((res) => {
                        if (!res.data.data.length){return Toast('没有更多商品了')}
                        this.goodslist = this.goodslist.concat(res.data.data)
                        console.log(this.goodslist)
                    })
            },
            getMore(){
                this.pageindex++
                this.getGoodsList()
            },
            goDetail(id){
                //使用JS的形式进行路由导航

                //注意:一定要区分 this.$route 和 this.$router这两个对象

                //其中:this.$route是路由参数对象,所有路由中的参数,params,query都属于它
                //其中:this.$router是一个路由导航对象,用它可以方便的使用js代码,实现路由的前进后退,跳转到新的URL地址
                //1.最简单
                // this.$router.push("/home/goodsinfo/" + id)
                //2.第二种传递对象
                // this.$router.push({path:"/home/goodsinfo/" + id})
                //3.第三种传递命名的路由 path跟params不能同时存在
                this.$router.push({name:"goodsinfo",params:{id}})
                //4带查阅参数
                // this.$router.push({path:"/home/goodsinfo/",query:{id:id}})

            }
        },
        created(){
            this.getGoodsList()
        }
    }
</script>

<style scoped lang="less">
.goods-list{
    display: flex;
    flex-wrap: wrap;//这个会自动分行
    justify-content: space-between;//这个会自动排成 内容|空|内容|空|内容
    padding: 8px;
    .good-item{
        margin:4px 0;
        width: 48%;
        border:1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        padding: 2px;
        display: flex;
        flex-direction: column;//让贴端对齐变成y轴,默认是row
        justify-content: space-between;//贴端对其,这样,info和img就会各自贴端
        min-height:293px;
        img{
            display: block;
            width: 100%;
        }
        .title{
            font-size: 14px;
        }
        .info{
            background-color: #eee;
            p{
                margin: 0;
                padding: 5px;
            }
            .price{
                .now{
                    color:red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
</style>