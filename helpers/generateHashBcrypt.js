const bcrypt = require('bcryptjs');

function generateHash(password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10)
        .then((salt) => {
            return bcrypt.hash(password, salt)
        })
        .then(hash => {
            password = hash
            resolve(password)
        })
        .catch(err => {
            reject(err)
        })
    })
}

module.exports = generateHash