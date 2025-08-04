<template>
  <div ref="containerRef" class="products-img__container">
    <div
      v-for="(src, index) in previewsImages"
      :key="src.name + '-' + src.size"
      class="products-img__wrapper"
    >
      <div class="products-img__card">
        <q-img
          :src="src.url"
          fit="contain"
          class="products-img__card__img"
          @click="handlePopupImage(index)"
        />
        <q-btn
          class="products-img__card__close-btn"
          flat
          @click.stop="$emit('delete-data', index)"
        />
      </div>
    </div>
  </div>
  <PopupImage
    v-model:dialog="showDialog"
    v-model:slideIndex="slideIndex"
    :imgList="previewsImages"
  />
</template>

<script setup>
import { ref, watch, nextTick } from "vue"
import PopupImage from "@/views/products/components/PopupImage.vue"

const previewsImages = ref([])
const containerRef = ref(null)
const slideIndex = ref(0)
const showDialog = ref(false)

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
})

/**
 * 從傳入的 fileArray 中讀取圖片檔案，並產生可用於預覽的圖片 URL
 * @param {Array} fileArray - 含有圖片檔案的 fileArray 陣列
 * 預覽圖片 URL 將會被存入 `previewsImages` ref 中
 * 舊有的圖片 URL 繼續使用，並將不需要的 URL 刪除
 * 最後將container滾動至底部，做出新增圖片將舊圖片往左推的效果
 */
const handleGetImages = (fileArray) => {
  const oldPreviews = previewsImages.value
  const newPreviews = []

  fileArray.forEach((file) => {
    const existing = oldPreviews.find(
      (p) => p.name === file.name && p.size === file.size
    )
    if (existing) {
      newPreviews.push(existing)
    } else {
      const url = URL.createObjectURL(file)
      newPreviews.push({ url, name: file.name, size: file.size })
    }
  })

  // 釋放不再使用的 URL
  oldPreviews.forEach((p) => {
    if (!newPreviews.some((np) => np.name === p.name && np.size === p.size)) {
      URL.revokeObjectURL(p.url)
    }
  })

  previewsImages.value = newPreviews

  nextTick(() => {
    if (containerRef.value) {
      containerRef.value.scrollLeft = containerRef.value.scrollWidth
    }
  })
}

/**
 * 依照點擊的圖片，開啟LightBox，放大顯示圖片
 * @param {number} index - 要打開的img index
 */
const handlePopupImage = (index) => {
  showDialog.value = true
  slideIndex.value = index
}

defineEmits(["delete-data"])

watch(
  () => props.images,
  (newVal) => {
    if (newVal instanceof Array && newVal.length > 0) {
      handleGetImages(newVal)
    } else {
      previewsImages.value = []
    }
  },
  { immediate: true }
)
</script>
<style scoped lang="scss">
@import "@/assets/scss/mixins/font";

.products-img {
  &__container {
    display: flex;
    gap: 16px;
    width: fit-content;
    max-width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 8px;
    margin-bottom: -8px;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: white;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: var(--q-primary);
      border-radius: 100px;
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    width: fit-content;
    height: fit-content;
  }

  &__card {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 152px;
    height: 200px;
    padding: 8px;
    background-color: var(--q-white);
    border-radius: 6px;
    border: 1px solid var(--q-primary);

    &__img {
      width: 100%;
      height: 100%;
    }

    &__close-btn {
      width: 120px;
      height: 24px;
      min-height: 24px;
      background-image: url("@/assets/images/icons/trash.png");
      background-position: center;
      background-repeat: no-repeat;
      background-size: 18px 18px;
      margin: 0;
      padding: 0;
    }
  }
}

@media screen and (min-width: 1024px) {
  .products-img__card__img:hover {
    cursor: pointer;
  }
}
</style>
