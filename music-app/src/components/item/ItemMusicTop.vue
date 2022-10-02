<template>
    <div id="ItemMusicTop">
        <img :src="playlist.coverImgUrl" alt="" class="bgimg">
        <div class="itemLeft">
          <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-zuojiantou"></use>
          </svg>
          <span>歌单</span>
        </div>
        <div class="itemRight">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fangdajing"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
        </div>
        <div class="msgTop">
            <img :src="playlist.coverImgUrl" alt="" class="bgTop">
            <div class="msgRight">
                <span class="top1">{{playlist.name}}</span>
                <div class="two">
                    <img :src="playlist.creator.backgroundUrl" alt="" class="smallImg">
                    <a href="" class="nickname">{{playlist.creator.nickname}}</a>
                </div>
                <span class="top2">{{playlist.description}}</span>
            </div>
        </div>
        <div id="iconItemList">
        <!-- 信息 -->
                <div class="iconItem">
                    <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiaoxi"></use>
                    </svg>
                    <span>{{playlist.commentCount}}</span>
                </div>
                <div class="iconItem">
                    <!-- 分享 -->
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-fenxiang"></use>
                    </svg>
                    <span>{{playlist.shareCount}}</span>
                </div>
                <div class="iconItem">
                    <!-- 歌单 -->
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xiazai"></use>
                    </svg>
                    <span>下载</span>
                </div>
                <div class="iconItem">
                    <!-- 排行榜 -->
                    <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-show_duoxuan"></use>
                    </svg>
                    <span>多选</span>
                </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name:'ItemMusicTop',
    props:['playlist'],
    setup(props) {
        // console.log(props);
        // 通过对props传过来的参数进行判断
        if((props.playlist.creator="")){
            props.playlist.creator = JSON.parse(sessionStorage.getItem()).playlist.creator
        }
    }
}
</script>

<style lang="less">
    #ItemMusicTop{
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        .icon{
            width: .65rem;
            height: .65rem;
            fill: #fff;
        }
        .bgimg{
            width: 100%;
            height: 12rem;
            position: fixed;
            z-index: -2;
            filter: blur(25px);
        }
        .itemLeft{
            width: 3rem;
            height: 100%;
            margin: 0 10px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            span{
                display: inline-block;
                width: 80px;
                height: 100%;
                text-align: center;
                font-size: .5rem;
                font-weight: 600;
                line-height: 69px;
                color:#fff
            }
        }
        .itemRight{
            width: 2rem;
            height: 100%;
            margin: 0 10px;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        .msgTop{
            width: 100%;
            height: 3.5rem;
            position: absolute;
            top: 80px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .bgTop{
                width: 150px;
                height: 150px;
                border-radius: 10px;
                // z-index: 1;
            }
            .msgRight{
                width: 50%;
                height: 100%;
                // background-color: #ccc;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .top1{
                    font-size: 15px;
                    font-weight: 200;
                    color: #fff;
                }
                
                .two{
                    display: flex;
                    align-items: center;
                    .smallImg{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    margin-right: 10px;
                    }
                    .nickname{
                        color: #fff;
                    }
                }
                .top2{
                    overflow: hidden;
                    width: 100%;
                    height: 37px;
                    color: azure;
                }
            }
        }
        #iconItemList{
            position: absolute;
            top:250px;
            margin-top: .2rem;
            width: 100%;
            height: 2rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .icon{
                height: .6rem;
                width: .6rem;
            }
            .iconItem{
                width: 25%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                span{
                    color: #fff;
                }
            }
        }
        
    }
</style>