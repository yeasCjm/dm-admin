<template>
  <div style="display: flex; justify-content: flex-start; align-items: center">
    <Select
      v-model:value="selectValue"
      style="felx: 0 0 50%"
      :placeholder="selectPlaceholder"
      :options="selectOptions"
      @change="selectChange"
    ></Select>
    <Input v-model:value="inputValue"  @change="inputChange" :type="inputType"></Input>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { Input, Select } from 'ant-design-vue';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';

  interface optionsItem {
    label: string;
    value: string;
  }
  interface selectOpt {
    options: optionsItem[];
    defaultValue?: String;
  }
  export default defineComponent({
    name: 'SelectInput',
    components: { Input, Select },
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
      inputOpts: {
        type: Object,
        default: {
          type:'text'  
        },
      },
    },
    emits: ['change'],
    setup(props, { emit }) {
      const stateData = ref();
      const selectValue = ref<String | null>('');
      const inputValue = ref<String | null>('');

      const { selectOpts, inputOpts } = props;
      console.log(inputOpts)
      const [state] = useRuleFormItem(props, 'value', 'change', stateData);
      const inputChange = (value) => {  
        state.value = [selectValue.value,inputValue.value]
      };
      const inputType = inputOpts?.type ||'text' ;
      console.log(inputType)
      console.log(inputOpts)
      //selecter
      const selectOptions: selectOpt = selectOpts.options;
      selectValue.value = selectOpts?.defaultValue;
      state.value = [selectValue.value, ''];
      const selectPlaceholder = selectOpts?.placeholder || '请选择';
      const selectChange = (value) => {
        state.value = [
          value,
          inputValue.value
        ];
        emit('change', state.value);
      };
      watch(
        () => state.value,
        (newVal) => {
          if (newVal == undefined) {
            inputValue.value = inputOpts?.defaultValue;
            selectValue.value = selectOpts?.defaultValue;
          }
        },
      );
      return {
        selectChange,
        state,
        selectValue,
        selectOptions,
        selectPlaceholder,
        inputValue,
        inputChange,
        inputType,
      };
    },
  });
</script>
