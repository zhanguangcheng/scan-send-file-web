<script setup>

import zhCN from 'ant-design-vue/es/locale/zh_CN';
const locale = zhCN
</script>

<template>
  <a-config-provider :locale="locale">
    <RouterView />
  </a-config-provider>
</template>

<style>
body {
  background-color: #F0F2F5 !important;
}
</style>
