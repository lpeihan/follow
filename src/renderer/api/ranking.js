import request from '@/utils/request';

export function getRanking() {
  return request({
    url: '/toplist/detail'
  });
}
