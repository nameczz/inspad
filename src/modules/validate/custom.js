import { Validator } from 'vee-validate';
const lineReg = /-/g
const mobileReg = /^\d[\d-]+\d$/
Validator.extend('mobile',  (value, args) => {
  if(!mobileReg.test(value)) {
    return false
  }
  let val = value.replace(lineReg, '')
  if(args && args.length > 0) {
    return val.length === Number(args[0])
  }

  return true
});

