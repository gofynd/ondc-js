import axios, { AxiosResponse, AxiosInstance, ResponseType } from "axios";

import { transformRequestOptions } from "./utils";
import { addSignature } from "./interseptors";

axios.defaults.withCredentials = false;
axios.defaults.timeout = 300000; // 5 minute

axios.interceptors.request.use(addSignature);

interface Options {
  headers?: object;
  params?: object;
  data?: object;
  responseType?: ResponseType;
}

class ApiEngine {
  axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  head(url: string, opt: Options = {}, config = {}): Promise<AxiosResponse<any>> {
    return this.axiosInstance.head(url, {
      headers: opt.headers,
      params: opt.params,
      responseType: opt.responseType,
      paramsSerializer: (params) => {
        return transformRequestOptions(params);
      },
      ...config,
    });
  }

  get(url: string, opt: Options = {}, config = {}): Promise<AxiosResponse<any>> {
    return this.axiosInstance.get(url, {
      params: opt.params,
      headers: opt.headers,
      responseType: opt.responseType,
      paramsSerializer: (params) => {
        return transformRequestOptions(params);
      },
      ...config,
    });
  }

  post(url: string, opt: Options = {}, config = {}): Promise<AxiosResponse<any>> {
    return this.axiosInstance.post(url, opt.data, {
      headers: opt.headers,
      params: opt.params,
      responseType: opt.responseType,
      ...config,
    });
  }

  put(url: string, opt: Options = {}, config = {}): Promise<AxiosResponse<any>> {
    return this.axiosInstance.put(url, opt.data, {
      headers: opt.headers,
      params: opt.params,
      responseType: opt.responseType,
      ...config,
    });
  }

  patch(url: string, opt: Options = {}, config = {}): Promise<AxiosResponse<any>> {
    return this.axiosInstance.patch(url, opt.data, {
      headers: opt.headers,
      params: opt.params,
      responseType: opt.responseType,
      ...config,
    });
  }

  del(url: string, opt: Options = {}, config = {}): Promise<AxiosResponse<any>> {
    return this.axiosInstance.delete(url, {
      data: opt.data,
      headers: opt.headers,
      params: opt.params,
      responseType: opt.responseType,
      ...config,
    });
  }
}

export default new ApiEngine(axios);
