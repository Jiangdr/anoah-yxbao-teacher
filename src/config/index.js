// 运行环境 dt/dev/test/t/mirror/prod
const ENV = 'dev'
const PRO = 'http'

let host = 'e.' + ENV + '.anoah.com'
// 如果是本地调试，取本地主机名,否则根据环境改变
let origin = window.location.hostname.match(/^(localhost|127\.0\.0\.1|\d{1,3}\.\d{1,3}.\d{1,3}.\d{1,3})$/) ? window.location.origin : PRO + '://' + host

let env = PRO + '://' + host

export default{
  origin: origin,
  env: env
}
