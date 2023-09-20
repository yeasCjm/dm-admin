import { defHttp } from './axios';
import { Result, UploadFileParams } from '/#/axios';
class HttpRequest {
  async post<P extends Recordable, R = any>(url: string, params: P): Promise<Result<R>> {
    return await defHttp.post({
      url: url,
      params,
    });
  }
  async postAll<P extends Recordable, R = any>(url: string, params: P): Promise<Result<R>> {
    return await defHttp.post(
      {
        url: url,
        params,
      },
      {
        isReturnAllResponse: true,
      },
    );
  }
  async get<P extends Recordable, R = any>(url: string, params: P): Promise<Result<R>> {
    return await defHttp.get({
      url: url,
      params,
    });
  }
  async getAll<P extends Recordable, R = any>(url: string, params: P): Promise<Result<R>> {
    return await defHttp.get(
      {
        url: url,
        params,
      },
      {
        isReturnAllResponse: true,
      },
    );
  }
  async getInfo<P extends Recordable, R = any>(url: string, params: P): Promise<Result<R>> {
    return await defHttp.get({
      url: url,
      params,
    });
  }
  async delete<P extends Recordable, R = any>(url: string, params: P): Promise<Result<R>> {
    return await defHttp.delete({
      url: url,
      params,
    });
  }
  async put<P extends Recordable, R = any>(url: string, params: P): Promise<Result<R>> {
    return await defHttp.put({
      url: url,
      params,
    });
  }
  async putAll<P extends Recordable, R = any>(url: string, params: P): Promise<Result<R>> {
    return await defHttp.put(
      {
        url: url,
        params,
      },
      {
        isReturnAllResponse: true,
      },
    );
  }
  async uploadFile<R = any>(url: string, params: UploadFileParams): Promise<Result<R>> {
    return await defHttp.uploadFile(
      {
        url: url,
      },
      params,
    );
  }
  async downloadFile<R = any>(url: string, params: UploadFileParams): Promise<Result<R>> {
    return await defHttp.downloadFile({
      url: url,
      params,
    });
  }
  async request<P extends Recordable, R = any>(url: string, params: P): Promise<Result<R>> {
    return await defHttp.request({
      url: url,
      params,
    });
  }
}
const $http = new HttpRequest();
export default $http;
