import {commafy as localize} from "md/number-localize";
import dateformat from 'dateformat'

function toDigitNumber(num) {
  if(num === undefined || num === null || num !== num || Math.abs(num) === Infinity) {
    return 0
  }
  return num
}

// num: 小数点几位
export function percent(val, num) {
  if(!val) {
    val = 0
  }
  return (num === undefined ? val * 100 : fixed(val * 100 , num)) + '%'
}

// 小数点几位
export function fixed(val, num) {
  val = toDigitNumber(val)
  if(num === undefined) {
    num = 2
  } else if(typeof num !== 'number') {
    num = Number(num)
  }
  return val.toFixed(num)
}

export function wanCommafy(val) {
  if(val) {
    val = val / 10000
  } else {
    val = 0
  }
  return fixed(val, 1)
}
export function commafy(val) {
  val = toDigitNumber(val)
  return localize(val)
}

// '20110304' 'yyyy-mm-dd'
const dateReg = /^(\d{4})(\d{2})(\d{2})?$/
export function date(val, format) {
  let type = typeof val
  if(type === 'string' || type === 'number') {
    let mat = (val + '').match(dateReg)
    if(mat) {
      return dateformat(new Date(Number(mat[1]), Number(mat[2]) - 1, Number(mat[3]) || 1), format)
    } else {
      return ''
    }
  } else {
    return dateformat(val, format)
  }
}
// 1239029402940234  123***0234
const patentIdHideReg = /^(\w{3})\w+(\w{4})$/
export function idEncode(val) {
  return val.replace(patentIdHideReg, '$1****$2')
}
