<template>
    <div class="footerMusic">
        <div class="musicLeft" @click="updataDetailShow">
            <img :src="playList[playListIndex].al.picUrl" alt="">
            <div class="musicNameTop">
                <p>{{playList[playListIndex].name}}</p>
                <span>横滑可切换上下首哦</span>
            </div>
        </div>
        <div class="musicRight">
            <div class="iconRight">
                <svg class="icon" aria-hidden="true" @click="play" v-if="isShow">
                  <use xlink:href="#icon-bofang"></use>
                </svg>
                <svg class="icon" aria-hidden="true" @click="play" v-else>
                  <use xlink:href="#icon-weibiaoti--"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-zu"></use>
                </svg>
            </div>
        </div>
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
        <van-popup v-model:show="detailShow" position="right" 
         :style="{ height: '100%',width:'100%',backgroundColor:'#fff' }">
           <MusicDetail 
           :musicList='playList[playListIndex]' 
           :play='play' 
           :isShow='isShow' 
           :addDuration='addDuration'/>
        </van-popup>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import MusicDetail from '@/components/item/MusicDetail.vue'
export default {
    name:'FooterMusic',
    components:{MusicDetail},
    data() {
        return {
            timer:0
        }
    },
    computed:{
        ...mapState(['playList','playListIndex','isShow','detailShow'])
    },
    mounted(){
        // console.log(this.$refs);
        this.$store.dispatch('getLyric',this.playList[this.playListIndex].id)
    },
    updated(){
        this.$store.dispatch('getLyric',this.playList[this.playListIndex].id)
        this.addDuration()
    },
    methods: {
        play(){
            if(this.$refs.audio.paused){
                this.$refs.audio.play()
                this.updateIsShow(false)
                this.updataTime()//播放时时时调用
            }else{
                this.$refs.audio.pause()
                this.updateIsShow(true)
                clearInterval(this.timer)//暂停清除定时器
            }
            
        },
        addDuration(){
            this.updataDuration(this.$refs.audio.duration)
        },
        updataTime(){
           this.timer =  setInterval(()=>{
                this.updataCurrentTime(this.$refs.audio.currentTime)
            },1000)
        },
        ...mapMutations(['updateIsShow','updataDetailShow','updataCurrentTime','updataDuration'])
    },
    watch:{
        playListIndex(){
            this.$refs.audio.autoplay = true
            if(this.$refs.audio.paused){
                this.updateIsShow(false)
            }
        },
        playList(){
            if(this.inShow = true){
                this.$refs.audio.autoplay = true
                this.updateIsShow(false)
            }
        }
    }
}
</script>

<style lang="less">
    .footerMusic{
        width: 100%;
        
        height: 70px;
        padding: 10px;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 1px 19px 18px 12px;
        img{
            width: 50px;
            height: 50px;
            border-radius: 50%;

        }
        .musicLeft{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .musicNameTop{
                
                width: 100%;
                height: 50px;
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                p{
                    font-size: 17px;
                    font-weight: 550;
                }
            }
            
        }
        .iconRight{
                width: 90px;
                height: 100%;
                display: flex;
                justify-content: space-around;
                .icon{
                    width: 35px;
                    height: 35px;
                }
            }
    }
</style>