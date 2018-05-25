const icomType = {
  '35': '高效阅读',
  '36': '口语训练',
  '84': '群英争霸(句子版)',
  '420': '闻英起舞',
  '500': '知识脑图',
  '503': '群英争霸(词汇版)',
  '504': '老鹰抓小鸡',
  '507': '单词汉堡',
  '508': '成功营救',
  '4423': '吃火锅',
  '4424': '虎口拔牙',
  '4427': '图型计算器',
  '4628': '互动视频',
  '4630': '单词速记',
  '4642': '宝瓶收妖（听音辨词）',
  '4643': '宝瓶收妖（语音识词）',
  '4688': '作文集',
  '4690': '国学',
  '4680': '古诗文',
  '4692': '互动题板',
  '4693': '投票',
  '5000': '闻音起舞(音标)',
  '5001': '字母书写',
  '5002': '字母学习',
  '5003': '音标学习',
  '5007': '微课',
  '5009': '汉字听写',
  '5011': '口算训练',
  '5013': '小熊射手'
}
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
const questionName = (val, params) => {
  let name = '未知类型'
  if (params.resource_type === 'icom' || (params.icom_app_name && !params.resource_type)) {
    name = icomType[params.icom_id] || '组件'
  } else if (params.resource_type === 'graph') {
    name = '图形计算器'
  } else if (params.resource_type === 'qti_question') {
    name = params.qti_question_type_name ? params.qti_question_type_name : params.name
  } else if (params.resource_type === 'qti_exam') {
    name = '互动试卷'
  } else if (params.resource_type === 'qti_exam_sheet') {
    name = '答题卡'
  } else if (params.icom_id === '4679' && params.icom_app_name === 'flashplayer') {
    name = 'flash播放组件'
  }
  return name
}
export {
  replaceTag,
  timeFormat,
  timeFormatSecond,
  questionName
}
