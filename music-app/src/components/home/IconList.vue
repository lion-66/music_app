<template>
    <div id="iconList">
        <!-- 每日推荐 -->
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
               <use xlink:href="#icon-tuijian"></use>
            </svg>
            <span>每日推荐</span>
        </div>
        <div class="iconItem">
            <!-- 私人FM -->
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhibo"></use>
            </svg>
            <span>私人FM</span>
        </div>
        <div class="iconItem">
            <!-- 歌单 -->
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gedan"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="iconItem">
            <!-- 排行榜 -->
            <svg class="icon" aria-hidden="true">
               <use xlink:href="#icon-paihangbang"></use>
            </svg>
            <span>排行榜</span>
        </div>

        
        
        
    </div>
</template>

<script>
export default {
    name:'IconList'
}
</script>

<style lang="less">
    #iconList{
        margin-top: .2rem;
        width: 100%;
        height: 2rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .icon{
            height: 1rem;
            width: 1rem;
        }
        .iconItem{
            width: 25%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
</style>