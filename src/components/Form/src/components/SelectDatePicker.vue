<template>
  <div style="display: flex; justify-content: flex-start; align-items: center">
    <Select
      v-model:value="selectValue"
      style="felx: 0 0 50%"
      :placeholder="selectPlaceholder"
      :options="selectOptions"
      @change="selectChange"
    ></Select>
    <RangePicker
      style="width: 100%"
      v-model:value="dateValue"
      @change="dateChange"
      :show-time="showTime"
    >
    </RangePicker>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { DatePicker, Select } from 'ant-design-vue';
  import { Moment } from 'moment';
  import { momentToDateStampBegin, momentToDateStampEnd } from '/@/utils/dateUtil';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';

  interface optionsItem {
    label: string;
    value: string;
  }
  interface selectOpt {
    options: optionsItem[];
    defaultValue?: String;
  }
  interface datePickerOpt {
    showTime: Boolean;
  }
  export default defineComponent({
    name: 'SelectDatePicker',
    components: { RangePicker: DatePicker.RangePicker, Select },
    props: {
      value: {
        type: Object,
      },
      selectOpts: {
        type: Object,
        default: {
          options: [],
        },
      },
      datePickerOpts: {
        type: Object,
        default: {
          showTime: true,
        },
      },
    },
    emits: ['change'],
    setup(props, { emit }) {
      const stateData = ref();
      const selectValue = ref<String | null>('');
      const dateValue = ref<String[]>([]);

      const { selectOpts, datePickerOpts } = props;
      const [state] = useRuleFormItem(props, 'value', 'change', stateData);

      //datePicker
      const datePickerOptions: datePickerOpt = datePickerOpts;
      const showTime: Boolean = datePickerOptions?.showTime;
      const dateChange = (val: Moment[]) => {
        state.value = [
          selectValue.value,
          momentToDateStampBegin(val[0], showTime),
          momentToDateStampEnd(val[1], showTime),
        ];
        emit('change', state.value);
      };

      //selecter
      const selectOptions: selectOpt = selectOpts.options;
      selectValue.value = selectOpts?.defaultValue;
      state.value = [selectValue.value, '', ''];
      const selectPlaceholder = selectOpts?.placeholder || '请选择';
      const selectChange = (value) => {
        state.value = [
          value,
          momentToDateStampBegin(dateValue.value[0], showTime),
          momentToDateStampBegin(dateValue.value[1], showTime),
        ];
        emit('change', state.value);
      };
      watch(
        () => state.value,
        (newVal) => {
          if (newVal == undefined) {
            dateValue.value = datePickerOptions?.defaultValue;
            selectValue.value = selectOpts?.defaultValue;
          }
        },
      );
      return {
        dateChange,
        showTime,
        selectChange,
        state,
        dateValue,
        selectValue,
        selectOptions,
        selectPlaceholder,
      };
    },
  });
</script>
