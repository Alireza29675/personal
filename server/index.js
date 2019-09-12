const express = require('express')
const compression = require('compression')
const chalk = require('chalk')

module.exports = ({ port, info }) => {
    const app = express()

    app.set('views', './server/views')
    app.set('view engine', 'pug')
    app.use(express.static('public'))
    app.use(compression())

    app.get('*', (req, res) => {
        res.render('index', info)
    })

    app.listen(port, () => {
        console.log(
            chalk`{green • Server started:} http://localhost:${port}/`
        )
    })
}