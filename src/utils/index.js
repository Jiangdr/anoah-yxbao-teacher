// 加密
function encrypt (theText) {
  let output = ''
  let temp = []
  let temp2 = []
  let TextSize = theText.length
  for (let i = 0; i < TextSize; i++) {
    let rnd = Math.round(Math.random() * 122) + 68
    temp[i] = theText.charCodeAt(i) + rnd
    temp2[i] = rnd
  }
  for (let i = 0; i < TextSize; i++) {
    output += String.fromCharCode(temp[i], temp2[i])
  }
  return output
}
// 解密
function decrypt (theText) {
  let output = ''
  let temp = []
  let temp2 = []
  let TextSize = theText.length
  for (let i = 0; i < TextSize; i++) {
    temp[i] = theText.charCodeAt(i)
    temp2[i] = theText.charCodeAt(i + 1)
  }
  for (let i = 0; i < TextSize; i = i + 2) {
    output += String.fromCharCode(temp[i] - temp2[i])
  }
  return output
}
// 判断元素是否含有某个className
function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
// 给某个元素添加某个className
function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}
// 移除某个className
function removeClass(el, className) {
  if (!hasClass(el, className)) {
    return
  }
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
  el.className = el.className.replace(reg, ' ')
}
// 获取元素上的data-属性
function getData(el, name, val) {
  let prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}
// 获取元素的盒模型最终值
function getRect(el) {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}
export default {
  encrypt,
  decrypt,
  hasClass,
  addClass,
  removeClass,
  getData,
  getRect
}
