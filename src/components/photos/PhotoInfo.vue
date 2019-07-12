<template>
    <div class="photoinfo-container">
       <h3>{{ photoinfo.rows[0].title }}</h3>
        <p class="subtitle">
            <span>发表时间:{{ photoinfo.rows[0].updateTime | dateFormat }}</span>
            <span>点击 100 次</span>
        </p>
        <hr>
        <!--缩略图区域-->
        <div class="thumbs">
            <vue-preview :slides="slide1" @close="handleClose" ></vue-preview>
        </div>
        <!--内容区-->
        <div class="content">
            <div class="text">
                {{ photoinfo.rows[0].content }}
            </div>
        </div>
        <!--放置一个现成的评论子组件-->
        <comment :id="photoinfo.rows[0].brandId" bankuaiId="2"></comment>
    </div>
</template>

<script>
    //1.导入评论子组件
    import comment from '../subcomponents/comment.vue'
    export default {
        name: "PhotoInfo",
        data(){
            return {
                id:this.$route.params.id,
                photoinfo:{rows:[{}]},
                slide1: [
                ]
            }
        },
        created(){
            this.getPhotoInfo()
            this.getThumbs()
        },
        methods:{
            getPhotoInfo(){
                this.$axios.get('category/querySecondCategoryDetail?id=' + this.id)
                    .then((res) => {
                    console.log(res.data)
                    this.photoinfo = res.data
                })
            },
            getThumbs(){
                this.$axios.get('category/querySecondCategoryDetail?id=' + this.id)
                    .then((res) => {
                        res.data.picAddr.forEach(function(item){
                            item.w= 600
                            item.h= 400
                            item.alt="picture1"
                            item.title="Image Caption 1"
                        })
                        this. slide1 = res.data.picAddr
                    })
            },
            handleClose () {
                console.log('close event')
            }
        },
        //注册子组件
        components:{
            comment
        }
    }
</script>

<style scoped lang="less">
    .photoinfo-container{
        padding: 3px;
        h3{
            color:#26a2ff;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle{
            display: flex;
            justify-content: space-between;
            font-size: 12px;
        }
        .content{
            font-size: 13px;
            line-height: 30px;
            .text{
                text-indent: 2em;
            }

        }

        .thumbs {
            /deep/ .my-gallery {
                display: flex;
                flex-wrap: wrap;
                figure {
                    width: 30%;
                    margin: 5px;
                    img {
                        width: 100%;
                    }
                }
            }
        }
    }
</style>