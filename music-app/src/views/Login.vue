<template>
  <div class="myUser">
        <!-- <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-zuojiantou"></use>
        </svg> -->
        <div class="login">
            <p>欢迎登录</p>
            <input type="text" name="phone" class="phone" v-model="phone" placeholder="请输入手机号码">
            <input type="password" name="password" v-model="password" class="password" placeholder="请输入密码">
            <button class="btn" @click="Login">登录</button>
        </div>
  </div>
</template>

<script>
import { getUsermsg } from "@/request/api/index";
export default {
    data() {
        return {
            phone:'',
            password:'',
        }
    },
    methods: {
       async Login(){
            let res = await this.$store.dispatch('getLogin',{phone:this.phone,password:this.password})
            console.log(res)
            if(res.data.code === 200){
                this.$store.commit('updataUser',true)
                this.$store.commit('updataToken',res.data.token)
                let result = await getUsermsg(res.data.account.id)
                console.log(result)
                this.$store.commit('updataUserMsg',result)
                this.$router.push('/infoUser')
            }else{
                alert('手机号码或密码错误！！')
                this.password = ''
            }
        }
    },
}
</script>

<style lang="less">
    .myUser{
        width: 100%;
        height: 100%;
        .login{
             width: 100%;
             height: 15rem;
             display: flex;
             flex-direction: column;
            justify-content: space-evenly;
             align-items: center;
             background: darksalmon;
            p{
                font-size: 40px;
            }
            .phone,.password{
                height: 30px;
            }
            .btn{
                width: 100px;
                height: 30px;
                border-radius: 30px;
            }
        }
    }
</style>