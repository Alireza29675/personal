const app = require('./server')

const config = {
    port: 3000,
    info: {
        title: 'Alireza Sheikholmolouki | Software Developer'
    }
}

app(config)