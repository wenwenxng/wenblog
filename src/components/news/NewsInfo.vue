<template>
    <div class="newsinfo-container" v-cloak>
        <h3 class="title">{{ newsinfo.proDesc }}</h3>
        <p class="subtitle">
            <span>发表时间:{{ newsinfo.updateTime | dateFormat }}</span>
            <span>点击:0次</span>
        </p>
        <hr>
        <div class="content">
            <img class="mui-media-object mui-pull-left" width="100%" :src="newsinfo.pic[0].picAddr">
            {{ newsinfo.proName }}
        </div>

        <!--评论区子组件-->
        <comment-box :id="this.id" bankuaiId="1"></comment-box>
    </div>
</template>

<script>

    import comment from '../subcomponents/comment.vue'
    export default {
        name: "newsInfo",
        data(){
            return{
                id:this.$route.params.id,//把id挂载到data上,方便调用
                newsinfo:{pic:[{}]}
            }
        },
        methods:{
            getNewsInfo(){
                this.$axios.get('product/queryProductDetail',{params:{id:this.id}}).then((res) => {

                    if (res.data.error){
                        return Toast("获取新闻详情失败")
                    }
                    if (!res.data.pic.length){
                        res.data.pic = [{picAddr:'/images/static/detail6.jpg'}]
                    }

                    this.newsinfo=res.data
                })
            }
        },
        created(){
            this.getNewsInfo()
        },
        components:{//用来注册子组件的
            "comment-box":comment
        }
    }
</script>

<style scoped lang="less">
    .newsinfo-container{
        padding: 0 4px;
        .title{
            font-size:16px;
            text-align:center;
            margin: 15px 0 ;
            color:skyblue
        }
        .subtitle{
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
        .content{

        }
    }

</style>