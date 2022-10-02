import { createStore } from 'vuex'
import {getItemLyric} from '@/request/api/item'
import {getLogin} from '@/request/api/index'
export default createStore({
  state: {
        playList:[{//播放列表
          name:'灰色轨迹',
          al:{
            id: 3170026,
            name: "Beyond 24K Gold 金碟至尊精选",
            pic: 7954966627607511,
            picUrl: "https://p2.music.126.net/K_p-jhEvCpP7I4Sqd_QfFw==/7954966627607511.jpg"
          },
          id: 32701152,
          ar:[{
            name:'Beyond'
          }]
          
      }],
      playListIndex:0,//默认下标为零
      isShow:true,//播放显示按钮
      detailShow:false,//播放弹出层
      musicLyric:{},//歌词
      currentTime:0,//当前歌词时间
      duration:0,//歌曲总时长
      isUser:false,//个人中心权限判断
      isFooterMusic:true,//底部组件
      token:'',
      user:{}
  },
  getters: {
  },
  mutations: {
    updateIsShow:function(state,value){
      state.isShow = value
    },
    updatePlayList(state,value){
      state.playList = value
      console.log(state.playList);
    },
    updatePlayListIndex(state,value){
      state.playListIndex = value
    },
    updataDetailShow(state){
      state.detailShow = !state.detailShow
    },
    updataLyric(state,value){
      state.musicLyric = value
    },
    updataCurrentTime(state,value){
      state.currentTime = value
      // console.log(state.currentTime);
    },
    updataDuration(state,value){
      state.duration = value
    },
    pushSearchList(state,value){
      state.playList.push(value)
    },
    updataUser(state,value){
      state.isUser = value
    },
    updataToken(state,value){
      state.token = value
      localStorage.setItem('token',state.token)
      // console.log(state.token)
    },
    updataUserMsg(state,value){
      state.user = value
    }
  },
  actions: {
    getLyric: async function(context,value){
      let res = await getItemLyric(value)
      // console.log(res.data.lrc.lyric)
      context.commit('updataLyric',res.data.lrc)
    },
    getLogin: async function(context,value){
      let res = await getLogin(value)
      return res
    }
  },
  modules: {

  }

})
