export function setLang(lang) {
  if(lang !== process.env.LANG) {
    let reg = new RegExp('/' + process.env.LANG + '(/|#)')
    location.href = location.href.replace(reg, `/${lang}$1`)
  }
}
