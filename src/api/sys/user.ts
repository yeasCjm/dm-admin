import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/user/login',
  Logout = '/logout',
  GetUserInfo = '/agent/info',
  // GetUserInfo = '/basic-api/getUserInfo',
  GetPermCode = '/GetPermCode',
  Captcha = '/agent/captcha',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      isReturnAllResponse: true,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo(params: LoginParams) {
  return defHttp.get<GetUserInfoModel>(
    { url: Api.GetUserInfo, params },
    { errorMessageMode: 'none' },
  );
}
export function getCaptcha() {
  return defHttp.get({ url: Api.Captcha });
}
export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}
