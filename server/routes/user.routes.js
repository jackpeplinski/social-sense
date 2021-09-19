const express = require('express');
const router = express.Router();

const { Users } = require('../models/user.models')

router.post('/create', async (req, res) => {
  const user_id = req.body.userID
  const group_id = req.body.groupID
  const group_name = req.body.groupName
  const happy_count = req.body.happyCount
  const neutral_count = req.body.neutralCount
  const sad_count = req.body.sadCount
  try {
    await Users.sync({ force: false })
    await Users.create({
      "user_id": user_id,
      "group_id": group_id,
      "group_name": group_name,
      "happy_count": happy_count,
      "neutral_count": neutral_count,
      "sad_count": sad_count
    })
  } catch (err) {
    res.status(400).json({ "error": err })
  }
  res.status(200).json({ "success": true })
})

router.get('/group-total-counts', async (req, res) => {
  const user_id = req.body.userID
  console.log(req)
  try {
    await Users.sync({ force: false })
    const data = await Users.findAll({ where: { user_id: user_id } })

    var happy_count = 0
    var neutral_count = 0
    var sad_count = 0
    data.forEach(group => {
      raw_info = group.dataValues
      happy_count += raw_info.happy_count
      neutral_count += raw_info.neutral_count
      sad_count += raw_info.sad_count
    })
    // const happy_count = await Users.aggregate({ 
    //   where: { user_id: user_id },
    //   attribute: "happy_count",
    //   aggregateFunction: "sum"
    // })
    // const neutral_count = await Users.aggregate({ 
    //   where: { user_id: user_id },
    //   attribute: "neutral_count",
    //   aggregateFunction: "sum"
    // })
    // const sad_count = await Users.aggregate({ 
    //   where: { user_id: user_id },
    //   attribute: "sad_count",
    //   aggregateFunction: "sum"
    // })

    res.status(200).json({
      "happy_count": happy_count,
      "neutral_count": neutral_count,
      "sad_count": sad_count
    })
  } catch (err) {
    res.status(400).json({ "error": err })
  }
})

router.get('/group-counts', async (req, res) => {
  const user_id = req.body.userID
  let response = {}
  try {
    await Users.sync({ force: false })
    const data = await Users.findAll({ where: { user_id: user_id } })

    data.forEach(group => {
      raw_info = group.dataValues
      response[raw_info.group_id] = {
        "group_name": raw_info.group_name,
        "happy_count": raw_info.happy_count,
        "neutral_count": raw_info.neutral_count,
        "sad_count": raw_info.sad_count
      }
    })

    res.status(200).json(response)
  } catch (err) {
    res.status(400).json({ "error": err })
  }

})

module.exports = router