<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">

                <router-link :to="'/home/newsinfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.pic[0].picAddr">
                    <div class="mui-media-body">
                        <h1 class='mui-ellipsis'>{{ item.proName }}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间:{{ item.updateTime | dateFormat }}</span>
                            <span>点击:0次</span>
                        </p>
                    </div>
                </router-link>
            </li>

        </ul>
    </div>
</template>

<script>
    export default {
        name: "NewsList",
        data(){
            return {
                newslist:[],
            }
        },
        methods:{
            getNewsList(){
                this.$axios.get('product/queryProduct?page=1&pageSize=8').then((res) => {

                    if (res.data.error){
                        return toast("获取新闻列表失败")
                    }
                    console.log(res.data.data)
                    res.data.data.forEach(function(item){
                        if (!item.pic.length){
                            item.pic =[{picAddr:'/images/static/detail6.jpg'}]
                        }
                    })
                    this.newslist = res.data.data

                })
            }
        },
        created(){
            this.getNewsList()
        }
    }
</script>
<style scoped lang="less">
    .mui-table-view{
        li{
            h1.mui-ellipsis{
                font-weight: 400;
                font-size: 14px
            }
            p.mui-ellipsis{
                font-size: 12px;
                color:skyblue;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>