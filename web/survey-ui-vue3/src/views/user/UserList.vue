<template>
  <a-table :columns="columns" :data-source="page.content">
    <template #isMale="{ text }">
      <span>
        {{ text ? "男" : "女" }}
      </span>
    </template>
    <template #action="{ record }">
      <span>
        <a @click="edit(record)">查看</a>
      </span>
    </template>
  </a-table>
  <UserEditModel
    v-model:visible="isEditModelVisible"
    :record="record"
    :title="editModelTitle"
  >
  </UserEditModel>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { searchUser } from "@/api/rest";
import UserEditModel from "@/views/user/UserEditModel.vue";
export default defineComponent({
  components: { UserEditModel },
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
        slots: { customRender: "isMale" },
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
    const isEditModelVisible = ref(false);
    const record = ref();
    const editModelTitle = ref("");
    const page = ref({
      page: 1,
      pageSize: 5,
      count: 0,
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

    const edit = (editRecord = null) => {
      isEditModelVisible.value = true;
      record.value = editRecord;
      editModelTitle.value = "编辑";
    };

    onMounted(async () => {
      refreshData();
    });

    return {
      columns,
      page,
      isEditModelVisible,
      record,
      onPageChange,
      edit,
      editModelTitle,
    };
  },
});
</script>
