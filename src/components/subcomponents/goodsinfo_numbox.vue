<template>
    <!--我们不知道什么时候能拿到max值,但是总有一刻能拿到-->
    <!--我们可以使用watch属性监听,来箭筒父组件传递过来的max值,不管watch会触发几次,但是,最后一次,肯定是一个合法的max数值-->
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" ref="numbox" @change="handleNumChange"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../lib/mui/dist/js/mui.min.js'

    export default {
        name: "goodsinfo_numbox",
        data(){
            return {

            }
        },
        props:['max'],
        mounted(){
            mui('.mui-numbox').numbox()
        },
        watch:{
            max(){
                //要动态的设置max,因为输入框很耿直,它渲染那一刻是什么数字就是什么数字,就算你后面改了,它js是不会变的,其实就是也是dom操作问题了
                //所以就是用它的js方法来设置
                mui('.mui-numbox').numbox().setOption('max',this.max)
            }
        },
        methods:{
            handleNumChange(){
                this.$emit('getcount',parseInt(this.$refs.numbox.value))
            }
        }
    }
</script>

<style scoped>

</style>