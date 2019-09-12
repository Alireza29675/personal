module.exports = {
    apps : [{
        name: 'personal',
        script: 'yarn',
        args: 'start',
        interpreter: '/bin/bash',
        env: {
            NODE_ENV: 'development'
        }
    }]
};