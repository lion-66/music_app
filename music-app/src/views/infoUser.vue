<template>
    <div class="myUser">
        <svg class="icon" aria-hidden="true" @click="$router.push('/')">
            <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <div class="msg">
            <h1>个人中心</h1>
            <img :src="user.data.profile.avatarUrl" alt="">
            <span>{{user.data.profile.nickname}}</span>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'infoUser',
    computed:{
        ...mapState(['user'])
    },
    mounted() {
        console.log(this.user)
    },
}
</script>

<style lang="less">
    .myUser{
        img{
            width: 60px;
            height: 60px;
            border-radius: 50%
        }
        .msg{
            width: 100%;
            height: 200px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
        }
    }
</style>