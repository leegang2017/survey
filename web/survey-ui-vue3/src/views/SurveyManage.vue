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
    <a-form-item label="问卷名称" name="name">
      <a-input v-model:value="formState.name" aria-placeholder="问卷名称" />
    </a-form-item>
    <div>
      题目编辑
      <a-form-item label="题目编辑">
        <a-input v-model:value="formState.password" aria-placeholder="密码" />
      </a-form-item>
      <a-form-item label="题目编辑">
        <a-input v-model:value="formState.password" aria-placeholder="密码" />
      </a-form-item>
      <a-form-item label="题目编辑">
        <a-input v-model:value="formState.password" aria-placeholder="密码" />
      </a-form-item>
    </div>
    <a-form-item>
      <a-button type="primary" @click="submitForm()">oauth登录</a-button>
      <a-button type="primary" @click="jwtSubmitForm()">jwt登录</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from "vue";
import { getSurvey } from "../api/rest";
import { Survey } from "../api/types";
export default defineComponent({
  setup() {
    const formRef = ref();

    const formState = reactive({
      name: "",
      password: "",
    });
    const rules = {
      name: [
        {
          required: true,
          message: "Please input name",
          trigger: "blur",
        },
      ],
    };

    onMounted(async () => {
      const result = await getSurvey();
      if (result && result.count > 0) {
        const surveys = result.content[0];
      } else {
        // this._message.info("获取题失败");
      }
    });

    return {
      formRef,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      formState,
      rules,
    };
  },
});
</script>
