const PDFGenerator = require('pdfkit')
const fs = require('fs')

class InvoiceGenerator {
    constructor(invoice) {
        this.invoice = invoice
    }

    generateHeaders(doc) {
        const billingAddress = this.invoice

        doc
            .image('./images/Barcode1.png', 0, 0, { width: 200})
            .fillColor('#000')
            .fontSize(20)
            .text('INVOICE', 275, 50, {align: 'right'})
            .fontSize(10)
            .text(`Invoice Number: ${Math.floor(Math.random() * 1000000)}`, {align: 'right'})
            .text(`Due: ${new Date().getUTCDate}`, {align: 'right'})
            .moveDown()
            .text(`Billing Address:\n ${billingAddress.lastName} ${billingAddress.firstName}\n${billingAddress.address}\n`, {align: 'right'})
    
        const beginningOfPage = 50
        const endOfPage = 550

        doc.moveTo(beginningOfPage,200)
            .lineTo(endOfPage,200)
            .stroke()
                
        doc.text(`Total paying: ${billingAddress.items.totalPrice}`, 50, 210)

        doc.moveTo(beginningOfPage,250)
            .lineTo(endOfPage,250)
            .stroke()

    }

    generateTable(doc) {
        const tableTop = 270
        const itemCodeX = 50
        const descriptionX = 100
        const quantityX = 250
        const priceX = 300
        const amountX = 350

        doc
            .fontSize(10)
            .text('Item Code', itemCodeX, tableTop, {bold: true})
            .text('Description', descriptionX, tableTop)
            .text('Quantity', quantityX, tableTop)
            .text('Price', priceX, tableTop)
            .text('Amount', amountX, tableTop)

        const items = this.invoice.items.cart;
        let i = 0;


        for (i = 0; i < items.length; i++) {
            const item = items[i]
            const y = tableTop + 25 + (i * 25)

            doc
                .fontSize(10)
                .text(item.id, itemCodeX, y)
                .text(item.nameItem, descriptionX, y)
                .text(item.amount, quantityX, y)
                .text(`$ ${item.priceItem}`, priceX, y)
                .text(`$ ${item.priceItem*item.amount}`, amountX, y)
        }
    }

    generateFooter(doc) {
        doc
            .fontSize(10)
            .text(`Buy in a Click. `, 50, 700, {
                align: 'center'
            })
    }

    generate() {
        let theOutput = new PDFGenerator 


        const fileName = `Invoice.pdf`

        // pipe to a writable stream which would save the result into the same directory
        theOutput.pipe(fs.createWriteStream(fileName))

        this.generateHeaders(theOutput)

        theOutput.moveDown()

        this.generateTable(theOutput)

        this.generateFooter(theOutput)
        

        // write out file
        theOutput.end()

    }
}

module.exports = InvoiceGenerator