const router = require('express').Router()
const models = require('../models')
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    res.render('pages/userForm')
})

router.post('/', (req, res) => {
    let newUser = {
        name: req.body.name,
        email: req.body.email
    }
    models.User.create(newUser)
    .then(user => {
        res.redirect('/user/login')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/login', (req, res) => {
    res.render('pages/userLogin')
})

router.post('/login', (req, res) => {
    models.User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if (!user) {
                throw `User tidak ditemukan`
            }
        return bcrypt.compare(req.body.password, user.password)
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router