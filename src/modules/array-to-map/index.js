function getValue(target, key) {
  if(typeof key === 'function') {
    return key(target)
  } else {
    return target[key]
  }
}
// 数组转对象 [{a:'u'},{a:'c'}] => {u:{a:'u'},c:{a:'c'}}
export default function(array, key, value ) {
  let map = {}
  if(array) {
    for(let val of array) {
      map[getValue(val, key)] = value ? getValue(val, value) : val
    }
  }
  return map
}
