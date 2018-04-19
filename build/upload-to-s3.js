var params = require('./params')()

var exec = require('child_process').exec;
var uploadConfig = require('../config/upload-to-s3');
var path = require('path');
var fs = require('fs');
var win32 = process.platform === 'win32';

let s3uri = params.uri.replace('s3://', '')

var unixifyPath = function (filepath) {
  if (win32) {
    return filepath.replace(/\\/g, '/');
  } else {
    return filepath;
  }
};

var recurse = function (rootdir, callback, subdir) {
  var abspath = subdir ? path.join(rootdir, subdir) : rootdir;
  fs.readdirSync(abspath).forEach(function (filename) {
    var filepath = path.join(abspath, filename);
    if (fs.statSync(filepath).isDirectory()) {
      recurse(rootdir, callback, unixifyPath(path.join(subdir || '', filename || '')));
    } else {
      callback(unixifyPath(filepath), rootdir, subdir, filename);
    }
  });
};

function wrapS3api(array) {
  if(params.plus) {
    array.push(params.plus.trim())
  }
  return array.join(' ')
}

function deleteAll(s3uri, callback) {
  if(params.clear === 'false') {
    callback && callback()
    return
  }
  console.log('start delete old files')
  exec(wrapS3api(['aws s3 rm', s3uri, '--recursive']), (error, stdout, stderr) => {
    if (error) {
      console.log(error.stack)
      console.log('Error code: ' + error.code)
      return
    }
    console.log('delete old files success')
    callback && callback()
  })
}

function upload(config) {
  var uploadFiles = []
  recurse(config.src, (abspath, rootdir, subdir, filename) => {
    var obj = {
      src: abspath,
      dest: subdir ? path.join(s3uri, subdir, filename)
        : path.join(s3uri, filename),
      data: {}
    }
    config.handlers.forEach((handler) => {
      if (handler.test.test(abspath)) {
        handler.handler.call(this, obj)
      }
    })

    uploadFiles.push(obj)
  })


  deleteAll(params.uri, () => {
    uploadFiles.forEach((file) => {
      var commands = ['aws s3 cp',
        file.src,
        's3://' + file.dest]

      for(var name in file.data) {
        var value = file.data[name]
        commands.push('--' + name, value)
      }

      console.log(file.src + " exist: " + fs.existsSync(file.src))

      exec(wrapS3api(commands), (error, stdout, stderr) => {
        if (error) {
          console.log(error.stack)
          console.log('Error code: ' + error.code)
          return
        }
        console.log('uploaded: ' + file.dest)
      })
    })
  })
}

uploadConfig.forEach((config) => {
  upload(config)
})
