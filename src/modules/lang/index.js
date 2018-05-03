export function setLang(lang) {
  let reg = new RegExp('/' + process.env.LANG + '(/|#)')
  location.href = location.href.replace(reg, `/${lang}$1`)
}
