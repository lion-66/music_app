<template>
  <div>
    <ItemMusicTop :playlist='state.playlist'/>
    <ItemContentList :ItemList='state.ItemList' :subscribedCount='state.playlist.subscribedCount'/>
  </div>
</template>

<script>
import {useRoute} from 'vue-router'
import {onMounted,reactive} from 'vue'
import {getMusicItemList,getItemList} from '@/request/api/item'
import ItemMusicTop from '@/components/item/ItemMusicTop'
import ItemContentList from '@/components/item/ItemContentList'
export default {
    name:'ItemMusic',
    setup() {
      const state = reactive({
        // 歌单详情页的数据
        playlist:{},
        // 歌单的歌曲
        ItemList:[]
      })
        onMounted(async ()=>{
            let id = useRoute().query.id
            let res = await getMusicItemList(id)
            console.log(res)
            state.playlist = res.data.playlist
            let result = await getItemList(id)
            // console.log('歌曲数据',result)
            state.ItemList = result.data.songs
            // 防止页面刷新的时候，数据丢失
            sessionStorage.setItem('itemDetail',JSON.stringify(state))
        })
        return {state}
    },
    components:{ItemMusicTop,ItemContentList}
}
</script>

<style>

</style>