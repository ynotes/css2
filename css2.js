#!/usr/bin/env node

const fs = require('fs')

main()

function main() {
  const filename = process.argv[2]

  if (!filename) {
    console.log('Please specify a file')
    return
  }

  const ignored = ['index.html', 'Overview.html']

  if (filename === 'all') {
    fs.readdirSync(__dirname)
      .filter(x => x.endsWith('.html') && !ignored.includes(x))
      .forEach(modify)
    return
  }

  if (!filename.endsWith('.html')) {
    console.log('Not a html file')
    return
  }

  if (ignored.includes(filename)) {
    console.log('This file is ignored')
    return
  }

  modify(filename)
}

function modify(filename) {
  let content = fs.readFileSync(filename, 'utf8')
  const charset = '<meta charset="utf-8">'
  if (content.includes(charset)) {
    console.log(filename + ' has been modified')
    return
  }

  if (filename === 'cover.html') {
    content = content
      .replace('<title>', '<head>\n$&')
      .replace('<body>', '</head>\n$&')
  }

  const newContent = content
    .replace(/<title>/i, charset + '\n$&')
    .replace('style/default.css', 'https://drafts.csswg.org/css2/style/default.css')
    .replace('src="//', 'src="https://')
    .replace('fixup.js"', '$& async')
    .replace(/<\/head>/i, '<link href="custom.css" rel="stylesheet" type="text/css">\n$&')

  if (newContent === content) return
  if (!newContent.includes(charset)) {
    console.log('</head> is missing ' + filename)
    return
  }
  fs.writeFileSync(filename, newContent, 'utf8')
}
