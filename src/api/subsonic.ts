import { subsonicRequest } from "../utils/request";

const subsonicApi = {
  /**
   * 检查连接
   */
  ping: () => subsonicRequest("/rest/ping"),
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
  search: (params: object) => subsonicRequest("/rest/search2", params),
  /**
   * 根据 id 获取封面
   * @param {Object} params 参数
   * @param {string} params.id 歌曲、专辑、艺术家 id
   * @param {string} [params.size] 可选的，封面大小
   */
  getCoverById: (params: object) =>
    subsonicRequest("/rest/getCoverArt", params),
};

export default subsonicApi;
