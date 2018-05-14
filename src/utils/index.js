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
export default {
  encrypt,
  decrypt
}
