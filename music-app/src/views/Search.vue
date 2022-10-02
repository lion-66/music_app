<template>
    <div class="searchTop">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <input type="text" class="sousuo" placeholder="搜索" v-model="searchKey" @keydown.enter="enterKey">
    </div>
    <div class="searchContent">
        <p>历史</p>
        <span v-for="item in keyWordList" :key="item" @click="searchSongs(item)">{{item}}</span>
        <svg class="icon deList" aria-hidden="true" @click="deList">
            <use xlink:href="#icon-shanchu"></use>
        </svg>
    </div>
    <div class="songsList">
        <ul>
            <li class="count" v-for="(items,index) in searchList" :key="index" >
                <div class="musicLeft" @click="pushMusic(items)">
                    <span class="sum">{{index+1}}</span>
                    <div class="songName">
                        <p>{{items.name}}</p>
                        <div class="arName">
                           <span v-for="(item1,i) in items.artists" :key="i">{{item1.name}}<i>/</i></span>
                        </div>
                    </div>
                </div>
                <div class="musicRight">
                    <svg class="icon" aria-hidden="true" v-if="items.artists.mvid != 0">
                       <use xlink:href="#icon-shipin"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                       <use xlink:href="#icon-bofanganniu"></use>
                    </svg>
                </div>
            </li>
        </ul>
    </div>

</template>

<script>
import {getSearchMusic} from '@/request/api/index'
export default {
    name:'Search',
    data() {
        return {
            keyWordList:['niho'],
            searchKey:"",
            searchList:[]
        }
    },
    mounted(){
        this.keyWordList = JSON.parse(localStorage.getItem('keyWordList'))?JSON.parse(localStorage.getItem('keyWordList')):[]
    },
    methods:{
        async enterKey(){
            if(this.searchKey != ''){
                this.keyWordList.unshift(this.searchKey)
                // 数组去重
                this.keyWordList = [...new Set(this.keyWordList)]
                if(this.keyWordList.length > 5){
                    this.keyWordList.splice(this.keyWordList.length-1,1)
                }
                localStorage.setItem('keyWordList',JSON.stringify(this.keyWordList))
                let res = await getSearchMusic(this.searchKey)
                console.log(res);
                this.searchList = res.data.result.songs
                this.searchKey = ''
            }
            
        },
        deList(){
            localStorage.removeItem('keyWordList')
            this.keyWordList = []
        },
        searchSongs:async function(item){
            let res = await getSearchMusic(item)
            // console.log(res);
            this.searchList = res.data.result.songs
        },
        pushMusic(item){
            item.al = item.album
            item.al.picUrl = item.album.artist.img1v1Url
            this.$store.commit('pushSearchList',item)
            this.$store.commit('updatePlayListIndex',this.$store.state.playList.length-1)
        }

    },
    

}
</script>

<style lang="less">
    .searchTop{
        width: 100%;
        height: 50px;
        padding: 10px;
        display: flex;
        align-items: center;
        .icon{
            width: 35px;
            height: 35px;
        }
        .sousuo{
            width: 300px;
            height: 40px;
            margin-left: 20px;
            padding: 0;
            // outline: none;
            border: none;
            border-bottom: 1px solid #000;
        }
           
    }
    .searchContent{
        width: 100%;
        height: 100px;
        padding: 10px;
        position: relative;
        p{
            margin-left: 20px;
            margin-bottom: 10px;
        }
        span{
            font-size: 15px;
            display: inline-block;
            margin-bottom: 10px;
            margin-left: 10px;
            padding: 5px;
            border-radius: 15px;
            background-color: #da8787;
        }
        .deList{
            position: absolute;
            right: 10px;
            top:10px
            
        }
    }
    .count{
            width: 100%;
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #ccc;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .musicLeft{
                width: 4rem;
                height: 100%;
                display: flex;
                justify-content: flex-start;
                .sum{
                    display: inline-block;
                    width: 20px;
                    font-size: 20px;
                    color: red;
                    text-align: right;
                }
                .songName{
                    height: 1rem;
                    width: 70px;
                    position: relative;
                    p{
                        position: absolute;
                        top:-11px;
                        left: 15px;
                        display: inline-block;
                        width: 170px;
                        height: 34px;
                        font-size: 16px;
                        font-weight: 550;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .arName{
                        height: 1rem;
                        width: 210px;
                        position: absolute;
                        top:11px;
                        left: 15px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        span{
                            margin-right:5px;
                            i{
                                margin: 0 3px;
                            }
                        }
                    }   
                }
            }
            .musicRight{
                // height: 1rem;
                width: 70px;
                display: flex;
                justify-content: space-around;
            }
        }
</style>