<template>
    <!--我们不知道什么时候能拿到max值,但是总有一刻能拿到-->
    <!--我们可以使用watch属性监听,来箭筒父组件传递过来的max值,不管watch会触发几次,但是,最后一次,肯定是一个合法的max数值-->
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max="max">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="num" ref="numbox" @change="handleNumChange" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../lib/mui/dist/js/mui.min.js'

    export default {
        name: "ShopCar_numbox",
        data(){
            return {

            }
        },
        props:['max','num','goodsid','size'],
        mounted(){
            mui('.mui-numbox').numbox()
        },
        watch:{
            // max(){
            //         //这里是因为数据到了才开始渲染,所以max是一个定值
            //     mui('.mui-numbox').numbox().setOption('max',this.max)
            // }

        },
        methods:{
            handleNumChange(){
                var num = parseInt(this.$refs.numbox.value)
                    //每当数量改变,立即覆盖store并都上传到服务器
                    this.loginAxiosPost('/cart/updateCart',{id:this.goodsid,num,size:this.size},res =>{
                        if (res.data.success !== true) return
                        this.$store.commit('numChangeUpdateCart',{id:this.goodsid,num})
                    })

            }
        }
    }
</script>

<style scoped>
    .mui-numbox{
        height: 25px;
    }
</style>