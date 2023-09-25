<template>
  <BasicModal
    :title="prop.title"
    :width="prop.width"
    :visible="prop.visible.value"
    centered
    :destroyOnClose="true"
    @ok="methods.submit"
    @cancel="onCancel"
    :cancelText="prop.cancelText"
    :okText="prop.okText"
    @register="onRegister"
    :confirmLoading="confirmLoading"
  >
    <PageWrapper>
      <BasicForm
        @register="register"
        @submit="handleSubmit"
        @submitFinally="submitFinally"
        :showActionButtonGroup="false"
      />
    </PageWrapper>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Modal } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import PageWrapper from '/@/components/Page/src/PageWrapper.vue';
  import { BasicModal, ModalMethods } from '../Modal';

  export default defineComponent({
    name: 'XKFormModalView',
    components: { PageWrapper, BasicForm, Modal, BasicModal },
    props: {
      visible: {
        type: Object,
        default: ref<boolean>(false),
      },
      title: {
        type: String,
        default: '',
      },
      schemas: {
        type: Object,
        default: () => {},
      },
      width: {
        type: Number,
        default: 600,
      },
      submitApi: {
        type: Function,
      },
      beforeSubmit: {
        type: Function,
      },
      okText: {
        type: String,
        default: () => '确认',
      },
      cancelText: {
        type: String,
        default: () => '取消',
      },
    },
    emits: ['submit', 'cancel', 'register', 'setFieldsValue', 'submitFinally'],
    setup(prop, { emit }) {
      const confirmLoading = ref(false);
      const onCancel = (e: MouseEvent) => {
        prop.visible.value = false;
        emit('cancel');
      };
      const [register, methods] = useForm({
        labelWidth: 100,
        schemas: prop.schemas as any,
        actionColOptions: { span: 24 },
      });
      const onRegister = (methods: ModalMethods, uid: number) => {
        emit('register', methods, uid);
      };

      return {
        prop,
        methods,
        onRegister,
        onCancel,
        handleSubmit,
        register,
        confirmLoading,
        submitFinally,
      };
      function handleSubmit(params) {
        confirmLoading.value = true;
        if (prop.beforeSubmit) {
          params = prop.beforeSubmit(params);
        }
        console.log(prop.submitApi);
        if (prop.submitApi) {
          prop.submitApi(params).then((data = {}) => {
            confirmLoading.value = false;
            emit('submit', { params, data });
          });
        } else {
          emit('submit', params);

          confirmLoading.value = false;
        }
      }
      function submitFinally() {
        confirmLoading.value = false;
      }
    },
  });
</script>
 
