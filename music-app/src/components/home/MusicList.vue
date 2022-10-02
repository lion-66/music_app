<template>
    <div id="MusicList">
        <div class="MusicTop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="MusicContent">
            <van-swipe :loop="false" :width="150" class="my-swpie" :show-indicators='false'>
                <van-swipe-item v-for="item in person.MusicList" :key="item">
                    <router-link :to="{path:'/ItemMusic',query:{id:item.id}}">
                    <img :src="item.picUrl" alt="">
                    <span class="playCount">
                        <svg class="icon" aria-hidden="true">
                           <use xlink:href="#icon-l-play"></use>
                        </svg>
                        {{changCount(item.playCount)}}
                    </span>
                    <span class="name">{{item.name}}</span>
                    </router-link>
                </van-swipe-item>
            </van-swipe>

        </div>
    </div>
</template>

<script>
import {getMusicList} from '@/request/api/index.js'
import { reactive,onMounted} from 'vue'
export default {
    name:'MusicList',
    
    // data() {
    //     return {
    //         MusicList:[]
    //     }
    // },
    // methods: {
    //    async getGnedan(){
    //         let res = await getMusicList()
    //          console.log(res);
    //          this.MusicList = res.data.result
    //     },
    //     changCount:function(num){
    //         if(num>=100000000){
    //             return (num/100000000).toFixed(1) + '亿'
    //         }else if(num>=10000){
    //             return (num/10000).toFixed(1)+'万'
    //         }
    //     }
    // },
    // mounted(){
    //     this.getGnedan()
    // }
    setup(){
        let person = reactive({
            MusicList:[]
        })
        function changCount(num){
            if(num>=100000000){
                return (num/100000000).toFixed(1) + '亿'
            }else if(num>=10000){
                return (num/10000).toFixed(1)+'万'
            }
        }
        onMounted(async ()=>{
            let res = await getMusicList()
            console.log(res);
            person.MusicList = res.data.result
        
        })
        return {person,changCount}
    }
}
</script>

<style lang="less">
    #MusicList{
        width: 100%;
        height: 5rem;
        padding: .2rem;
        .MusicTop{
            width: 100%;
            height: 0.6rem;
            margin-bottom: .2rem;
            display: flex;
            justify-content: space-between;
            .title{
                font-weight: 900;
                font-size: .4rem;
                
            }
            .more{
                border: 1px solid #ccc;
                text-align: center;
                line-height: .6rem;
                padding:0 0.2rem;
                border-radius: .4rem;
            }
        }
        .MusicContent{
            width: 100%;
            height: 4rem;
            .my-swpie{
                width: 100%;
                position: relative;
                img{
                    width: 100%;
                    height: 3rem;
                    border-radius: .3rem;
                    padding: .1rem;
                }
                .playCount{
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    color: #e2e0e0;
                    .icon{
                        width: .27rem;
                        height: .27rem;
                        color: #fff;
                    }
                }
                
            }
        }
    }
</style>