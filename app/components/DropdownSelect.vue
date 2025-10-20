<template>
  <div class="select-wrapper">
    <select
      v-model="modelValue"
      @change="$emit('update:modelValue', modelValue)"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";

interface Option {
  label: string;
  value: string | number;
}

const props = defineProps({
  modelValue: [String, Number],
  options: {
    type: Array as () => Option[],
    default: () => [],
  },
});

const modelValue = ref(props.modelValue);
</script>

<style scoped>
.select-wrapper select {
  width: 79px; /* 更寬 */
  height: 37px;
  padding: 4px 24px 4px 10px; /* 右邊留空給箭頭 */
  border-radius: 4px;
  background: #f5f5f5;
  border: 0px;
  font-size: 14px;
  cursor: pointer;
  color: #766c57;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 12px;
}
.select-wrapper select:focus {
  outline: none;
  box-shadow: none;
}
</style>
