const express = require('express')
const router = express.Router()
const models = require('../models')
const Teacher = require('../models').Teacher

router.get('/', (req, res) => {
    Teacher.findAll({
        order: [['id', 'ASC']],
        include: [
            { model: models.Subject }
        ]
    })
    .then(allTeachers => {
        res.render('pages/allTeachers', { 
            teachers: allTeachers
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/add', (req, res) => {
    res.render('pages/teacherForms', {
        err: req.query.error,
        success: req.query.success
    })
})

router.post('/add', (req, res) => {
    Teacher.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    })
    .then(newData => {
        res.redirect('/teachers')
    })
    .catch(err => {
        res.redirect(`/teachers/add?error=${err.errors[0].message}`)
    })
})

router.get('/edit/:id', (req, res) => {
    let id = req.params.id
    let subjects;
    models.Subject.findAll()
    .then(allSubjects => {
        subjects = allSubjects
        // res.send(subjects)
        return Teacher.findByPk(id)
    })
    .then(teacher => {
        // res.send(teacher)
        if (!teacher) {
            throw `Data guru tidak tersedia`
        }
        res.render('pages/editTeacher', { 
            teacher: teacher,
            subjects: subjects 
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/edit/:id', (req, res) => {
    let sendToValidate = {
        id: req.params.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        SubjectId: req.body.subject
    }
    // console.log(req.body)
    Teacher.update(sendToValidate, {where: {id: req.params.id}})
    .then(() => {
        res.redirect('/teachers')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/delete/:id', (req, res) => {
    Teacher.destroy({where: {id: req.params.id}})
    .then(() => {
        res.redirect('/teachers')
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router