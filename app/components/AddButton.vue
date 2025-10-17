<template>
  <button class="add-btn" @click="handleClick">
    <svg
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.53061 1C8.53061 0.446875 8.07461 0 7.5102 0C6.94578 0 6.48979 0.446875 6.48979 1V6H1.38775C0.823335 6 0.36734 6.44688 0.36734 7C0.36734 7.55312 0.823335 8 1.38775 8H6.48979V13C6.48979 13.5531 6.94578 14 7.5102 14C8.07461 14 8.53061 13.5531 8.53061 13V8H13.6326C14.1971 8 14.6531 7.55312 14.6531 7C14.6531 6.44688 14.1971 6 13.6326 6H8.53061V1Z"
        fill="white"
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
.add-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: #c97d24; // 橘色
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #b56f1f;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.95);
  }
}
</style>
