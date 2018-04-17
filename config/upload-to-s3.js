module.exports = [{
  src: 'dist',
  handlers: [
    {
      test: /\.gz$/,
      handler(obj) {
        obj.dest = obj.dest.substr(0, obj.dest.length-3)
        obj.data['content-encoding'] = 'gzip'
      }
    }
  ]
}]
