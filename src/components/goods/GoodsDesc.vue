<template>
    <div class="goodsdesc-container">
        <h3>{{ info.proName}}</h3>
        <hr>
        <div class="content">
            <img :src="info.pic[0].picAddr" alt="">
            <p>{{ info.proDesc}}</p>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    export default {
        name: "GoodsDesc",
        data(){
            return {
                id:this.$route.params.id,
                info:{pic:[{}]}
            }
        },
        methods:{
            getGoodsDesc(){
                this.$axios.get('product/queryProductDetail?id=' + this.id)
                    .then(res =>{
                        if (res.data.error){
                            return Toast('服务器繁忙')
                        }
                        console.log(res.data)
                        this.info = res.data
                    })
            }
        },
        created(){
            this.getGoodsDesc()
        }

    }
</script>

<style scoped lang="less">
    .goodsdesc-container{
        h3{
            font-size: 16px;
            color: #226aff;
            text-align: center;
            margin: 15px 0;
        }
        img{
            width: 100%;
        }
        p{
            text-indent: 2em;
            line-height: 2;
        }
        .ball{
            width: 90px;
            height: 90px;
            border-radius: ;
        }
    }
</style>