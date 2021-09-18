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