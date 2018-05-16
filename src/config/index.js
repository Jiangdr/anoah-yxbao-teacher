// 运行环境 dt/dev/test/t/mirror/prod
const ENV = 'dev'
const HOST = 'anoah.com'
const PRO = 'http'

let api2 = `${PRO}://api2.${ENV}.${HOST}/`
let old = `${PRO}://e.${ENV}.${HOST}/`

export default{
  apiDomain: {
    api2: api2,
    old: old
  }
}
