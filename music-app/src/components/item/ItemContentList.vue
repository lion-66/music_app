<template>
<!-- 歌单列表组件部分 -->
  <div class="itemMusics">
    <div class="Topmsg">
        <div class="TopmsgItem">
            <svg class="icon" aria-hidden="true">
               <use xlink:href="#icon-bofang1"></use>
            </svg>
            <span class="bfspan">播放全部
                <!-- <p class="num">共({{20}})首</p> -->
                </span>
        </div>
        <div class="TopmsgItem">
            <!-- 收藏按钮 -->
            <van-button round color="#ff0004">
                <span class="collect">+收藏({{subscribedCount}})</span>
            </van-button>
        </div>
    </div>
    <!-- 歌曲列表 -->
        <ul>
            <li class="count" v-for="(items,index) in ItemList" :key="index" >
                <!-- <span style="color:red;">{{index + 1}}</span>{{items.name}} -->
                <div class="musicLeft" @click="playMusic(index)">
                    <span class="sum">{{index+1}}</span>
                    <div class="songName">
                        <p>{{items.name}}</p>
                        <div class="arName">
                           <span v-for="(item1,i) in items.ar" :key="i">{{item1.name}}<i>/</i></span>
                        </div>
                    </div>
                </div>
                <div class="musicRight">
                    <svg class="icon" aria-hidden="true">
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
import { mapMutations } from 'vuex';
export default {
    name:'ItemContentList',
    props:['ItemList','subscribedCount'],
    setup(props) {
        console.log(props);
    },
    methods:{
        playMusic(index){
            this.updatePlayList(this.ItemList)
            this.updatePlayListIndex(index)
        },
        ...mapMutations(['updatePlayList','updatePlayListIndex'])
    },
   
}
</script>

<style lang="less">
    .itemMusics{
            width: 100%;
            height: 900px;
            position: absolute;
            top: 325px;
            padding: 10px;
            background-color: #fff;
            border-top-left-radius: .4rem;
            border-top-right-radius: .4rem;
            .Topmsg{
                width: 100%;
                height: 50px;
                border-bottom: 1px solid #ccc;
                display: flex;
                justify-content: space-between;
                .TopmsgItem{
                width: 125px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .bfspan{
                    font-size: 22px;
                    font-weight: 900;
                }
                .collect{
                    font-size: 10px;
                    
                }
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
        }
</style>