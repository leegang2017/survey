<template>
  <a-table :columns="columns" :data-source="data">
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #customTitle>
      <span>
        <smile-outlined />
        Name
      </span>
    </template>
    <template #tags="{ text: tags }">
      <span>
        <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="
            tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'
          "
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
    </template>
    <template #action="{ record }">
      <span>
        <a>Invite 一 {{ record.name }}</a>
        <a-divider type="vertical" />
        <a>Delete</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link">
          More actions
          <down-outlined />
        </a>
      </span>
    </template>
  </a-table>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { searchUser } from "@/api/rest";
export default defineComponent({
  setup() {
    const columns = ref([
      {
        dataIndex: "name",
        key: "name",
        title: "姓名",
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "性别",
        dataIndex: "isMale",
        key: "isMale",
      },
      {
        title: "简称",
        key: "shortName",
        dataIndex: "shortName",
      },
      {
        title: "身份证号",
        key: "identityNumber",
        dataIndex: "identityNumber",
      },
      {
        title: "联系电话",
        key: "phone",
        dataIndex: "phone",
      },
      {
        title: "操作",
        key: "action",
        slots: { customRender: "action" },
      },
    ]);
    const page = ref({
      page: 1,
      pageSize: 5,
      pageTotal: 0,
      content: [] as object[],
    });

    const searchParams = ref({
      eqs: {},
      likes: {},
      times: {},
    });

    const onPageChange = (current: number, pageSize: number) => {
      page.value.page = current;
      refreshData();
    };

    const refreshData = async () => {
      const pageValue = page.value;
      const result = await searchUser(searchParams.value, {
        page: pageValue.page,
        pageSize: pageValue.pageSize,
      });
      if (result && result.count > 0) {
        page.value = result;
      } else {
        // this._message.info("获取题失败");
      }
    };

    onMounted(async () => {
      refreshData();
    });

    return {
      columns,
      page,
      onPageChange,
    };
  },
});
</script>
