<template>
    <div id="Swpiec">
        <van-swipe :autoplay="3000" lazy-render>
                <van-swipe-item v-for="image in state.images" :key="image">
                <img :src="image.pic" />
                </van-swipe-item>
        </van-swipe>
    </div>
    
</template>

<script>
import axios from 'axios'
import {getBanner} from '@/request/api/index.js'
import {reactive,onMounted} from 'vue'
export default {
    name:'Swpiec',
    setup() {
        let state = reactive({
            images:[
                
            ]
        })
        onMounted(async ()=>{
        //     axios.get('http://localhost:3000/banner?type=2').then(
        //     response => {
        //         console.log(response.data);
        //         state.images = response.data.banners
        //     },
        //     error => {
        //         console.log(error.massage)
        //     }
        // )
        let response = await getBanner()
        state.images = response.data.banners
        })
        
        return { state };
  },
}
</script>

<style lang="less">
#Swpiec{
   .van-swipe{
        width: 100%;
        .van-swipe__track{
          .van-swipe-item {
            img{
                width: 100%;
                height: 4rem;
                padding-left: 10px;
                padding-right: 10px;
                
                border-radius: .55rem;
                


            }
        }
        
        }
        .van-swipe__indicator--active{
            background-color: #fff;
            
        }
   }
}   


</style>