function getValue(target, key) {
  if(typeof key === 'function') {
    return key(target)
  } else {
    return target[key]
  }
}

export default function(array, key, value ) {
  let map = {}
  if(array) {
    for(let val of array) {
      map[getValue(val, key)] = value ? getValue(val, value) : val
    }
  }
  return map
}
