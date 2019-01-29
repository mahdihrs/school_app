const express = require('express')
const router = express.Router()
const models = require('../models')
const Student = require('../models').Student

router.get('/', (req, res) => {
    Student.findAll({
        order: [['id', 'ASC']]
    })
    .then(allStudents => {
        res.render('pages/allStudents', { 
            students: allStudents
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/add', (req, res) => {
    let successMsg = req.query.success
    res.render('pages/studentForms', { 
        err: req.query.error,
        msg: successMsg
    })
})

router.post('/add', (req, res) => {
    Student.create({
        id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    })
    .then(newData => {
        res.redirect(`/students/add?success=${newData.first_name} has been created`)
    })
    .catch(err => {
        res.redirect(`/students/add?error=${err.errors[0].message}`)
    })
})

router.get('/edit/:id', (req, res) => {
    let id = req.params.id
    Student.findByPk(id)
    .then(student => {
        res.render('pages/editStudent', {
            student: student, 
            err: req.query.error
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/edit/:id', (req, res) => {
    Student.update(req.body, {where: {id: req.params.id}})
    .then(() => {
        res.redirect('/students')
    })
    .catch(err => {
        res.redirect(`/students/edit/${req.params.id}?error=${err.errors[0].message}`)
    })
})

router.get('/delete/:id', (req, res) => {
    Student.destroy({where: {id: req.params.id}})
    .then(() => {
        res.redirect('/students')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/:id/add-subject', (req, res) => {
    let student ;
    Student.findByPk(req.params.id)
    .then((stdnt) => {
        student = stdnt
        return models.Subject.findAll()
    })
    .then(allSubjects => {
        res.render('pages/addSubject', {
            student: student,
            subjects: allSubjects
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/:id/add-subject', (req, res) => {
    models.Subject.findOne({
        where: {
            subject_name: req.body.subject
        }
    })
    .then(subject => {
        let readyToUpdate = {
            StudentId: req.params.id,
            SubjectId: subject.id
        }
        return models.StudentSubject.create(readyToUpdate)
    })
    .then(() => {
        res.redirect('/students')
    })
    .catch(err => {
        res.send(err)
    })
})


module.exports = router