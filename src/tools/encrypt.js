//字符串转base64
function encode(str) {
  // 对字符串进行编码
  var encode = encodeURIComponent(str)
  // 对编码的字符串转化base64
  var base64 = btoa(encode)
  return base64
}

// base64转字符串
function decode(base64) {
  // 对base64转编码
  var decode = atob(base64)
  // 编码转字符串
  var str = decodeURIComponent(decode)
  return str
}

function compile(code) {
  var c = String.fromCharCode(code.charCodeAt(0) + code.length)
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
  }
  return escape(c)
}
function uncompile(code) {
  code = unescape(code)
  var c = String.fromCharCode(code.charCodeAt(0) - code.length)
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1))
  }
  return c
}

export { encode, decode, compile, uncompile }
