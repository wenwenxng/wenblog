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
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
    var api = 'http://localhost:5000'

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
                this.$http.get('product/queryProductDetail',{params:{id:this.id}}).then(function(data){

                    if (data.body.error){
                        return toast("获取新闻详情失败")
                    }
                    if (data.body.pic.length){
                        data.body.pic[0].picAddr = api+data.body.pic[0].picAddr
                    }else{
                        data.body.pic = [{picAddr:api+'/m/images/none.jpg'}]
                    }

                    this.newsinfo=data.body
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