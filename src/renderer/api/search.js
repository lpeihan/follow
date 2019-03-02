import request from '@/utils/request';

export function getSearchHot() {
  return request({
    url: '/search/hot'
  });
}

export function getSearchSuggest(keywords) {
  return request({
    url: '/search/suggest',
    params: { keywords }
  });
}

export function getSearchSinger({ keywords, offset = 0, limit = 20 }) {
  return request({
    url: '/search',
    params: {
      keywords,
      type: 100,
      offset,
      limit
    }
  });
}
export function getSearchSongs({ keywords, offset = 0, limit = 20 }) {
  return request({
    url: '/search',
    params: {
      keywords,
      offset,
      limit
    }
  });
}
export function getSearchMusicList({ keywords, offset = 0, limit = 20 }) {
  return request({
    url: '/search',
    params: {
      keywords,
      type: 1000,
      offset,
      limit
    }
  });
}
