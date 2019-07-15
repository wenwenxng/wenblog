<template>
    <div class="goodsinfo-container">


        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter"
                duration="500"
        >
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
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
                    <p>购买数量:&nbsp;<number @getcount="getSelectedCount" :max="goodsDetail.num"></number></p>
                     <p>
                         <mt-button type="primary" size="small">立即购买</mt-button>
                         <mt-button type="danger" size="small" @click="addToCart">加入购物车</mt-button>
                         <!--分析:如何实现加入购物车的时候,拿到 选择的数量-->
                         <!--1.经过分析发现, 按钮属于goodsinfo页面,而数字 属于numberbox组件-->
                         <!--2.由于涉及到了父子组件的嵌套了,所以无法直接在goodsinfo页面中获取到选中的商品数量值-->

                         <!--3.子组件向父组件传值,events up-->
                         <!--4.本质:子发射一个事件,并把值传递给监视这个事件的函数-->

                     </p>
                </div>
            </div>
        </div>

        <!--商品参数区域-->
            <div class="mui-card">
                <div class="mui-card-header">商品参数</div>
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <p>商品货号:{{goodsDetail.huohao}}</p>
                        <p>库存情况:{{goodsDetail.num}}</p>
                        <p>上架时间:{{goodsDetail.updateTime | dateFormat}}</p>
                    </div>
                </div>
                <div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goDesc(goodsDetail.id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goComment(goodsDetail.id)">商品评价</mt-button>
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
                lunbotuList:[],
                ballFlag:false,//控制小球的隐藏和显示的标识符
                selectedCount:1//默认认为至少买一个
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
                        res.data.pic.forEach(t =>{
                            this.lunbotuList.push({pic:[{picAddr:t.picAddr}],id:t.id})
                        })


                    })
            },
            goDesc(id){
                this.$router.push({name:'goodsdesc',params:{id}})
            },
            goComment(id){
                this.$router.push({name:'goodscomment',params:{id}})
            },
            addToCart(){
                //添加到购物车

                //由于numbox不严谨,就这里再判断一下
                if (this.selectedCount > this.goodsDetail.num){
                    this.selectedCount = this.goodsDetail.num
                    return Toast('超出最大范围')
                }
                this.loginAxiosPost('/cart/addCart',
                    {
                    productId:this.goodsDetail.id,
                    num:this.selectedCount,
                    size:40
                     },
                    (res) => {

                        this.ballFlag = !this.ballFlag

                        this.$store.commit('updateCart',this)
                })


            },
            beforeEnter(el){
                el.style.transform = 'translate(0,0)'
            },
            enter(el,done){
                //小球动画优化思路:
                //1.先分析导致 动画 不准确的 本质原因: 我们把小球 最终 位移到的 位置,已经局限在了某一分辨率下,滚动条未滚动的情况下;
                //2.只要分辨率 和 测试的时候 不一样,或者滚动条有一定的滚动距离之后,问题就出来了;
                //3.因此,我们经过分析,得到结论:不能把 位置的横纵坐标 直接写死了,而是应该根据不同情况,动态计算这个坐标值
                //4.经过分析,得出解析思路: 先得到 徽标的横纵坐标,在得到小球的横纵坐标,然后让Y值求差,x值也求差,得到的结果就是横纵坐标要唯一的距离
                //5.如何获取 徽标和小球的 位置? domObj.getBoundingClientRect()
                //获取小球在 页面中的位置
                const ballPostition = this.$refs.ball.getBoundingClientRect();
                const badgePostion = document.getElementById('badge').getBoundingClientRect()

                const xDist = badgePostion.left - ballPostition.left
                const yDist = badgePostion.top - ballPostition.top
                el.offsetWidth
                el.style.transition = 'all 0.5s cubic-bezier(0.4, 0.3, 1, 0.68)'
                el.style.transform = `translate(${xDist}px,${yDist}px)`
                done()
            },
            afterEnter(el){
                this.ballFlag = !this.ballFlag
            },
            getSelectedCount(count){
                this.selectedCount = count;
            }
        },
        created(){
            this.getGoodsDetail()
        },
        mouted(){

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
    .ball{
        width: 15px;
        height: 15px;
        border-radius:50%;
        background-color: red;
        position: absolute;
        z-index:99;
        top:407px;
        left:143px;
    }
</style>