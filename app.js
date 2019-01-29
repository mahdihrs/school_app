const express = require('express')
const app = express()
const Teacher = require('./routes/teacher')
const Student = require('./routes/student')
const Subject = require('./routes/subject')
const User = require('./routes/user')
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.use('/students', Student)
app.use('/teachers', Teacher)
app.use('/subjects', Subject)
app.use('/user', User)

app.get('/', (req, res) => {
    res.render('pages/homepage')
})

app.listen(3000, () => {
    console.log(`Server listening on port 3000`)
})