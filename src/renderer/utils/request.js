import axios from 'axios';

const CODE_OK = 200;

const request = axios.create({
  baseURL: 'http://47.98.144.117:3000/',
  timeout: 5000,
  params: {},
  _loading: false, // 是否显示 loading
  _toast: true // 报错后是否显示 toast
});

request.interceptors.request.use(
  config => config,
  (err) => {
    Promise.reject(err);
  }
);

request.interceptors.response.use(
  (res) => {
    // success
    if (res.data.code === CODE_OK) {
      return res.data;
    }

    return Promise.reject(res.data);
  },
  (err) => {
    // 请求超时处理
    if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') > -1) {
      // todo
    }

    return Promise.reject(err);
  }
);

export default request;
