<template>
  <a-modal
    v-model:visible="isEditModelVisible"
    :title="title"
    @ok="handleOk"
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
      <a-form-item class="center">
        <a-space>
          <a-button type="primary" @click="submitForm()">保存</a-button>
        </a-space>
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
      required: false,
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

    const handleOk = (e: MouseEvent) => {
      context.emit("update:visible", false);
    };

    const handleCancel = (e: MouseEvent) => {
      context.emit("update:visible", false);
    };

    const formRef = ref();
    const formState = reactive({
      user: "",
      password: "",
    });
    const rules = {
      id: [
        {
          required: true,
          message: "Please input id",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "Please input password",
          trigger: "blur",
        },
        { min: 3, message: "Length should be at least 3", trigger: "blur" },
      ],
    };

    const submitForm = () => {
      formRef.value.validate().then(async () => {
        await saveUser(toRaw(formState));
        context.emit("update:visible", false);
      });
    };

    return {
      isEditModelVisible,
      handleOk,
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