<template>
    <div class="comment-container">
        <h3>发表评论</h3>
        <div class="mui-content">
        <textarea placeholder="请输入要BB的内容(最多吐槽120字)" maxlength="120" v-model="cmt"></textarea>
        </div>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list" v-for="(item,index) in comments" :key="item.id">
            <div class="cmt-item">
                <div class="cmt-title" :class="{'cmt-title-active':item.id == id}">
                    第{{ index + 1 }}楼&nbsp;&nbsp;用户:匿名用户&nbsp;&nbsp;发表时间:{{ item.updateTime | dateFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content}}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    //有一个坑没填,当你一次性评论超过5条的时候,加载更多是不会出任何东西的.
    import { Toast } from 'mint-ui';
    export default {
        name: "comment",
        data(){
            return {
                comments:[],
                pageIndex:1,
                cmt:''
            }
        },
        props:['id','bankuaiId'],
        methods:{
            getComments(flag){
                this.$axios.get('comments/queryComments',{params: {page:this.pageIndex,pageSize:5,bankuaiId: this.bankuaiId,detailId:this.id}}).then((res) => {

                    if (res.data.error){
                        return Toast("获取评论失败")
                    }

                    if (!res.data.length && flag) {
                        return Toast({
                            message: '无更多评论',
                            position: 'middle',
                            duration: 3000
                        })
                    }
                    console.log(res.data)
                    //每当获取新评论数据逇时候,不要把老数据清空覆盖,而是应该以老数据拼接新数据
                    res.data = res.data.filter(t1 =>
                        this.comments.every(t2 => t1.id !== t2.id)
                    )
                    this.comments = this.comments.concat(res.data)
                    // res.data.forEach( t => this.comments.push(t))

                })
            },
            getMore(){
                this.pageIndex++
                this.getComments(true)//第二次获取
            },
            postComment(){
                //发表评论
                if (this.cmt.trim().length === 0){
                    return Toast('评论不能为空')
                }
                this.$axios.post('comments/addComment',{ content:this.cmt.trim(), bankuaiId:this.bankuaiId, detailId:this.id}).then((res) => {
                    console.log(res)
                    if (res.data.success !== true){
                        return Toast('评论失败')
                    }
                    var comment = {
                        id:this.comments.length?this.comments[0].id + 1: 1,
                        updateTime:Date.now(),
                        content:this.cmt.trim()
                    }
                    this.comments.unshift(comment)
                    this.cmt = ''
                })
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