<template>
  <a-modal
    v-model:visible="isEditModelVisible"
    :title="title"
    @ok="submitForm"
    :okText="'保存'"
    :cancelText="'取消'"
    @cancel="handleCancel"
  >
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="姓名" name="name">
        <a-input v-model:value="formState.name" aria-placeholder="姓名" />
      </a-form-item>
      <a-form-item label="简称" name="shortName">
        <a-input v-model:value="formState.shortName" aria-placeholder="简称" />
      </a-form-item>
      <a-form-item label="身份证号" name="identityNumber">
        <a-input
          v-model:value="formState.identityNumber"
          aria-placeholder="身份证号"
        />
      </a-form-item>
      <a-form-item label="性别" name="isMale">
        <a-select ref="select" v-model:value="formState.isMale">
          <a-select-option value="true">男</a-select-option>
          <a-select-option value="false">女</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="出生日期" name="dob">
        <a-date-picker v-model:value="formState.dob" />
      </a-form-item>
      <a-form-item label="电话" name="phone">
        <a-input v-model:value="formState.phone" aria-placeholder="电话" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  watch,
  ref,
  UnwrapRef,
  reactive,
  toRaw,
} from "vue";
import { saveUser } from "@/api/rest";
export default defineComponent({
  props: {
    record: {
      type: Object,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },

  setup(props, context) {
    console.log("props", props);
    const isEditModelVisible = ref(false);
    const { record, visible, title } = toRefs(props);

    watch(visible, (newValue, oldValue) => {
      isEditModelVisible.value = newValue;
    });

    // const handleOk = (e: MouseEvent) => {
    //   context.emit("update:visible", false);
    // };

    const handleCancel = (e: MouseEvent) => {
      context.emit("update:visible", false);
    };

    const formRef = ref();
    const formState = reactive({
      name: undefined,
      shortName: undefined,
      identityNumber: undefined,
      isMale: "true",
      dob: undefined,
      phone: undefined,
    });

    watch(record, (newValue: any, oldValue) => {
      formState.name = newValue.name;
      formState.shortName = newValue.shortName;
      formState.identityNumber = newValue.identityNumber;
      formState.isMale = newValue.isMale ? "true" : "false";
      formState.dob = newValue.dob;
      formState.phone = newValue.phone;
    });
    const rules = {
      name: [
        {
          required: true,
          message: "Please input name",
          trigger: "blur",
        },
      ],
      shortName: [
        {
          required: true,
          message: "Please input shortName",
          trigger: "blur",
        },
      ],
      // id: [
      //   {
      //     required: true,
      //     message: "Please input id",
      //     trigger: "blur",
      //   },
      // ],
      identityNumber: [
        {
          required: true,
          message: "Please input identityNumber",
          trigger: "blur",
        },
      ],
      isMale: [
        {
          required: true,
          message: "Please input isMale",
          trigger: "change",
        },
      ],
      dob: [
        {
          required: true,
          message: "Please input dob",
          trigger: "change",
          type: "object",
        },
      ],
      phone: [
        {
          required: true,
          message: "Please input phone",
          trigger: "blur",
        },
      ],
    };

    const submitForm = () => {
      formRef.value.validate().then(async () => {
        console.log("record.value", toRaw(record.value));
        const newRecord = { ...toRaw(record.value), ...toRaw(formState) };
        await saveUser(newRecord);
        context.emit("update:visible", false);
      });
    };

    return {
      isEditModelVisible,
      handleCancel,
      record,
      title,

      formRef,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      formState,
      rules,
      submitForm,
    };
  },
});
</script>