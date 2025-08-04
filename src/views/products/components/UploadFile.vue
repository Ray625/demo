<template>
  <div class="uploader__container">
    <label :for="props.labelFor">{{ props.label }}</label>
    <div class="uploader__field">
      <ProductImage
        v-if="!props.isFileEmpty"
        :images="props.moduleValue"
        @delete-data="handeleDeleteImage"
      />
      <div
        class="uploader__wrapper"
        :class="{
          'uploader__wrapper--full': !props.isFileEmpty,
        }"
      >
        <q-file
          :model-value="props.moduleValue"
          class="uploader__input"
          borderless
          append
          :accept="accept"
          :for="props.labelFor"
          :multiple="props.multiple"
          :name="props.name"
          @update:model-value="handleGetImages"
        />
        <div class="uploader__label">
          <p v-if="props.isFileEmpty" class="uploader__label__text">
            點擊上傳圖片
          </p>
          <div v-if="!props.isFileEmpty" class="uploader__label__btn">+</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductImage from "@/views/products/components/ProductImage.vue"
import { computed } from "vue"

const props = defineProps({
  moduleValue: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    required: true,
  },
  labelFor: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: "files",
  },
  ext: {
    type: Array,
    default: () => ["jpeg", "jpg", "png"],
  },
  multiple: {
    type: Boolean,
    default: true,
  },
  isFileEmpty: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(["update:moduleValue"])

const handleGetImages = (val) => {
  emit("update:moduleValue", val)
}

const handeleDeleteImage = (index) => {
  const updatedImages = props.moduleValue.filter((_, i) => i !== index)
  emit("update:moduleValue", updatedImages)
}

// 限制副檔名，將props中ext轉為accept字串傳給qfile
const accept = computed(() => {
  if (Array.isArray(props.ext) && props.ext.length) {
    let rtnValue = ""
    props.ext.forEach((value, index) => {
      if (index != 0) {
        rtnValue += ","
      }
      rtnValue += "." + value
    })
    return rtnValue
  }
  return ""
})
</script>
<style lang="scss" scoped>
@import "@/assets/scss/mixins/font";

.uploader {
  &__container {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 262px;
    gap: 4px;
    @include font-style;
  }

  &__field {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 16px;
    border: 1px solid rgba(0, 0, 0, 0.24);
    border-radius: 4px;
  }

  &__wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px dashed #ccc;
    border-radius: 4px;

    &--full {
      width: 40px;
      height: 40px;
      margin-left: 20px;
      border: none;
      flex-shrink: 0;
    }
  }

  &__input {
    width: 100%;
    height: 100%;
    &:deep(.q-field__control) {
      display: none;
    }
  }

  &__label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    pointer-events: none;

    &__text {
      @include font-style(14px);
    }

    &__btn {
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(-50%, -50%);
      width: 32px;
      height: 32px;
      background-color: var(--q-primary);
      color: var(--q-white);
      border-radius: 50%;
      @include font-style(24px, 400, 1.33);
      text-align: center;
    }
  }
}

@media screen and (min-width: 1024px) {
  .uploader__wrapper {
    :hover {
      opacity: 0.8;
      background-color: var(--q-secondary);
      &:deep(.q-field__inner) {
        cursor: pointer;
      }
    }

    &.uploader__wrapper--full:hover {
      opacity: 0.8;
      background-color: var(--q-white);

      &:deep(.q-field) {
        background-color: var(--q-white);
      }

      &:deep(.q-field__inner) {
        background-color: var(--q-white);
      }
    }
  }
}
</style>
