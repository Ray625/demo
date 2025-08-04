<template>
  <div class="input-wrapper" :class="props.inputClass">
    <label :for="props.labelFor"
      >{{ props.label }}<span v-if="props.star" class="star">*</span></label
    >
    <q-input
      ref="inputRef"
      v-bind="$attrs"
      :modelValue="modelValue"
      :placeholder="props.placeholder"
      :for="props.labelFor"
      :disable="props.disable"
      :rules="props.rules"
      :maxlength="props.limitInput ? props.limitTotalLength : undefined"
      outlined
      dense
      hide-bottom-space
      no-error-icon
      @update:modelValue="handleInput"
    />
  </div>
</template>

<script setup>
import { ref } from "vue"

const inputRef = ref(null)

/**
 * 執行 input 驗證邏輯
 * @returns {boolean} 是否符合條件
 */
const validate = () => {
  return inputRef.value?.validate?.() ?? true
}

const resetValidate = () => {
  inputRef.value?.resetValidation?.()
}

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: undefined,
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
    required: false,
  },
  star: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "",
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

const emit = defineEmits(["update:modelValue"])

/**
 * 若 props.limitInput 及 limitInputFloat 為true
 * 則限制對應之規則
 * @param {string} val input 輸入值
 */
const handleInput = (val) => {
  emit("update:modelValue", val)
}

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

  &:deep(.q-field),
  &:deep(.q-field__inner),
  &:deep(.q-field__control) {
    display: flex;
    flex-grow: 1;
  }
}

.star {
  color: red;
  margin-left: 2px;
}
</style>
