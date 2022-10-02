<template>
    <img :src="musicList.al.picUrl" alt="" id="bigimg">
    <div class="musicDetail">
        
       <div class="detailTopLeft">
            <div class="left_">
                <svg class="icon" aria-hidden="true" @click="updataDetailShow">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
            </div>
            <div class="detailName">
                <Vue3Marquee>
                    <p>{{musicList.al.name}}</p>
                </Vue3Marquee>
                <div class="arName">
                    <!-- <span>{{musicList.ar[0].name}}</span> -->
                    <span v-if="musicList['ar']">{{musicList.ar[0].name}}</span>
                    <span v-else>无作者</span>
                    <svg class="icon iconName" aria-hidden="true">
                      <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
                
            </div>
       </div>
       <div class="detailTopRight">
            <svg class="icon fenxiang" aria-hidden="true">
                <use xlink:href="#icon-fenxiang11"></use>
            </svg>
       </div>
    </div>
    <div class="musicContent" @click="isLyric=!isLyric" v-if="isLyric">
        <!-- 光碟部分 -->
        <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{img_needle_active:!isShow}">
        <img src="@/assets/pppp.png" alt="" class="img_cd">
        <img :src="musicList.al.picUrl" alt="" class="nameImg" :class="{nameImg_active:!isShow,nameImg_paused:isShow}">
    </div>
    <div class="musicLyric" ref="musicLyric" @click="isLyric=!isLyric" v-else>
       

       <p v-for="item in lyrics" :key="item" :class="{active:(currentTime*1000>=item.time && currentTime*1000<item.pre)}">{{item.lrc}}</p>
    </div>
    <div class="musicFooter">
        <div class="musicPortion">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-aixin"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiazai"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yinlechangpian"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiaoxi"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-aixin"></use>
            </svg>
        </div>
        <div class="progress_bar">
            <input type="range" class="range" min="0" :max="duration" step="0.05" v-model="currentTime">
        </div>
        <div class="footer_di">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xunhuan"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="goList(-1)">
                <use xlink:href="#icon-shangyishoushangyige"></use>
            </svg>
            <svg class="icon bf" aria-hidden="true" @click="play" v-if="isShow">
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <svg class="icon bf" aria-hidden="true" @click="play" v-else>
                <use xlink:href="#icon-zanting1"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="goList(1)">
                <use xlink:href="#icon-xiayigexiayishou"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-31liebiao"></use>
            </svg>
        </div>
        
        
    </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations,mapState } from 'vuex'
export default {
    name:'MusicDetail',
    props:['musicList','isShow','play','addDuration'],
    components: {
    Vue3Marquee,
  },
  data() {
    return {
        isLyric:false
    }
  },
  computed:{
    ...mapState(['musicLyric','currentTime','playListIndex','playList','duration']),
    lyrics:function(){
        let arr;
        if(this.musicLyric.lyric){
            arr = this.musicLyric.lyric.split(/[(\r\n)\r\n]+/).map((item,i)=>{
                let min = item.slice(1,3)
                let sec = item.slice(4,6)
                let mill = item.slice(7,10)
                let lrc = item.slice(11,item.length)
                let time = parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill)
                if(isNaN(Number(mill))){
                    mill = item.slice(7,9)
                    lrc = item.slice(10,item.length)
                    time = parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill)
                }
                return {min,sec,mill,lrc,time}
                
            })
            arr.forEach((item,i) => {
                if(i===arr.length-1 || isNaN(arr[i+1].time)){
                    item.pre = 100000
                }
                else{
                    item.pre=arr[i+1].time
                }
            });
        }
        // console.log(arr);
        return arr
    }
  },
  methods:{
    ...mapMutations(['updataDetailShow','updatePlayListIndex']),
    goList(num){
        let index = this.playListIndex+num
        if(index<0){
            index = this.playList.length-1
        }else if(index==this.playList.length){
            index = 0
        }
        this.updatePlayListIndex(index)
    }
  },
  watch:{
    currentTime:function(newValue){
        let p = document.querySelector('p.active')
        // console.log([p]);
        if(p){
         if(p.offsetTop > 300){
            this.$refs.musicLyric.scrollTop = p.offsetTop-300
        }
        }
        if(newValue === this.duration){
            
            if(this.playListIndex === this.playList.length -1){
                this.updatePlayListIndex(0)
                this.play()
            }else{
               this.updatePlayListIndex(this.playListIndex + 1)
            }
        }

        
    }
  },
    mounted() {
        // console.log(this.musicLyric.lyric)
        this.addDuration()
        // console.log(this.duration);
    },

}
</script>

<style lang="less" scoped>
    #bigimg{
        width: 100%;
        height: 100%;
        border-radius: 0;
        position: absolute;
        filter: blur(20px);
        z-index: -1;
    }
    .musicDetail{
        width: 100%;
        height: 80px;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon{
            width: 71px;
            height: 35px;
            fill: #fff;
        }
        .detailTopLeft{
            width: 150px;
            height: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .detailName{
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                color: #fff;
                p{
                    font-size: 18px;
                }
                .arName{
                    display: flex;
                    align-items: flex-end;
                    .iconName{
                    width: 15px;
                    height: 15px;
                  }
                }
            }
            .left_{
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                .icon{
                    width: 30px;
                    height: 30px;
                }
            }
        }
        
    }
    .musicContent{
        width: 100%;
        height: 9rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        .img_needle{
            width: 2rem;
            height: 3rem;
            position: absolute;
            left: 46%;
            transform-origin: 0 0;
            transform: rotate(-14deg);
            transition: all 2s;
        }
        .img_needle_active{
            width: 2rem;
            height: 3rem;
            position: absolute;
            left: 46%;
            transform-origin: 0 0;
            transform: rotate(0deg);
            transition: all 2s;
        }
        .img_cd{
            width: 5rem;
            height: 5rem;
            position: absolute;
            bottom: 2.3rem;
            z-index: -1;
        }
        
        .nameImg{
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 50%;
            position: absolute;
            bottom: 3.14rem;
            animation: rotated 10s infinite linear;

        }
        .nameImg_active{
            animation-play-state: running;
        }
        .nameImg_paused{
            animation-play-state: paused;

        }
        @keyframes rotated {
            0%{
                transform: rotateZ(0deg);
            }
            100%{
                transform: rotateZ(360deg);
            }

        }
    }
    .musicLyric{
        width: 100%;
        height: 9rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: scroll;
        P{
            font-size: 17px;
            color:#dfdddd;
            margin-top: 20px;
            letter-spacing:2px;
        }
        .active{
            font-size: 20px;
            color: pink;
        }
    }
    .musicFooter{
        .musicPortion,.footer_di{
            width: 100%;
            height: 60px;
            display: flex;
            justify-content: space-around;
            .icon{
                width: 35px;
                height: 35px;
                fill: #fff;
            }
            .bf{
                width: 50px;
                height: 50px;
                fill: #fff;
            }
        }
        .footer_di{
            align-items: center;
        }
        .progress_bar{
            width: 100%;
            height: 40px;
            .range{
                width: 100%;
                height: 0.06rem;
                background-color: pink;
            }
        }
    }
</style>