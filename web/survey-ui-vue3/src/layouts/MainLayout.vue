<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu
        theme="dark"
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
      >
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>竞赛管理</span>
            </span>
          </template>
          <router-link to="/survey/start"
            ><a-menu-item key="1"> 开始竞赛</a-menu-item></router-link
          >
          <router-link to="/survey/manage"
            ><a-menu-item key="2"> 题库管理</a-menu-item></router-link
          >
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <user-outlined />
              <span>人员管理</span>
            </span>
          </template>
          <router-link to="/user/list"
            ><a-menu-item key="3"> 人员信息</a-menu-item></router-link
          >
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <template #title>
            <span>
              <user-outlined />
              <span>系统管理</span>
            </span>
          </template>
          <a-menu-item key="4"> 角色管理</a-menu-item>
          <a-menu-item key="5"> 成员角色管理</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header />
      <a-layout-content>
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { UserOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import { RouterView } from "vue-router";
export default defineComponent({
  components: {
    UserOutlined,
    RouterView,
  },
  data() {
    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(["1"]),
      openKeys: ref<string[]>(["sub1"]),
    };
  },
});
</script>
