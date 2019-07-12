<template>
    <div>
        <form class="mui-input-group">
            <div class="mui-input-row">
                <label>用户名</label>
                <input type="text" class="mui-input-clear" placeholder="请输入用户名" v-model="username">
            </div>
            <div class="mui-input-row">
                <label>密码</label>
                <input type="password" class="mui-input-password" placeholder="请输入密码" v-model="password">
            </div>
            <div class="mui-button-row">
               <mt-button type="primary" size="normal" @click="handleLogin">登录</mt-button>
               <mt-button type="danger" size="normal">重置</mt-button>
            </div>
        </form>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        name: "Login",
        data(){
            return {
                returnUrl:this.$route.query.returnUrl || '/',
                username:'',
                password:'',
            }
        },
        methods:{
            handleLogin(){
                this.$axios.post('/user/login',{
                    username:this.username,password:this.password
                })
                    .then(res => {
                        if (res.data.success !== true){
                            return Toast('账号密码有误')
                        }
                        this.$router.push(this.returnUrl)

                    })
            }
        },
        created(){

        }
    }
</script>

<style scoped>

</style>