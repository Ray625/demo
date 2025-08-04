<template>
  <div class="product-basic__container">
    <div class="product-basic__header">
      <h6 class="product-basic__header__title">產品資訊</h6>
    </div>
    <div class="product-basic__input-row">
      <InputLabel
        :ref="inputRefs.productName"
        v-model="products.mainProduct.productName"
        label="品名"
        inputClass="input-product-name"
        placeholder="請輸入產品名稱"
        labelFor="productName"
        :rules="[requiredSelect]"
        :star="true"
      />
      <InputDropdown
        :ref="inputRefs.productClass"
        v-model="products.mainProduct.productClass"
        label="產品分類"
        labelFor="productClass"
        :star="true"
        :rules="[requiredSelectClass]"
        :options="productClass"
      />
    </div>
    <div class="product-basic__input-row">
      <InputLabel
        :ref="inputRefs.amount"
        v-model="products.mainProduct.amount"
        label="數量"
        labelFor="amount"
        placeholder="請輸入產品數量"
        :rules="[requiredSelectNum]"
        :star="true"
      />
      <InputCheckbox
        :ref="inputRefs.shippingMethod"
        v-model="products.mainProduct.shippingMethod"
        label="運送方式"
        labelFor="shippingMethod"
        :options="shippingMethods"
        :rules="[atLeastOneChecked]"
        :star="true"
      />
    </div>
    <div class="product-basic__input-row">
      <InputLabel
        :ref="inputRefs.description"
        v-model="products.mainProduct.description"
        label="產品描述"
        labelFor="description"
        inputClass="input-product-description"
        placeholder="關於產品的敘述"
        autogrow
        :rules="[requiredSelect]"
        :star="true"
      />
    </div>
    <div class="product-basic__input-row">
      <UploadFile
        v-model:moduleValue="products.mainProduct.image"
        label="產品圖片"
        labelFor="productImg"
        :isFileEmpty="isFileEmpty"
      />
    </div>
  </div>
</template>

<script setup>
import InputLabel from "@/views/products/components/InputLabel.vue"
import InputDropdown from "@/views/products/components/InputDropdown.vue"
import InputCheckbox from "@/views/products/components/InputCheckbox.vue"
import UploadFile from "@/views/products/components/UploadFile.vue"
import { ref, computed } from "vue"
import { productClass, shippingMethods } from "@/assets/js/utils/mock"
import useProductStore from "@/stores/ProductStore"
import { storeToRefs } from "pinia"

const productStore = useProductStore()
const { products } = storeToRefs(productStore)

const inputRefs = {
  productName: ref(null),
  productClass: ref(null),
  amount: ref(null),
  description: ref(null),
  shippingMethod: ref(null),
}

const model = defineModel({ type: Object })

const props = defineProps({
  policyIndex: {
    type: Number,
    default: 0,
  },
})

const isFileEmpty = computed(() => {
  return productStore.isImageEmpty()
})

const requiredSelect = (val) => !!val || ""

const requiredSelectNum = (val) => (!!val && /^\d+$/.test(val)) || ""

const requiredSelectClass = (val) => (!!val && val.value !== "") || ""

const atLeastOneChecked = (val) => val.some((item) => item.available) || ""

/**
 * 驗證元件中所有 inputRefs 所代表的欄位是否通過驗證
 * 此函式會遍歷 inputRefs 中所有已綁定的 ref，並執行每個欄位的 `.validate()` 方法，
 * 將驗證結果收集後回傳是否全部通過。
 * @returns {boolean} - 若所有欄位皆通過驗證則回傳 true，否則回傳 false
 */
const validate = () => {
  const results = Object.values(inputRefs).map((refEl) =>
    refEl.value.validate?.()
  )
  return results.every(Boolean)
}

/**
 * 將元件中所有 inputRefs 重置驗證狀態
 */
const resetValidate = () => {
  Object.values(inputRefs).forEach((refEl) => {
    refEl.value?.resetValidate?.()
  })
}

defineExpose({ validate, resetValidate })
</script>
<style scoped lang="scss">
@import "@/assets/scss/mixins/font";

.product-basic {
  &__container {
    width: 100%;
    max-width: 720px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 6px;
    background-color: var(--q-white);
  }

  &__header {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &__title {
      display: flex;
      margin: 0;
      @include font-style(20px, 500);
    }
  }

  &__input-row {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;

    &:deep(.input-product-description) {
      width: 100%;
      min-height: 108px;
    }
  }
}
</style>
