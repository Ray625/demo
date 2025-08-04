<template>
  <div
    class="input-wrapper"
    :class="[props.inputClass, { 'input-error': error }]"
  >
    <div>{{ props.label }}<span v-if="props.star" class="star">*</span></div>
    <div class="input-checkbox-wrapper">
      <q-checkbox
        v-for="(option, idx) in props.options"
        :model-value="props.modelValue[idx].available"
        :name="option.value"
        :label="option.label"
        class="input-checkbox"
        @update:model-value="(val) => updateCheckbox(idx, val)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"

const error = ref(false)

/**
 * 執行驗證邏輯
 * @returns {boolean} 是否符合條件
 */
const validate = () => {
  if (props.rules && props.rules.length > 0) {
    for (const rule of props.rules) {
      const result = rule(props.modelValue)
      if (result !== true) {
        error.value = true
        return false
      }
    }
  }
  error.value = false
  return true
}

const resetValidate = () => {
  error.value = false
}

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    required: true,
  },
  inputClass: {
    type: String,
    required: false,
  },
  options: {
    type: Array,
    default: () => [],
  },
  star: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(["update:modelValue"])

const updateCheckbox = (idx, val) => {
  const newValue = props.modelValue.map((item, i) =>
    i === idx ? { ...item, available: val } : { ...item }
  )
  emit("update:modelValue", newValue)
}

watch(
  () => props.modelValue,
  () => {
    validate()
  },
)

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

.input-checkbox-wrapper {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.input-checkbox:deep(.q-checkbox__label) {
  white-space: nowrap;
  @include font-style(14px, 400, 1.5);
}

.star {
  color: red;
  margin-left: 2px;
}

.input-error .input-checkbox:deep(.q-checkbox__bg) {
  border: 2px solid #e53935;
}
</style>
