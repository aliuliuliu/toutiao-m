//  本地存储模块
// 获取
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
// 添加
export const setItem = (name, value) => {
  // 如果value 是对象 就把 value 转为 JSON格式的字符串再存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}
// 删除
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
