const {Router} = require('express');
const db = require('../models/db')
const router = Router();

//GET ALL SUBJECTS LIST
router.get('/',async (req,res) =>{
    const query = `SELECT * FROM subject`
    try {
        const result = await db.query(query)
        res.send(result.rows)
    } catch (error) {
        res.sendStatus(400);
    }
})

//GET SUBJECT BY ID
router.get('/:id',async (req,res) =>{
    const id = req.params.id
    try {
        const query = `SELECT * FROM subject WHERE subject_id = $1`
        const result = await db.query(query,[id])
        res.send(result.rows[0])
    } catch (error) {
        res.sendStatus(400);
    }
})


module.exports = router