<template>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 10px;
      width: 100%;
      height: 80vh;
    "
  >
    <router-link v-for="link in linkList" :key="link.title" :to="link.linkTo">{{
      link.title
    }}</router-link>
  </div>
</template>

<script setup>
const linkList = [
  {
    title: "產品上傳頁",
    linkTo: "/product/Upload",
  },
]
</script>
