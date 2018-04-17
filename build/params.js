module.exports = function() {
  var args = process.argv.slice(2)
  var argReg = /^--/
  var argMap = {}
  args.forEach(function (val, index, array) {
    if(argReg.test(val)) {
      let next = args[index + 1]

      if(!argReg.test(next)){
        argMap[val.replace(argReg, '')] = next
      }
    }
  })
  return argMap
}
