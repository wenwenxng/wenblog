<template>
    <div class="goodsinfo-container">
      <!--商品轮播图区域-->

            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <swiper :lunbotuList="lunbotuList" :isfull="false"></swiper>
                    </div>
                </div>
            </div>


            <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsDetail.proName}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="oldPrice">
                        市场价:<del>&yen;{{goodsDetail.oldPrice}}</del>&nbsp;&nbsp;销售价<span class="price">&yen;{{goodsDetail.price}}</span>
                    </p>
                    <p>购买数量:<number></number></p>
                     <p>
                         <mt-button type="primary" size="small">立即购买</mt-button>
                         <mt-button type="danger" size="small">加入购物车</mt-button>
                     </p>
                </div>
            </div>
        </div>

        <!--商品参数区域-->
            <div class="mui-card">
                <div class="mui-card-header">商品参数</div>
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <p>商品货号:{{goodsDetail.proDesc}}</p>
                        <p>库存情况:{{goodsDetail.num}}</p>
                        <p>上架时间:{{goodsDetail.updateTime | dateFormat}}</p>
                    </div>
                </div>
                <div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain>图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain>商品评价</mt-button>
                </div>
            </div>

        <!--分析:为什么 商品详情中 轮播图那么丑-->
        <!--1.主页的期望是100%宽高-->
        <!--2.商品详情应该是长度100%,宽度自适应-->
        <!--3.既然这两个轮播图,其他方面都是没有冲突的,只是宽度有分歧,name我们可以定义一个属性,让使用轮播图的 调用者, 手动指定 是否为100%的宽度-->

    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    import swiper from '../subcomponents/swiper.vue'
    import number from '../subcomponents/goodsinfo_numbox.vue'

    export default {
        name: "GoodsInfo",
        data(){
            return{
                id:this.$route.params.id,
                goodsDetail:{},
                lunbotuList:[]
            }
        },
        methods:{
            getGoodsDetail(){
                this.$axios.get('/product/queryProductDetail?id=' + this.id)
                    .then(res => {
                        if (!res.data.id){
                            return Toast('获取数据失败')
                        }
                        this.goodsDetail = res.data
                        console.log(this.goodsDetail);
                        res.data.pic.forEach(t =>{
                            this.lunbotuList.push({pic:[{picAddr:t.picAddr}],id:t.id})
                        })


                    })
            }
        },
        created(){
            this.getGoodsDetail()
        },
        components:{
            swiper,
            number
        }
    }
</script>

<style scoped lang="less">
    .goodsinfo-container{
        background-color: #eee;
        overflow: hidden;
    }
    .now_price{
        color:red;
        font-size: 14px;
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }
</style>