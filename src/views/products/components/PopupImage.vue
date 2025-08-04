<template>
  <div>
    <q-dialog
      v-model="dialogOpen"
      maximized
      transition-show="none"
      transition-hide="none"
    >
      <q-card class="popup-image__container">
        <q-bar class="popup-image__header">
          <q-space />
          <q-btn
            v-close-popup
            class="popup-image__close-btn"
            flat
            :icon="`img:${closeIcon}`"
          />
        </q-bar>
        <q-card-section class="popup-image__body">
          <q-carousel
            v-model="slideIndex"
            arrows
            :prev-icon="`img:${arrowLeft}`"
            :next-icon="`img:${arrowRight}`"
            class="popup-image__carousel"
          >
            <q-carousel-slide
              v-for="(img, index) in props.imgList"
              :key="index"
              :name="index"
              :img-src="img.url"
              class="popup-image__carousel-slide"
            />
          </q-carousel>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import { computed } from "vue"
import closeIcon from "@/assets/images/icons/popup_close.svg"
import arrowLeft from "@/assets/images/icons/arrow_left.svg"
import arrowRight from "@/assets/images/icons/arrow_right.svg"

const props = defineProps({
  imgList: {
    type: Array,
    default: () => [],
  },
  slideIndex: {
    type: Number,
    default: 0,
  },
  dialog: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(["update:dialog", "update:slideIndex"])

const dialogOpen = computed({
  get: () => props.dialog,
  set: (val) => emit("update:dialog", val),
})

const slideIndex = computed({
  get: () => props.slideIndex,
  set: (val) => emit("update:slideIndex", val),
})
</script>
<style lang="scss" scoped>
.popup-image {
  &__container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background-color: #00000099;
    padding: 20px;
    height: 100%;
  }

  &__header {
    background-color: transparent;
  }

  &__close-btn {
    width: 24px;
    height: 25px;
  }

  &__body {
    height: 100%;
  }

  &__carousel {
    height: 100%;
    background-color: transparent;

    &:deep(.q-panel) {
      margin: 0 auto;
    }

    &:deep(.q-carousel__prev-arrow) {
      left: 2%;
    }

    &:deep(.q-carousel__next-arrow) {
      right: 2%;
    }

    &:deep(.q-btn) {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #00000080;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }

  &__carousel-slide {
    margin: 0 auto;
    background-size: contain;
    background-repeat: no-repeat;
  }
}

@media screen and (min-width: 1024px) {
  .popup-image__carousel {
    &:deep(.q-carousel__prev-arrow) {
      left: 10%;
    }

    &:deep(.q-carousel__next-arrow) {
      right: 10%;
    }

    &:deep(.q-btn) {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #00000080;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
