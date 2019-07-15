<template>
    <div class="shopcar-container">
        <!--商品列表区-->
        <div class="good-list">

            <div class="mui-card">
                <div class="mui-card-content" v-for="(item,index) in $store.state.car" :key="item.id">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="$store.getters.getGoodsSelected[index].selected" @change="selectedChange(index,$store.getters.getGoodsSelected[index].selected)"></mt-switch>
                        <img :src="item.pic[0].picAddr" alt="">
                        <div class="info">
                            <h1>{{ item.proName }}</h1>
                            <p>
                                <span class="price">&yen;{{ item.price }}</span>
                                <numbox :max="item.productNum" :num="item.num" :goodsid="item.id" :size="item.size"></numbox>
                                <a href="#" @click.prevent="remove(item.id,index)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!--结算区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计(不含运费)</p>
                        <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.num }}</span> 件, 总价 &yen; <span class="red">{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import numbox from '../subcomponents/ShopCar_numbox.vue'
    import { Toast } from 'mint-ui'
    export default {
        name: "ShopContainer",
        data(){
            return{

            }
        },
        methods:{
            remove(id, index){
                //点击删除,把商品从store中根据 传递的Id删除,同时使用index删除vuex里面的东西
                this.loginAxiosGet('/cart/deleteCart?id=' + id,res => {
                    if (res.data.success !== true) {
                        return Toast('操作失败')
                    }
                    Toast('删除成功')
                    this.$store.commit('removeFromCar',index)
                })
            },
            selectedChange(index,val){
                this.$store.commit('updateGoodsSelected',{index,val})
            }

        },
        created(){
            this.loginAxiosGet('/cart/queryCart',res => {

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
                    width: 203px;
                    margin-left: 10px;
                    padding-right: 20px;
                    p{
                        display: flex;
                        justify-content: space-between;
                        margin-top: 15px;
                        margin-left: 5px;
                        .price{
                            color:red;
                            font-weight: bold;
                            margin-right: 3px;
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
        .jiesuan{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red{
                color:red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
</style>