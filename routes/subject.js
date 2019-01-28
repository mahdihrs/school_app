const express = require('express')
const router = express.Router()
const models = require('../models')
const Subject = require('../models').Subject

router.get('/', (req, res) => {
    Subject.findAll({
        order: [['id', 'ASC']]
    })
    .then(allSubjects => {
        let teachersIncluded = allSubjects.map(subject => {
            return new Promise((resolve, reject) => {
                subject.getTeachers()
                .then(teachers => {
                    subject.dataValues['Teachers'] = teachers
                    resolve(subject)
                })
                .catch(err => {
                    reject(err)
                })
            })
        })
        return Promise.all(teachersIncluded)
    })
    .then(data => {
        res.render('allSubjects', { 
            subjects: data
        })

    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/add', (req, res) => {
    res.render('subjectForms')
})

router.post('/add', (req, res) => {
    Subject.create({
        subject_name: req.body.subject_name
    })
    .then(newData => {
        res.redirect(`/`)
    })
    .catch(err => {
        res.send(err.errors[0].message)
    })
})

router.get('/edit/:id', (req, res) => {
    let id = req.params.id
    Subject.findByPk(id)
    .then(subject => {
        if (!subject) {
            throw `Subject tidak tersedia`
        }
        res.render('editSubject', { subject: subject })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/edit/:id', (req, res) => {
    Subject.update(req.body, {where: {id: req.params.id}})
    .then(() => {
        res.redirect('/subjects')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/delete/:id', (req, res) => {
    Subject.destroy({where: {id: req.params.id}})
    .then(() => {
        res.redirect('/subjects')
    })
    .catch(err => {
        res.send(err)
    })
})

//subjects/:id/enrolled-students
//subjectId
router.get('/:id/enrolled-students', (req, res) => {
    let sub;
    Subject.findByPk(req.params.id)
    .then(subject => {
        sub = subject
        return subject.getStudents()
    })
    .then(students => {
        sub.dataValues['Students'] = students
        // res.send(sub)
        res.render('enrolledStudents', { subject: sub })
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/:id/give-score', (req, res) => {
    let StuSub = 0
    models.StudentSubject.findByPk(req.params.id)
    .then(ss => {
        StuSub = ss
        return models.Student.findByPk(ss.StudentId)
    })
    .then(student => {
        let fullName = `${student.first_name} ${student.last_name}`
        res.render('give-score', { 
            name: fullName,
            data: StuSub
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/:id/give-score', (req, res) => {
    models.StudentSubject.update({
            score: req.body.score
        }, {
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        return models.StudentSubject.findByPk(req.params.id)
    })
    .then(data => {
        res.redirect(`/subjects/${data.SubjectId}/enrolled-students`)
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router