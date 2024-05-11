import axios from 'axios';
import { getCookie } from './../utils/Cookies';

const axiosInstanceInterceptor = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST,
});

axiosInstanceInterceptor.interceptors.request.use(
  async (request) => {
    const cookie = await getCookie();

    if (cookie) {
      request.headers['accesstoken'] = cookie.value;
    }

    return request;
  },
  (error) => {
    console.log(error);
  },
);

export { axiosInstanceInterceptor };
