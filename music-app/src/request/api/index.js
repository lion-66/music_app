import service from "..";
//  轮播图请求数据
export function getBanner(){
    return service({
        method:'GET',
        url:'/banner?type=2'
    })
}
// 每日歌单
export function getMusicList(){
    return service({
        method:'GET',
        url:'/personalized?limit=10'
    })
}
// 获取搜索歌曲
export function getSearchMusic(id){
    return service({
        method:'GET',
        url:`/search?keywords=${id}`
    })
}
//手机登录/login/cellphone?phone=xxx&password=yyy
export function getLogin(data){
    return service({
        method:'GET',
        url:`/login/cellphone?phone=${data.phone}&password=${data.password}`
    })
}
export function getUsermsg(data){
    return service({
        method:'GET',
        url:`/user/detail?uid=${data}`
    })
}