'use strict'
require('./check-versions')()

process.argvobj = require('./params')()
process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

let env = require('../config/prod.env')
let langs = require('../config/lang')


let outputPath = webpackConfig.output.path
let outputPublicPath = webpackConfig.output.publicPath

const spinner = ora('building for production...')
spinner.start()


function webpackByLang(lang) {
  env.LANG = `"${lang}"`
  webpackConfig.resolve.alias.lang = `@/locale/${lang}`
  webpackConfig.output.path = outputPath + '/' + lang
  webpackConfig.output.publicPath = outputPublicPath + lang

  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      spinner.stop()
      if (err) {
        reject(err)
        return
      }
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'))
        process.exit(1)
      }

      console.log(chalk.cyan('  Build complete.\n'))
      resolve()
    })
  })
}

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), async function(err) {
  if (err) throw err
  for(let lang of langs) {
    await webpackByLang(lang)
  }
  // let lang = langs[0]
  // env.LANG = `"${lang}"`
  // webpackConfig.resolve.alias.lang = `@/locale/${lang}`
  // console.log(webpackConfig)
  // webpack(webpackConfig, (err, stats) => {
  //   spinner.stop()
  //   if (err) throw err
  //   process.stdout.write(stats.toString({
  //     colors: true,
  //     modules: false,
  //     children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
  //     chunks: false,
  //     chunkModules: false
  //   }) + '\n\n')
  //
  //   if (stats.hasErrors()) {
  //     console.log(chalk.red('  Build failed with errors.\n'))
  //     process.exit(1)
  //   }
  //
  //   console.log(chalk.cyan('  Build complete.\n'))
  //   console.log(chalk.yellow(
  //     '  Tip: built files are meant to be served over an HTTP server.\n' +
  //     '  Opening index.html over file:// won\'t work.\n'
  //   ))
  // })
})
