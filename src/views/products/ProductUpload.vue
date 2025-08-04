<template>
  <div class="product-upload__container">
    <ProductBasic ref="productRef" />
    <ProductFooter
      @click-clear-data="handleClearData"
      @click-next-step="handleNextStep"
    />
  </div>
</template>

<script setup>
import ProductBasic from "@/views/products/components/ProductBasic.vue"
import ProductFooter from "@/views/products/components/ProductFooter.vue"
import useNotify from "@/assets/utils/useNotify"
import useProductStore from "@/stores/ProductStore"

import { ref, nextTick } from "vue"

const { showNotify } = useNotify()
const productStore = useProductStore()

const productRef = ref(null)

const handleClearData = () => {
  productStore.resetProduct()
  nextTick(() => {
    productRef.value.resetValidate()
  })
}

const handleNextStep = () => {
  const result = productRef.value.validate()
  if (!result) {
    showNotify({
      message: "請填寫完整的產品資訊",
    })
    return
  }
  alert("接續後續操作...")
}
</script>
<style lang="scss" scoped>
.product-upload__container {
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 32px;
}

@media screen and (min-width: 1024px) {
  .product-upload__container {
    padding: 72px;
  }
}
</style>
