<template>
  <q-card class="product-footer__container">
    <div class="product-footer__wrapper">
      <q-card-section class="product-footer__text">
        <span>請至少選擇一種運送方式。相關費用詳見</span>
        <span class="product-footer__popup-text" @click="showPopup = true"
          >貨運費用列表</span
        >
        <span>。</span>
      </q-card-section>

      <q-card-actions class="product-footer__btn-group">
        <q-btn
          label="清除資料"
          class="product-footer__btn"
          outline
          color="primary"
          @click="$emit('click-clear-data')"
        />
        <q-btn
          label="下一步"
          class="product-footer__btn"
          unelevated
          color="primary"
          @click="$emit('click-next-step')"
        />
      </q-card-actions>
    </div>
  </q-card>
  <PopupCompany v-model="showPopup" />
</template>
<script setup>
import { ref } from "vue"
import PopupCompany from "@/views/products/components/PopupCompany.vue"

const showPopup = ref(false)

defineEmits(["click-next-step", "click-clear-data"])
</script>
<style scoped lang="scss">
@import "@/assets/scss/mixins/font.scss";

.product-footer {
  &__container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: fit-content;
    padding: 24px 40px;
    box-shadow: 0px -5px 10px 0px #00000008;
  }

  &__wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 944px;
    margin: 0 auto;
  }

  &__text {
    max-width: 500px;
    width: fit-content;
    @include font-style(16px, 400, 1.5);
  }

  &__popup-text {
    color: var(--q-primary);
    text-decoration: underline;
  }

  &__btn-group {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    gap: 10px;
    margin-left: 16px;
    padding: 0;
  }

  &__btn {
    width: fit-content;
    height: 36px;
    padding: 0 16px;
    white-space: nowrap;
    @include font-style(16px, 500, 1.5);
  }
}

@media screen and (min-width: 1024px) {
  .product-footer {
    &__popup-text {
      cursor: pointer;
    }

    &__btn {
      width: fit-content;
      height: 44px;
      padding: 0 24px;
      @include font-style(18px, 500, 1.5);
    }
  }
}
</style>
