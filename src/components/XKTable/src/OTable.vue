<template>
  <BasicTable
    @register="registerTable"
    :rowSelection="{ ...rowSelectionOptions }"
    :buttonList="{ tableButtonList }"
    @fetch-success="fetchSuccess"
    @row-click="rowClick"
  >
    <template #headerTop>
      <a-alert type="info" show-icon v-if="checkedKeys.length > 0">
        <template #message>
          <span>已选中{{ checkedKeys.length }}条记录(可跨页)</span>
          <a-button type="link" @click="checkedKeys = []" size="small">清空</a-button>
        </template>
      </a-alert>
    </template>
    <template #tableSummary>
      <div
        v-if="tableSummary.show"
        style="
          background: #0960bd;
          color: #fff;
          padding: 5px 10px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        "
      >
        <div style="margin-right: 10px">合计</div>
        <div v-for="item in tableSummary.options" :key="item.field">
          <span v-if="item.field" style="margin-right: 20px"
            >{{ item.title }}：{{
              item.formatter
                ? item.formatter(tableDataSum[item.field])
                : tableDataSum[item.field] || ''
            }}</span
          >
        </div>
      </div>
    </template>
    <template #opearButtonAction="{ record }">
      <TableAction
        :actions="getOpearButtonActionList(record)"
        :dropDownActions="getOpearButtonDropMenuList(record)"
      />
    </template>
    <template #toolbar>
      <div v-if="checkedKeys.length > 0">
        <a-button
          style="margin-right: 5px"
          v-for="item in pageSelectButtonList"
          :type="item.type || 'primary'"
          @click="item.clickFunc"
          >{{ item.label }}</a-button
        >
      </div>
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, ColumnChangeParam, TableAction } from '/@/components/Table';
  import { Alert } from 'ant-design-vue';
  import { tableSummaryType } from './types';
  export default defineComponent({
    components: { BasicTable, AAlert: Alert, TableAction },
    props: {
      title: {
        type: String,
        default: '',
      },
      getFormConfig: {
        type: [Function, Array],
        default: () => [],
      },
      tableButtonList: {
        //页面操作按钮
        type: Array,
        default: [],
      },
      pageSelectButtonList: {
        //选择的数据后展示的按钮
        type: Array,
        default: [],
      },
      columns: {
        type: Array,
        default: [],
      },
      api: {
        type: String,
        default: [],
        required: true,
      },
      opearButton: {
        //列表操作按钮
        type: Object,
        default: {
          state: false,
          actions: [],
          menus: [],
        },
      },
      rowKey: {
        type: String,
        default: 'id',
      },
      rowSelectionState: {
        //是否开启单选框/多选框
        type: Boolean,
        default: true,
      },
      //头部筛选结果合计配置
      tableSummary: {
        type: Object as PropType<tableSummaryType>,
        default: () => {
          return {
            show: false, //是否展示
            options: [],
          };
        },
      },
      rowClick: {
        type: Function as PropType<void>,
        defalut: () => {},
      },
    },
    setup(props) {
      const checkedKeys = ref<Array<string | number>>([]);
      const tableButtonList = ref([]);
      const pageSelectButtonList = ref([]);

      const tableDataSum = ref({}); //合计数据
      let _formConfig = [];
      if (props.getFormConfig) {
        if (typeof props.getFormConfig == 'function') {
          _formConfig = props.getFormConfig();
        } else {
          _formConfig = props.getFormConfig;
        }
      }

      let useTableObj = {
        title: props.title,
        api: props.api,
        columns: props.columns,
        useSearchForm: true,
        formConfig: _formConfig,
        showTableSetting: true,
        showIndexColumn: true,
        rowKey: props.rowKey, //列表数据的唯一值
        onColumnsChange: (data: ColumnChangeParam[]) => {
          console.log('ColumnsChanged', data);
        },
      };
      const opearButtonActionList = ref([]);
      const opearButtonDropMenuList = ref([]);

      if (props.opearButton.state) {
        useTableObj['actionColumn'] = {
          width: 160,
          title: '操作',
          dataIndex: 'opearButtonAction',
          slots: { customRender: 'opearButtonAction' },
        };
        opearButtonDropMenuList.value = props.opearButton?.menus || [];
        opearButtonActionList.value = props.opearButton?.actions || [];
      }
      function getOpearButtonDropMenuList(record) {
        let list = [];
        opearButtonDropMenuList.value.forEach((v) => {
          let _obj = {
            label: v.label,
          };
          if (v.isShow) {
            v.ifShow = v.ifShow.bind(null, record);
          }
          if (v.onClick) {
            _obj['onClick'] = v.onClick.bind(null, record);
          }
          if (v.popConfirm) {
            _obj['popConfirm'] = {
              title: v.popConfirm.title,
              confirm: v.popConfirm.confirm.bind(null, record),
            };
          }

          list.push(_obj);
        });
        return list;
      }

      function getOpearButtonActionList(record) {
        let list = [];
        opearButtonActionList.value.forEach((v) => {
          let _obj = {
            label: v.label,
          };
          if (v.onClick) {
            _obj.onClick = v.onClick.bind(null, record);
          }
          if (v.ifShow) {
            _obj.ifShow = v.ifShow.bind(null, record);
          }
          if (v.popConfirm) {
            _obj['popConfirm'] = {
              title: v.popConfirm.title,
              confirm: v.popConfirm.confirm.bind(null, record),
            };
          }

          list.push(_obj);
        });
        return list;
      }
      const [registerTable, { getForm, reload, getRawDataSource }] = useTable(useTableObj);

      function getTBCheckValues() {
        //console.log(getForm().getFieldsValue());
        return checkedKeys.value.map((v) => v);
      }
      function getFromValues() {
        return getForm().getFieldsValue();
      }
      function getTableData() {
        return getRawDataSource().list;
      }
      function reloadTable() {
        return reload();
      }
      function onSelectChange(selectedRowKeys: (string | number)[]) {
        checkedKeys.value = selectedRowKeys;
      }

      function fetchSuccess(data) {
        tableDataSum.value = data;
      }

      tableButtonList.value = props.tableButtonList;
      pageSelectButtonList.value = props.pageSelectButtonList;
      const rowSelectionOptions = {
        type: 'checkbox',
        selectedRowKeys: checkedKeys,
        onChange: onSelectChange,
        state: props.rowSelectionState,
      };
      const rowClick = function (record, idx) {
        if (props.rowClick) {
          props.rowClick(record, idx);
        }
      };
      return {
        registerTable,
        getTBCheckValues, //
        getFromValues, //获取表头搜索的数据
        checkedKeys, //勾选的数据
        onSelectChange, //勾选的数据发生变化回调
        tableButtonList, //页面自定义按钮
        getOpearButtonActionList, //操作栏 按钮
        getOpearButtonDropMenuList, //操作栏 按钮的下拉列表
        rowSelectionOptions, // 列表的选择栏方式(radio，checkbox)
        getTableData, //获取数据
        reloadTable, //刷新表格
        pageSelectButtonList,
        fetchSuccess,
        tableDataSum,
        rowClick,
      };
    },
  });
</script>
