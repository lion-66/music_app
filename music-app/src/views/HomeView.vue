<template>
   <TopNav/>
   <SwpiecTop/>
   <IconList/>
   <MusicList/>
</template>

<script>

import TopNav from '@/components/home/TopNav.vue'
import SwpiecTop from '@/components/home/SwpiecTop.vue'
import IconList from '@/components/home/IconList'
import MusicList from '@/components/home/MusicList.vue'
export default {
  name: 'HomeView',
  components: {
    TopNav,
    SwpiecTop,
    IconList,
    MusicList
  }
}
</script>
<style lang="less">
 
</style>