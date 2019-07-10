<template>
    <div class="comment-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要BB的内容(最多吐槽120字)" maxlength="120"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>

        <div class="cmt-list" v-for="(item,index) in comments">
            <div class="cmt-item">
                <div class="cmt-title" :class="{'cmt-title-active':item.id == id}">
                    第{{ index + 1 }}楼&nbsp;&nbsp;用户:匿名用户&nbsp;&nbsp;发表时间:{{ item.updateTime | dateFormat}}
                </div>
                <div class="cmt-body">
                    {{item.proDesc}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "comment",
        data(){
            return {
                comments:[],
                pageIndex:1,
            }
        },
        props:['id'],
        methods:{
            getComments(){
                this.$http.get('product/queryProduct?page='+this.pageIndex+'&pageSize=5').then(function(data){

                    if (data.body.error){
                        return Toast("获取轮播图失败")
                    }

                    if (!data.body.data.length) {
                        return Toast({
                            message: '无更多评论',
                            position: 'middle',
                            duration: 3000
                        })
                    }
                    console.log(data.body.data)
                    //每当获取新评论数据逇时候,不要把老数据清空覆盖,而是应该以老数据拼接新数据
                    this.comments = this.comments.concat(data.body.data)
                    // data.body.data.forEach( t => this.comments.push(t))

                })
            },
            getMore(){
                this.pageIndex++
                this.getComments()
            }
        },
        created(){
            this.getComments()
        }
    }
</script>

<style lang="less" scoped>
.comment-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                line-height: 30px;
                background: #ccc;
            }
            .cmt-title-active{
                background: skyblue;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }

    }

}
</style>