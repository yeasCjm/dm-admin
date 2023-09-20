export interface ITabListType {
  forceRender?: Boolean; // 隐藏时是否渲染 DOM 结构
  key: String; //对应 activeKey
  tab: String; //选项卡头显示文字
  component: Function; //内容组件
}

import XKTabs from './XKTabs.vue';

export { XKTabs };
