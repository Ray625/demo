<template>
  <q-dialog v-model="popupOpen">
    <q-card class="popup-info__container">
      <q-card-section class="popup-info__title-wrapper">
        <h6 class="popup-info__title">貨運費用列表</h6>
        <q-space />
        <q-btn
          v-close-popup
          class="popup-info__close-btn"
          :icon="`img:${closeIcon}`"
          flat
        />
      </q-card-section>
      <q-card-section class="popup-info__text">
        <q-table
          flat
          bordered
          :rows="rows"
          :columns="columns"
          row-key="name"
          :rows-per-page-options="[0]"
          hide-bottom
          table-class="popup-info__table"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { computed } from "vue"
import closeIcon from "@/assets/images/icons/popup_close_dark.svg"

const columns = [
  {
    name: "company",
    label: "公司名稱",
    align: "center",
    field: "company",
  },
  {
    name: "fee",
    label: "運送費用",
    align: "center",
    field: "fee",
  },
]

const rows = [
  {
    company: "白狗宅急便",
    fee: "100元",
  },
  {
    company: "台北物流",
    fee: "95元",
  },
  {
    company: "豬皮店到店",
    fee: "55元",
  },
  {
    company: "6-12",
    fee: "65元",
  },
  {
    company: "我家便利商店",
    fee: "70元",
  },
]

const props = defineProps({
  popup: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(["update:popup"])

const popupOpen = computed({
  get: () => props.popup,
  set: (val) => emit("update:popup", val),
})
</script>
<style scoped lang="scss">
@import "@/assets/scss/mixins/font.scss";

.popup-info {
  &__container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 550px;
    padding: 20px;
    border-radius: 8px;
    height: fit-content;
  }

  &__title-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
  }

  &__title {
    margin: 0;
    padding: 0;
    @include font-style(24px, 500, 1.5);
  }

  &__close-btn {
    width: 24px;
    height: 24px;
  }

  &__text {
    width: 100%;
    height: fit-content;
    margin: 0;
    padding: 0;
  }

  &__table {
    width: 100%;
  }
}

:deep(.q-table) {
  thead tr {
    height: 40px;
  }
  th {
    width: 50%;
    height: 40px;
    padding: 8px;
    @include font-style(16px, 500, 1.5);
    border: 1px solid var(--q-font-grey);
    border-top: none;
    border-right: none;
    background-color: var(--q-light-grey);

    &:first-of-type {
      border-left: none;
    }
  }
  tr {
    td {
      height: 40px;
      padding: 8px;
      @include font-style(16px, 400, 1.5);
      border: 1px solid var(--q-font-grey);
      border-top: none;
      border-right: none;
      &:first-of-type {
        border-left: none;
      }
    }

    &:nth-of-type(2n) {
      td {
        background-color: var(--q-secondary);
      }
    }

    &:last-of-type {
      td {
        border-bottom: none;
      }
    }

    &:hover {
      td::before {
        display: none;
      }
    }
  }
}
</style>
