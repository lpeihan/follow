import request from '@/utils/request';

export function getSong(id) {
  return request({
    url: '/music/url',
    params: { id }
  });
}

export function getLyric(id) {
  return request({
    url: '/lyric',
    params: { id }
  });
}
