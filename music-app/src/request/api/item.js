import service from "..";
// 获取歌单详情页的数据
export function getMusicItemList(id){
    return service({
        method:'GET',
        url:`/playlist/detail?id=${id}`
    })
}
// 获取歌单的所有数据
export function getItemList(data){
    return service({
        method:'GET',
        url:`/playlist/track/all?id=${data}&limit=200&offset=0`
    })
}
//获取歌词数据
export function getItemLyric(id){
    return service({
        method:'GET',
        url:`/lyric?id=${id}`
    })
}
