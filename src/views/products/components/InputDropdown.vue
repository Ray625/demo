<template>
  <div class="input-wrapper">
    <label :for="props.labelFor"
      >{{ props.label }}<span v-if="props.star" class="star">*</span></label
    >
    <q-select
      ref="dropdownRef"
      :inputId="props.labelFor"
      :modelValue="modelValue"
      :class="props.inputClass"
      :for="props.labelFor"
      :options="props.options"
      :disable="props.disable"
      :rules="props.rules"
      dense
      outlined
      options-dense
      hide-bottom-space
      no-error-icon
      @update:modelValue="$emit('update:modelValue', $event)"
    />
  </div>
</template>

<script setup>
import { ref } from "vue"

const dropdownRef = ref(null)

/**
 * 執行 input 驗證邏輯
 * @returns {boolean} 是否符合條件
 */
const validate = () => {
  return dropdownRef.value?.validate?.() ?? true
}

const resetValidate = () => {
  dropdownRef.value?.resetValidation?.()
}

const props = defineProps({
  modelValue: {
    type: [String, Object],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  labelFor: {
    type: String,
    required: true,
  },
  inputClass: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: () => [],
  },
  star: {
    type: Boolean,
    default: false,
  },
  disable: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array,
    default: () => [],
  },
})

defineEmits(["update:modelValue"])
defineExpose({ validate, resetValidate })
</script>
<style lang="scss" scoped>
@import "@/assets/scss/mixins/font";

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: fit-content;
  @include font-style;
}

.star {
  color: red;
  margin-left: 2px;
}
</style>
