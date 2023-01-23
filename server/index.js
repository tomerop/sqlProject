const express = require('express')
const cors= require('cors')
const usersRouter = require('./routes/users')
const coursesRouter = require('./routes/courses')
const subjectRouter = require('./routes/subjects')
const authRouter = require('./routes/auth')
const app = express();

app.use(express.json())
app.use(cors())
app.use('/api/users',usersRouter);
app.use('/api/auth', authRouter)
app.use('/api/courses',coursesRouter);
app.use('/api/subjects',subjectRouter);

// PORT 
const port = process.env.PORT || 4000; 
app.listen(port, () => console.log(`active on ${port}`))