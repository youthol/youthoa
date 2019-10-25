export const checkTime = () => {
  const date = new Date();
  const hour = date.getHours();
  if ((hour >= 19 && hour <= 23) || (hour >= 0 && hour < 6)) {
    return '晚上';
  } else if (hour >= 6 && hour < 8) {
    return '早上';
  } else if (hour >= 8 && hour < 12) {
    return '上午';
  } else if (hour >= 12 && hour < 14) {
    return '中午';
  } else if (hour >= 14 && hour < 19) {
    return '下午';
  }
};
