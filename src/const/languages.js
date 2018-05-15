export default {
  "en": {
    short: 'en',
    file: resolve => require(['@/locale/en'], resolve),
  },
  "zh-CN": {
    short: 'cn',
    file: resolve => require(['@/locale/zh-CN'], resolve),
  },
}
