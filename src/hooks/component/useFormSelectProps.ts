// 普通下拉框
export interface IOptionsProps {
  selectData?: Recordable[];
  lableField?: string;
  valueField?: string;
  isModel?: boolean; //是否弹出层中显示
}
export interface IPropsType extends IOptionsProps {
  otherComponentProps?: Recordable; //其他props 合并返回
}
export function getUseFormSelectOptions(opt: IOptionsProps) {
  return opt.selectData?.map((v) => ({
    label: v[opt.lableField || 'label'],
    value: v[opt.valueField || 'value'],
    disabled: v['disabled'] || false,
  }));
}

//单选下拉框componentProps
export function useFormSelectProps(opt: IPropsType): Recordable {
  let returnProps = {
    options: getUseFormSelectOptions({
      selectData: opt.selectData,
      lableField: opt.lableField,
      valueField: opt.valueField,
    }),
    treeNodeFilterProp: 'label', //搜索匹配字段
    maxTagCount: 3, //最多显示几个tag
    optionLabelProp: 'label', //显示匹配
    optionFilterProp: 'label', //搜索时过滤对应的 option 属性，不支持 children
    showSearch: true,
    dropdownStyle: {
      //下拉框样式
      maxHeight: '300px',
      overflow: 'auto',
    },
    // onChange: (value) => {
    //选择回调
    // console.log(value);
    // },
  };
  if (opt.isModel) {
    returnProps['getPopupContainer'] = (triggerNode) => {
      // console.log(triggerNode);
      return document.getElementsByClassName('ant-modal-body')[0];
      //弹出层中渲染时定位不准确且被遮挡
      return triggerNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        .parentNode.parentNode;
    };
  }
  if (opt.otherComponentProps) returnProps = { ...returnProps, ...opt.otherComponentProps };
  return returnProps;
}

//多选下拉框componentProps
export function useFormSelectPropsMultiple(opt: IPropsType): Recordable {
  return useFormSelectProps({
    selectData: opt.selectData,
    lableField: opt.lableField,
    valueField: opt.valueField,
    isModel: opt.isModel,
    otherComponentProps: {
      mode: 'multiple', //多选模式
      maxTagCount: 3, //最多显示几个tag
      ...opt.otherComponentProps,
    },
  });
}
