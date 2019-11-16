/**
 * 获取时间差
 * @param {number} start
 * @param {number} end
 */
export const getTimeDifference = (start, end) => {
  const timeDifference = (end - start) / 1000 / 60; // 已经值班时长，单位为分钟
  return Math.floor(timeDifference);
};
