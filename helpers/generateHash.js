const crypto = require('crypto');

function generateSalt() {
    let salted = ''
    let abjad = 'abcdefghijklmnopqrstuvwxyz1234567890'
    for (let i = 0; i < 10; i++) {
        salted += abjad[Math.floor(Math.random() * abjad.length)]
    }
    return salted
}

function generateHash(password) {
    let salt = generateSalt()
    const hash = crypto.createHmac('sha256', salt)
                    .update('password')
                    .digest('hex');
    return { hash, salt }
}

module.exports = generateHash