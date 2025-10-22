<template>
  <button class="import-btn" @click="handleClick">
    <span class="icon">
      <svg
        width="21"
        height="14"
        viewBox="0 0 21 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.64 6.08125C17.7745 5.74688 17.85 5.38125 17.85 5C17.85 3.34375 16.4391 2 14.7 2C14.0536 2 13.4498 2.1875 12.9511 2.50625C12.0422 1.00625 10.3458 0 8.4 0C5.49937 0 3.15 2.2375 3.15 5C3.15 5.08437 3.15328 5.16875 3.15656 5.25313C1.31906 5.86875 0 7.5375 0 9.5C0 11.9844 2.11641 14 4.725 14H16.8C19.1198 14 21 12.2094 21 10C21 8.06563 19.5562 6.45 17.64 6.08125ZM12.9084 8H10.7625V11.5C10.7625 11.775 10.5262 12 10.2375 12H8.6625C8.37375 12 8.1375 11.775 8.1375 11.5V8H5.99156C5.52234 8 5.28937 7.4625 5.62078 7.14688L9.07922 3.85313C9.28266 3.65938 9.61734 3.65938 9.82078 3.85313L13.2792 7.14688C13.6106 7.4625 13.3744 8 12.9084 8Z"
          fill="#D07D09"
        />
      </svg>
    </span>
    <span class="text">匯入Package.json</span>
  </button>
</template>

<script setup>
const emit = defineEmits(["click"]);

const handleClick = () => {
  emit("click");
};
</script>

<style scoped lang="scss">
.import-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  border: 1px solid #dba05b;
  border-radius: 6px;
  background-color: #fff;

  font-size: 14px;
  color: #c97d24;
  padding: 6px 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  .icon {
    display: flex;
    color: #c97d24;
  }

  &:hover {
    background-color: #fff7f0;
    border-color: #c97d24;
  }

  &:active {
    transform: scale(0.97);
  }
}
</style>
