<template>
  <a-card
    :title="`${(page.pageIndex - 1) * page.pageSize + i + 1} ${
      question.content
    }`"
    v-for="(question, i) in page.content"
    :key="question.id"
  >
    <a-button block v-for="(choice, ci) in question.choices" :key="ci">
      {{ letters[ci] }}、 {{ choice.content }}</a-button
    >
  </a-card>
  <a-pagination
    :total="page.pageTotal"
    :page-size="page.pageSize"
    @change="onPageChange"
  />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getSurvey } from "../api/rest";
import { Survey } from "../api/types";
export default defineComponent({
  setup() {
    const letters = ref([
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "X",
      "Y",
      "Z",
    ]);
    const page = ref({
      pageIndex: 1,
      pageSize: 5,
      pageTotal: 0,
      content: [] as object[],
    });
    let surveyQuestions: object[];
    const randomQuestion = (allQuestions: [object]) => {
      let questions: object[] = [];
      let step = 5;
      const allCount = 50;
      while (questions.length < allCount && allQuestions.length > 0) {
        let start = Math.round(Math.random() * allQuestions.length);
        if (allCount - questions.length < step) {
          step = allCount - questions.length;
        }
        questions = questions.concat(allQuestions.splice(start, step));
      }

      return questions;
    };

    const onPageChange = (current: number, pageSize: number) => {
      page.value.pageIndex = current;
      renderPage();
    };

    const renderPage = () => {
      const start = (page.value.pageIndex - 1) * page.value.pageSize;
      const end = start + page.value.pageSize;
      page.value.content = surveyQuestions.slice(start, end);
    };

    onMounted(async () => {
      const result = await getSurvey();
      if (result && result.count > 0) {
        const surveys = result.content[0];
        surveyQuestions = randomQuestion(surveys.questions);
        page.value.pageTotal = surveyQuestions.length;
        renderPage();
      } else {
        // this._message.info("获取题失败");
      }
    });

    return {
      letters,
      page,
      onPageChange,
    };
  },
});
</script>
