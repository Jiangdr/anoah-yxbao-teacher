// 运行环境 dt/dev/test/t/mirror/prod
const ENV = 'dev'
const PRO = 'http'

let host = 'api2.' + ENV + '.anoah.com'
// 如果是本地调试，取本地主机名,否则根据环境改变
let origin = window.location.hostname.match(/^(localhost|127\.0\.0\.1|\d{1,3}\.\d{1,3}.\d{1,3}.\d{1,3})$/) && process.env.NODE_ENV === 'development' ? window.location.origin : PRO + '://' + host

let env = PRO + '://' + host
let old = PRO + '://' + 'e.' + ENV + '.anoah.com'

export default{
  origin: origin,
  env: env,
  old: old
}
