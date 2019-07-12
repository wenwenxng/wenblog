<template>
    <div class="shopcar-container">
        <!--商品列表区-->
        <div class="good-list">

            <div class="mui-card">
                <div class="mui-card-content" v-for="item in $store.state.car" :key="item.id">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="value"></mt-switch>
                        <img :src="item.pic[0].picAddr" alt="">
                        <div class="info">
                            <h1>{{ item.proName }}</h1>
                            <p>
                                <span class="price">&yen;{{ item.price }}</span>
                                <numbox :max="item.productNum" :num="item.num" :goodsid="item.id" :size="item.size"></numbox>
                                <a href="#" @click.prevent="Delete">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!--结算区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    结算
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import numbox from '../subcomponents/ShopCar_numbox.vue'
    export default {
        name: "ShopContainer",
        data(){
            return{
                value:'',
            }
        },
        methods:{

        },
        created(){
            this.loginAxiosGet('/cart/queryCart',res => {
                //检测登录
            })
        },
        components:{
            numbox
        }
    }
</script>

<style scoped lang="less">
    .shopcar-container{
        .good-list{
            .mui-card-content-inner{
                display: flex;
                text-align: center;
                position: relative;
                img{
                    display: block;
                    width: 60px;
                    height: 60px;
                    margin: auto 0;
                }
                h1{
                    font-size: 13px;
                }
                .info{
                    margin-left: 10px;
                    padding-right: 20px;
                    p{
                        margin-top: 15px;
                        margin-left: 5px;
                        .price{
                            color:red;
                            font-weight: bold;
                            margin-right: 5px;
                        }
                        a{
                            display: block;
                            background-color: red;
                            color:#fff;
                            width: 30px;
                            height: 30px;
                            line-height: 30px;
                            border-radius:3px;
                            position:absolute;
                            right:5px;
                            top:8px;
                        }
                    }

                }
            }
        }
    }
</style>