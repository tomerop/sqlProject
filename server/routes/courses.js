const {Router} = require('express');
const db = require('../models/db')
const router = Router();

//GET ALL COURSES LIST
router.get('/',async (req,res) =>{
    const query = `SELECT * FROM courses ORDER BY course_id`
    try {
        const result = await db.query(query)
        res.send(result.rows)
    } catch (error) {
        res.sendStatus(400);
    }
})
//GET ALL COURSES BY ID --- MY COURSES ---
router.get('/:id',async (req,res) =>{
    let user_id = parseInt(req.params.id) 
    const query = `SELECT * FROM courses 
    INNER JOIN subject ON subject.subject_id = courses.subject_id
    WHERE user_id = ${user_id}`
    try {
        const result = await db.query(query)
        res.send(result)
    } catch (error) {
        res.sendStatus(400);
    }
})

//ADD ME  COURSE 
router.post("/", async (req, res)=>{
    const body = req.body
    let {user_id, subject_id} = body
    let subject = ""
    let course_num = 1
    let course_name = ""

    try {
        let query = `SELECT * FROM courses WHERE user_id = ${user_id} and subject_id = ${subject_id}`
        let result = await db.query(query)
        if (result.rowCount > 0)
        return res.status(400).send("this user is already exist in this course")
    } catch (error) {
        return res.status(400).send(error.message)
    }

    try {
        let query = `SELECT subject FROM subject WHERE subject_id = ${subject_id}`
        let result = await db.query(query)
        subject = result.rows[0].subject
    } catch (error) {
        return res.status(400).send(error.message)
    }

    while (true){
        course_name = subject + course_num
        let query = `SELECT COUNT(*) FROM courses WHERE course_name = '${course_name}'`
        let result = await db.query(query)
        if (result.rows[0].count == 22)course_num++
        else break
    }

    try {
        let query = `INSERT INTO courses (course_name, user_id, subject_id) VALUES ($1, $2, $3) RETURNING *`
        let values = [course_name, user_id, subject_id]
        let result = await db.query(query, values)
        res.status(201).send(result.rows[0])
    } catch (error) {
        res.status(400).send(error.message)
    }
})    

//DELETE USER FROM COURSE BY ID 
router.post('/deleteSub',async (req,res) =>{
    const body = req.body;
    console.log(req.body)
    let {user_id, subject_id} = body
    try {
        let query = `DELETE FROM courses WHERE user_id = ${user_id} AND subject_id = ${subject_id} RETURNING *`
        let result = await db.query(query)
        if (result.rowCount === 0)
        return res.status(400).send("this user ia not in this course")
        else res.send(`user deleted from ${result.rows[0].course_name}`)
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router