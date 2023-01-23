const express = require('express')
const {Router} = require('express');
const bcrypt = require('bcrypt')
const _=require('lodash')
const {generateJWT} = require('../models/user')
const db = require('../models/db');
const { result } = require('lodash');
const router = Router();

// GET ALL USERS LIST // --FOR ADMIN SIDE--
router.get('/',async (req,res) =>{
    const query = `SELECT * FROM users`
    try {
        const result = await db.query(query)
        res.send(result.rows)
    } catch (error) {
        res.sendStatus(400);
    }
})
//CHANGE PASSWORD
// router.patch('/',async (req,res)=>{
//     try {
//         const salt=await bcrypt.genSalt(10)
//         const password=hash(req.body.new_password,salt)
//         const result=await db.query(`SELECT * FROM users WHERE user_id=$1`,[req.body.user_id]);

//         const query = `UPDATE users
//             SET password = $1
//             WHERE user_id = $2
//             RETURNING *;`
//         const values=[password,req.body.user_id]
//         const resultChange = await db.query(query, values)
//         res.header('x-auth-token',generateJWT(body.name, result.rows[0].user_id))
//         .header("access-control-expose-headers", "x-auth-token")
//         .status(201).send({'user_id':result.rows[0]});
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('something went worng')
//     }

// })

//GET USER BY ID
router.get('/:id',async (req,res) =>{
    const id = req.params.id
    try {
        const query = `SELECT * FROM users WHERE user_id = $1`
        const result = await db.query(query,[id])
        res.send(result.rows[0])
    } catch (error) {
        res.sendStatus(400);
    }
})

//GET USER BY EMAIL
router.get('/byEmail/:em',async (req,res) =>{
    const email = req.params.em
    try {
        const query = `SELECT * FROM users WHERE email = $1`
        const result = await db.query(query,[email])
        res.send(result.rows[0])
    } catch (error) {
        res.sendStatus(400);
    }
})

//ADD NEW USER 
router.post('/', async (req, res) => {
    const body = req.body;
    try {
        const {rows} = await db.query(`SELECT * FROM users WHERE email = $1`,[body.email])
        if (rows.length != 0) return res.status(400).send('user already exist')
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(body.password,salt)
        const query = `INSERT INTO users (name, password, email) values ($1, $2, $3) RETURNING *`
        const values = [body.name, password, body.email]
        const result = await db.query(query, values)
        console.log(result.rows[0].user_id)
        res.header('x-auth-token',generateJWT(body.name, result.rows[0].user_id))
        .header("access-control-expose-headers", "x-auth-token")
        .status(201).send({'user_id':result.rows[0]});
    } catch (error) {
        console.log(error);
        res.status(500).send('something went worng')
    }
})

module.exports = router





