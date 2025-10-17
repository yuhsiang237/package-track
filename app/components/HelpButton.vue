<template>
  <button class="help-btn" @click="handleClick">
    <svg
      width="10"
      height="16"
      viewBox="0 0 10 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 5C2 3.34375 3.34375 2 5 2C6.65625 2 8 3.34375 8 5C8 6.33437 7.12813 7.46562 5.92188 7.85625C5.03438 8.14375 4 8.95938 4 10.25V11C4 11.5531 4.44688 12 5 12C5.55312 12 6 11.5531 6 11V10.25C6 10.1969 6.01875 10.1219 6.10938 10.0219C6.20312 9.91875 6.35625 9.81875 6.5375 9.75937C8.54688 9.1125 10 7.22813 10 5C10 2.2375 7.7625 0 5 0C2.2375 0 0 2.2375 0 5C0 5.55312 0.446875 6 1 6C1.55313 6 2 5.55312 2 5ZM5 16C5.69063 16 6.25 15.4406 6.25 14.75C6.25 14.0594 5.69063 13.5 5 13.5C4.30937 13.5 3.75 14.0594 3.75 14.75C3.75 15.4406 4.30937 16 5 16Z"
        fill="#E3AC40"
      />
    </svg>
  </button>
</template>

<script setup>
const emit = defineEmits(["click"]);

const handleClick = () => {
  emit("click");
};
</script>

<style scoped lang="scss">
.help-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1.5px solid #c97d24; // 金橘色框線
  background-color: #fff;
  color: #c97d24;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #fff7f0;
    box-shadow: 0 2px 6px rgba(201, 125, 36, 0.25);
  }

  &:active {
    transform: scale(0.95);
  }
}
</style>
