<template>
  <label class="checkbox-wrapper">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="checkmark"></span>
    <span class="label-text">{{ label }}</span>
  </label>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  modelValue: Boolean,
  label: String,
});
</script>

<style scoped>
.checkbox-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  color: #333;
}

.checkbox-wrapper input {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 5px;
  position: relative;
  background: #fff;
}

.checkbox-wrapper input:checked + .checkmark {
  background-color: #fff1e9;
  border-color: #fff1e9;
}

.checkbox-wrapper input:checked + .checkmark::after {
  content: "";
  position: absolute;
  left: 6px;
  top: 2.5px;
  width: 4px;
  height: 8px;
  border: solid #e3ac40;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

.label-text {
  font-size: 14px;
}
</style>
