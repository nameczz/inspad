/**
 * @param {number} num
 * @return {string}
 */
function wanfy(num) {
  return splitJoin(num, ' ', 4)
}

/**
 * @param {number} num
 * @return {string}
 */
function commafy(num) {
  return splitJoin(num, ',', 3)
}

function splitJoin(num, separator, splited) {
  num += ''
  let length = num.length
  let remain = length % splited
  let start = remain > 0 ? remain - splited : 0
  let end = start + splited
  let result = ''
  while(end < length) {
    result += num.substring(start, end) + separator
    start = end
    end += splited
  }
  result += num.substring(start, end)
  return result
}


export {wanfy, commafy, splitJoin}
