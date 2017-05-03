const fs = require('fs')
const spawn = require('child_process').spawn
const path = require('path')
const each = require('async/each')

const templatePath = path.join(__dirname, '../template.svg')
const template = fs.readFileSync(templatePath).toString()

const certsPath = path.join(__dirname, '../certs')

const names = fs.readFileSync(path.join(__dirname, '../names.txt')).toString().split('\n').map((name) => name.trim())

each(names, (name, cb) => {
  const svgPath = certsPath + '/' + name + '.svg'
  fs.writeFileSync(svgPath, template.replace('Participante', name))
  convertToPDF(svgPath, name, cb)
}, (err) => {
  if (err) {
    throw err
  }
  console.log('all done')
})

function convertToPDF (svgPath, name, callback) {
  const certPath = 'certs/' + name + '.pdf'
  const cp = spawn('cairosvg', [svgPath, '-o', certPath])

  // cp.stdout.on('data', (data) => console.log(data.toString()))
  // cp.stderr.on('data', (data) => console.log(data.toString()))

  cp.on('close', () => callback())
}
