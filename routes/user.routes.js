const express = require('express');
const router = express.Router();

const {Users} = require('../models/user.models')

router.post('/createUser', async (req, res) => {  
  console.log(req)
  const userName = req.body.name
  try{
    await Users.sync({force: false})
    await Users.create({"name": userName})
  }catch(err){
    res.status(400).json({"error": err})
  }
  res.status(200).json({"name": userName})
})

module.exports = router