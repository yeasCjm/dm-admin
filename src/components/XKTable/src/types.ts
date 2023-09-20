import { BasicColumn } from '/@/components/Table/src/types/table';

type HeaderTipsFn = () => string | string[];

type HeaderTips = string | string[] | HeaderTipsFn;

export interface TableData {
  title?: string;
  type?: 'checkbox' | 'drag';
  fixed?: 'left' | 'right'; //固定列
  field?: string;
  minWidth?: number;
  width?: number;
  headerTips?: HeaderTips;
  formatter?: (params: any) => any;
  children?: TableData[];
  render?: any;
  align?: 'left' | 'center' | 'right'; //对齐方式
  treeNode?: boolean; //树级表格下，是否是显示图标的那列
}

interface tableButtonType {
  label: String;
  clickFunc: any;
  type?: String;
}
interface opearButtonTypeActions {
  label: String;
  ifShow?: () => Boolean | Boolean;
  onClick?: Function;
  popConfirm?: opearButtonTypePopConfirm[];
}
interface opearButtonTypePopConfirm {
  title: String;
  confirm: void;
}
interface opearButtonTypeMenus {
  label: String;
  isShow?: () => Boolean | Boolean;
  onClick?: void;
  popConfirm?: opearButtonTypePopConfirm[];
}
interface opearButtonType {
  state: Boolean;
  actions?: opearButtonTypeActions[];
  menus?: opearButtonTypeMenus[];
}

export interface tableSummaryType {
  show: boolean;
  options: Array<{
    field: string; //后端字段
    title: string; //展示
    value?: number; //合计数
    formatter?: (value: Number) => any;
  }>;
}
export interface tableConfigObj {
  getFormConfig: any;
  tableButtonList: Array<tableButtonType>;
  columns: BasicColumn[];
  api?: any;
  opearButton: opearButtonType;
  pageSelectButtonList?: Array<tableButtonType>;
  ref?: any;
  reload?: Function;
  tableSummary?: tableSummaryType;
  rowClick?: Function;
}
