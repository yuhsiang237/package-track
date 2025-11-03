import { nextTick } from "vue";

// ✅ 專門計算容器的實際寬度
export const getContainerActualWidth = (containerRef: {
  value: HTMLElement | null;
}) => {
  const container = containerRef.value;
  if (!container) return 0;

  const cards = Array.from(container.querySelectorAll(".package-card"));
  if (cards.length === 0) return 0;

  // 找出最右邊的卡片
  const rightmostCard = cards.reduce((prev, card) => {
    const prevRight = prev.getBoundingClientRect().right;
    const currRight = card.getBoundingClientRect().right;
    return currRight > prevRight ? card : prev;
  });

  // 計算容器左邊 → 最右卡片右邊的距離
  const containerRect = container.getBoundingClientRect();
  const cardRect = rightmostCard.getBoundingClientRect();
  const totalWidth = cardRect.right - containerRect.left;

  return totalWidth;
};

// ✅ 當 resize 或 mounted 時重新計算
export const updateWidth = async (
  cardBarWidthRef: { value: number },
  containerRef: { value: HTMLElement | null },
) => {
  cardBarWidthRef.value = 0;

  await nextTick();

  const width = getContainerActualWidth(containerRef);
  cardBarWidthRef.value = width;
  console.log("最右側卡片右端總寬：", width, "px");
};
