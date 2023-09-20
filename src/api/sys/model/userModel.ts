/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  login_name: string;
  passwd: string;
  uuid: string;
  verify: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  token: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  id: string | number;
  // 用户名
  login_name: string;
  // 真实名字
  true_name: string;
  // 头像
  avatar?: string;
  // 介绍
  desc?: string;
  //创建时间
  create_time: number;
  //角色
  role: number;
  //更新时间
  update_time: number;
}
