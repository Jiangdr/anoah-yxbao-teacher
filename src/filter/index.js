// 过滤题干中的标签
const replaceTag = val => {
  return val.replace(/<span class="pos"><\/span>/g, '_____').replace(/<.+?>/g, '-')
}
const timeFormat = val => {
  return val.replace('分', "''").replace('秒', "'''").replace('小时', "'")
}
const timeFormatSecond = val => {
  let str = ''
  let time = val
  let s = time % 60
  let m = Math.floor(time / 60) % 60
  let h = Math.round(Math.round(time / 60) / 60)
  str = h ? `${h}'${m}''${s}'''` : m ? `${m}''${s}'''` : `${s}'''`
  return str
}
export {
  replaceTag,
  timeFormat,
  timeFormatSecond
}
