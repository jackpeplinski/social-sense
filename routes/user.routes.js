const express = require('express');
const router = express.Router();

const {Users} = require('../models/user.models')

router.post('/create', async (req, res) => {  
  const user_id = req.body.userID
  const group_id = req.body.groupID
  const group_name = req.body.groupName
  const happy_count = req.body.happyCount
  const neutral_count = req.body.neutralCount
  const sad_count = req.body.sadCount
  console.log(req)
  try{
    await Users.sync({force: false})
    await Users.create({
      "user_id": user_id,
      "group_id": group_id,
      "group_name": group_name,
      "happy_count": happy_count,
      "neutral_count": neutral_count,
      "sad_count": sad_count
    })
  }catch(err){
    res.status(400).json({"error": err})
  }
  res.status(200).json({"success": true})
})

module.exports = router