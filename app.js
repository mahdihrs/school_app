const express = require('express')
const app = express()
const Teacher = require('./routes/teacher')
const Student = require('./routes/student')
const Subject = require('./routes/subject')
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.use('/students', Student)
app.use('/teachers', Teacher)
app.use('/subjects', Subject)

app.get('/', (req, res) => {
    res.render('homepage')
})

app.listen(3000, () => {
    console.log(`Server listening on port 3000`)
})