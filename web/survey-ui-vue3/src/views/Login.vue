<template>
  <div>
    <h2>
      知识竞答 <br />
      凝聚推动集团发展合力
    </h2>
  </div>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item label="身份证号码" name="id">
      <a-input v-model:value="formState.id" aria-placeholder="身份证号码" />
    </a-form-item>
    <a-form-item label="密码" name="password">
      <a-input v-model:value="formState.password" aria-placeholder="密码" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="submitForm()">oauth登录</a-button>
      <a-button type="primary" @click="jwtSubmitForm()">jwt登录</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw, ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../api/rest";
export default defineComponent({
  setup() {
    const formRef = ref();

    const formState = reactive({
      id: "",
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

    const { push } = useRouter();
    const jwtSubmitForm = () => {
      formRef.value.validate().then(async () => {
        await login(toRaw(formState));
        push("/survey/start");
      });
    };
    return {
      formRef,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      formState,
      rules,
      jwtSubmitForm,
    };
  },
  methods: {
    submitForm() {},

    // jwtSubmitForm() {
    //   this.formRef.value.validate().then(() => {
    //     login(toRaw(this.formState));
    //   });
    // },
  },
});
</script>
