const pdfFillForm = require('pdf-fill-form')
// const fs = require('fs')
const path = require('path')

const templatePath = path.join(__dirname, '../cert-20-festival.pdf')
// const outputPath = path.join(__dirname, '../cert.pdf')

const pdfFields = pdfFillForm.readSync(templatePath)
console.log(pdfFields)
