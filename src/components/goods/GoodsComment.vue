<template>
    <div>
        <comment-box :id="$route.params.id" bankuaiId="3"></comment-box>
    </div>
</template>

<script>
    import commentBox from '../subcomponents/comment.vue'
    export default {
        name: "GoodsComment",
        components:{
            commentBox
        }
    }
</script>

<style scoped>

</style>