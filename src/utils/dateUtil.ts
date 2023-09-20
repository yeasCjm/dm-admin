/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import moment, { unitOfTime } from 'moment';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_TIME_FORMAT_HMS = 'HH时mm分ss秒';
const DATE_TIME_FORMAT_HM = 'HH时mm分';
//时间戳转日期
export function formatToDateTime(
  date: moment.MomentInput = undefined,
  format = DATE_TIME_FORMAT,
): string {
  if (!date || date == 0) return ``;
  let t_date = Number(date);
  if (String(date).length <= 10) {
    t_date *= 1000;
  }
  return moment(t_date).format(format);
}

export function formatToDate(date: moment.MomentInput = undefined, format = DATE_FORMAT): string {
  if (!date || date == 0) return ``;

  return moment(date * 1000).format(format);
}

export function momentToDateStampBegin(
  date: moment.MomentInput = undefined,
  formatType: Boolean = false,
): string {
  if (!date) return ``;
  if (formatType) {
    return moment(date).format('X');
  } else {
    return moment(date).startOf('day').format('X');
  }
}
export function momentToDateStampEnd(
  date: moment.MomentInput = undefined,
  formatType = false,
): string {
  if (!date || date == 0) return ``;
  if (formatType) {
    return moment(date).format('X');
  } else {
    return moment(date).endOf('day').format('X');
  }
}

//获取 “时间单位的开头"
export function getStartOf(unit?: unitOfTime.StartOf, format?: string) {
  if (!unit) unit = 'day';
  if (!format) format = DATE_TIME_FORMAT;
  return moment().startOf(unit);
}
//获取“时间单位的结束"
export function getEndOf(unit?: unitOfTime.StartOf, format?: string) {
  if (!unit) unit = 'day';
  if (!format) format = DATE_TIME_FORMAT;
  return moment().endOf(unit);
}

export function getStartEndMonthDate(
  subtract_start: number,
  subtract_end: number,
  format?: string,
) {
  if (!format) format = DATE_TIME_FORMAT;
  return [
    moment(new Date()).subtract(subtract_start, 'months').startOf('month'),
    moment(new Date()).subtract(subtract_end, 'months').endOf('month'),
  ];
}

//转时分秒
export function formatToHMS(date: moment.MomentInput = undefined, type: number = 0): string {
  if (!date || date == 0) return ``;
  let formattype = DATE_TIME_FORMAT_HMS;
  return moment
    .utc(date * 1000)
    .format(formattype)
    .replace(/00时|00分|00秒/gi, '');
}
//两个日期之间的所有日期
export function enumerateDaysBetweenDates(startDate, endDate) {
  let daysList = [];
  const start = moment(startDate * 1000);
  const end = moment(endDate * 1000);
  const day = end.diff(start, 'days');
  daysList.push(start.format('YYYY-MM-DD'));
  for (let i = 1; i <= day; i++) {
    daysList.push(start.add(1, 'days').format('YYYY-MM-DD'));
  }
  return daysList;
}

//项目中 所有的以分展示的数据都要处理 /60
export function programToMin(date: number): number {
  if (!date || date == 0) return 0;
  return Math.floor(date / 60);
}
//处理搜索项的 时间戳转换
export function tarnsformSearchDate(
  params: any,
  config = { key: 'date', start: 'start', end: 'end' },
): any {
  if (params[config.key]) {
    params[config.start] = Number(
      momentToDateStampBegin(params[config.key][0], params[config.key][0].length != 19),
    );
    params[config.end] = Number(
      momentToDateStampEnd(params[config.key][1], params[config.key][1].length != 19),
    );
  }
  delete params[config.key];
  return params;
}
export const dateUtil = moment;
