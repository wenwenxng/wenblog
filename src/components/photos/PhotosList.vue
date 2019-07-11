<template>
    <div>
        <!--顶部滑动条区域-->
        <div id="slider" class="mui-slider">

            <div id="sliderSegmentedControl"
                 class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',{' mui-active': item.id === 0}]" href="javascript:;"
                       data-wid="tab-top-subpage-1.html" v-for="item in cates" :key="item.id" @tap="getPhotoListByCateId(item.id)">
                        {{ item.categoryName }}
                    </a>
                </div>
            </div>
        </div>
        <!--图片列表区域-->
        <ul class="photo-list">
            <router-link v-for="item in photosList" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
                <img v-lazy="item.brandLogo" width="100%">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    //1.导入mui的js文件
    import mui from '../../lib/mui/dist/js/mui.min.js'

    export default {
        name: "PhotosList",
        data() {
            return {
                cates: [],//所有分类的列表
                photosList:[],//图片列表的数据
            }
        },
        methods: {
            getAllCategory() {
                this.$axios.get('category/queryTopCategory').then((res) => {
                    if (res.data.error) {
                        return Toast('网页请求失败')
                    }
                    res.data.rows.unshift({
                        id: 0,
                        "categoryName": "全部",
                        "isDelete": 1
                    })
                    this.cates = res.data.rows
                })
            },
            getPhotoListByCateId(cateId){
                this.$axios.get('category/querySecondCategory?id=' + cateId).then((res) => {
                    if (res.data.error){
                        return Toast('出错了')
                    }

                    this.photosList = res.data.rows
                    console.log(this.photosList)
                })
            }
        },
        created() {
            this.getAllCategory()
            this.getPhotoListByCateId(0)
        },
        mounted() {//当组件的dom结构被渲染好并放到页面中后,会执行这个钩子函数
            //2初始化滑动控件
            mui('#sliderSegmentedControl').scroll({
                scrollY: true,
                scrollX: true,
                deceleration: 0.0006
            });
        }
    }
</script>

<style scoped lang="less">
    * {
        /*可以提高流畅度*/
        touch-action: pan-y
    }

    .photo-list{
        list-style: none;
        padding:10px;
        padding-bottom:0;
        margin: 0;
        li{
            background-color: #ccc;
            position: relative;
            box-shadow:0 2px 3px #999;
            margin-bottom: 10px;
            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            img{
                display: block;
            }
            .info{
                position: absolute;
                width: 100%;
                max-height:84px;
                bottom:0;
                color:white;
                background-color: rgba(0,0,0,.4);
                .info-title{
                    font-size: 14px;
                    text-align: left;
                }
                .info-body{
                    font-size: 13px;
                }
            }
        }
    }
</style>