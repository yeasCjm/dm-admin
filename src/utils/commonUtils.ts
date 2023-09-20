import { isArray } from 'lodash-es';

//转换数据-下拉框数据
interface transformMapSelectDataType {
  info: Object[] | Object; //数据
  selLabel?: String;
  selValue?: number;
}
export const transformMapSelectData = (data: transformMapSelectDataType): Object[] => {
  const { selLabel = 'name', selValue = 'id', info } = data,
    _info = [];
  if (isArray(info)) {
    info.forEach((v) => {
      _info.push({ label: v[selLabel] || '', value: v[selValue] || 0 });
    });
  } else {
    for (var attr in info) {
      _info.push({ label: info[attr], value: attr });
    }
  }
  return _info;
};
//金钱符
export const moneyFlag = (str: string | number, type: string = '¥'): string => {
  if (!str) return type + 0;
  return `${type} ${str}`;
};
export const toFixed = (num, pow = 2): number => {
  //保留2位小数
  num *= Math.pow(10, pow);
  num = Math.round(num);
  return num / Math.pow(10, pow);
};
//除法运算 保留*位小数
export const calcDivide = (a: number, b: number, isper = true, pow = 2): number | string => {
  if (b == 0 || !b) return toFixed(a, pow);
  if (a == 0 || !a) return 0;
  if (isper) return getNumPer(toFixed((a * 100) / b, pow));
  return toFixed(a / b, pow);
};
//数字转百分号
export const getNumPer = (str: string | number, type: string = '%'): string => {
  if (!str) return `0${type}`;
  return `${str} ${type}`;
};
