import { subsonicRequest } from '@/utils/request'

const subsonicApi = {
    /**
     * 检查连接
     */
    ping: () => subsonicRequest({ url: '/rest/ping' }),
    /**
     * 搜索专辑、歌曲、艺术家
     * @param {Object} params 搜索参数
     * @param {string} params.query 搜索关键词
     * @param {number} [params.artistCount=20] 可选的，返回的艺术家数量，默认20
     * @param {number} [params.artistOffset=0] 可选的，艺术家列表偏移量，用于分页，默认0
     * @param {number} [params.albumCount=20] 可选的，返回的专辑数量，默认20
     * @param {number} [params.albumOffset=0] 可选的，专辑列表偏移量，用于分页，默认0
     * @param {number} [params.songCount=20] 可选的，返回的歌曲数量，默认20
     * @param {number} [params.songOffset=0] 可选的，歌曲列表偏移量，用于分页，默认0
     * @param {string} [params.musicFolderId] 可选的，音乐文件夹ID
     */
    search: (params: object) =>
        subsonicRequest({ url: '/rest/search2', params }),
    /**
     * 根据 id 获取封面
     * @param {Object} params 参数
     * @param {string} params.id 歌曲、专辑、艺术家 id
     * @param {string} [params.size] 可选的，封面大小
     */
    getCoverById: (params: object) =>
        subsonicRequest({
            url: '/rest/getCoverArt',
            params,
            getOriginalURL: true
        }),
    /**
     * 歌曲播放链接
     * @param {Object} params 参数
     * @param {string} params.id 歌曲 id
     * @param {string} [params.maxBitRate] 可选的，最大比特率
     * @param {string} [params.format] 可选的，格式
     * @param {string} [params.timeOffset] 可选的，时间偏移
     * @param {string} [params.size] 可选的，大小
     * @param {string} [params.estimateContentLength] 可选的，估计内容长度
     * @param {string} [params.converted] 可选的，转换
     */
    getStreamUrl: (params: object) =>
        subsonicRequest({
            url: '/rest/stream',
            params,
            getOriginalURL: true
        }),
    /**
     * 获取艺术家的索引列表
     * @param {Object} params 参数
     * @param {string} [params.musicFolderId] 可选的，音乐文件夹 ID
     * @param {string} [params.ifModifiedSince] 可选的，最后修改时间
     */
    getArtistsIndexesList: (params: object) =>
        subsonicRequest({
            url: '/rest/getIndexes',
            params
        }),
    /**
     * 根据id获取艺术家信息，包括传记、图像和相似艺术家
     * @param {Object} params 参数
     * @param {string} params.id 艺术家 ID
     * @param {string} [params.count] 可选的，返回相似艺术家的最大数量
     * @param {string} [params.includeNotPresent] 可选的，是否返回媒体库中不存在的艺术家
     */
    getArtistInfo: (params: object) =>
        subsonicRequest({
            url: '/rest/getArtistInfo',
            params
        })
}

export default subsonicApi
