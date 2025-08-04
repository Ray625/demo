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
    <router-link
      v-for="link in linkList"
      :key="link.title"
      :to="link.linkTo"
      class="entrance__link"
      >{{ link.title }}</router-link
    >
  </div>
</template>

<script setup>
const linkList = [
  {
    title: "上傳產品資訊",
    linkTo: "/product/Upload",
  },
]
</script>
<style lang="scss" scoped>
.entrance__link {
  padding: 12px 24px;
  border-radius: 2px;
  background-color: var(--q-primary);
  color: var(--q-white);
  font-size: 18px;
  text-decoration: none;
}
</style>
