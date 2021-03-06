const constants = {
    cronExpression:{
        'MONTHLY':'0 0 1 * *',
        'DAILY' : '0 0 * * *',
        'wEEKLY' : '0 0 * * 1',
        'EVERY_MINUTE' : '* * * * *',
        'DEFAULT':'* * * * * *',
    },
    numOfRetries : 3,
}

module.exports = constants;