const _=require('lodash')
const bcrypt =require('bcrypt')
const express = require('express')
const router = express.Router();
const {generateJWT} = require('../models/user');
const db = require('../models/db');

router.post('/', async (req, res) => { 
  const body = req.body
  try {
    let result = await db.query(`SELECT * FROM users WHERE email = $1`,[body.email])
    console.log(result)
    if(!result) return res.status(400).send('Invalid email or password')
    let token = null;
    let name=null
    const valiedPassword= await bcrypt.compare(req.body.password ,result.rows[0].password)
    if(valiedPassword)
      token = generateJWT(body.name, result.rows[0].user_id);
      name=result.rows[0].name
      user_id=result.rows[0].user_id
    token? res.send({'token':token,"name":name,'user_id':user_id}) : res.status(400).send('Invalid email or password') 
  } catch (error) {
    res.status(400).send(error.message)
  }
})

module.exports = router