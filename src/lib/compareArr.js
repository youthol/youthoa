// 比较对象元素数组
export const compareArr = property => {
  return (obj1, obj2) => {
    const value1 = obj1[property];
    const value2 = obj2[property];
    return value2 - value1;
  };
};
