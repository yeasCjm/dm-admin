<template>
  <Tabs v-bind="attrs" @change="handleChange" @tabClick="handleClick" v-model:activeKey="active">
    <template v-for="pane in tabList" :key="pane.key">
      <TabPane v-bind="pane">
        <component :is="pane.component" />
      </TabPane>
    </template>
  </Tabs>
</template>
<script setup lang="tsx">
  import { ref } from 'vue';
  import { Tabs } from 'ant-design-vue';
  import { useAttrs } from '/@/hooks/core/useAttrs';
  import { ITabListType } from '.';

  const props = defineProps({
    activeKey: {
      //默认选中
      type: String,
      default: '1',
    },
    tabList: {
      type: Array as PropType<ITabListType[]>,
      required: true,
      default: () => [],
    },
  });
  const emits = defineEmits(['changeTab', 'clickTab']);

  const TabPane = Tabs.TabPane;
  const attrs = useAttrs();
  const active = ref(props.activeKey);

  const handleChange = (activeKey) => {
    emits('changeTab', activeKey);
  };
  const handleClick = () => {
    emits('clickTab');
  };
</script>
<style scoped lang="less">
  :deep(.ant-tabs-content) {
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
</style>
