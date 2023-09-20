import { Ref } from 'vue';
import { FormSchema } from '/@/components/Table';
export type xkFormSchema = FormSchema;
export interface setXKModalFormTypes<T> {
  visible: Ref<Boolean>;
  formRef: Ref<HTMLElement | null>;
  getTitle: Ref<String>;
  setModalFormSchema(data?: T): FormSchema[];
  changeVisible(bo: Boolean): void;
  submitSuccess(data: any): void;
  getModalConfig: () => {};
}
