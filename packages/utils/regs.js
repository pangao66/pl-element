// 车牌号
export const carNumReg = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
// 两位小数
export const towPointReg = /^(0|([1-9]\d*))(\.\d{1,2})?$/
// 正整数
export const integerNumberReg = /^[1-9]\d*$/
// 手机号
export const telReg = /^1\d{10}$/
// 金额
export const priceReg = /^(0|([1-9]\d{0,9}))(\.\d{1,2})?$/
// 身份证
export const idCardReg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
// 0-100两位小数
export const percentReg = /(^(\d|[1-9]\d)(\.\d{1,2})?$)|(^100$)/
// url
export const urlReg = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/
