const axios = require('axios')
const db = require('../config/db.js')

exports.editUser = (req, res) => {
  const userId = req.userId
  const updates = req.body

  const forbiddenFields = ['userId', 'secretString', 'profilePhoto']

  const hasForbiddenField = forbiddenFields.some((field) => field in updates)

  if (hasForbiddenField) {
    return res.status(400).json({
      message: 'Field cannot be updated!'
    })
  }

  const fields = Object.keys(updates)
  const values = Object.values(updates)

  const setClause = fields
    .map((field, index) => `${field} = $${index + 1}`)
    .join(', ')

  const query = `
        UPDATE "User"
        SET ${setClause}
        WHERE user_id = $${fields.length + 1}
        RETURNING *
      `
  const params = [...values, userId]

  db.query(query, params)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          message: 'User not found!'
        })
      }

      res.status(200).json({
        message: 'User updated successfully!',
        user: result.rows[0]
      })
    })
    .catch((error) => {
      console.error('Error updating user:', error)
      res.status(500).json({
        message: error.message
      })
    })
}

function generateAlphanumeric() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters[randomIndex]
  }
  return result
}

exports.changeSecretString = (req, res) => {
  const userId = req.userId

  const secretString = generateAlphanumeric()

  const query = `
            UPDATE "User"
            SET secret_string = $1
            WHERE user_id = $2
            RETURNING *
        `
  const params = [secretString, userId]

  db.query(query, params)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          message: 'User not found!'
        })
      }

      res.status(200).json({
        message: 'Secret string updated successfully!',
        user: result.rows[0]
      })
    })
    .catch((error) => {
      console.error('Error updating secret string:', error)
      res.status(500).json({
        message: error.message
      })
    })
}

// TODO: Integrate this function with sending message service
exports.forgotSecretString = (req, res) => {
  const { phoneNumber } = req.query

  if (!phoneNumber) {
    return res.status(400).json({
      message: 'Phone number is required!'
    })
  }

  const query = `
    SELECT user_id
    FROM Card
    WHERE card_phone_number = $1
  `

  db.query(query, [phoneNumber])
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          message: 'Phone number not found!'
        })
      }

      const userId = result.rows[0].user_id
      const secretString = generateAlphanumeric()

      const query = `
            UPDATE "User"
            SET secret_string = $1
            WHERE user_id = $2
            RETURNING *
        `
      const params = [secretString, userId]

      db.query(query, params)
        .then((result) => {
          if (result.rows.length === 0) {
            return res.status(404).json({
              message: 'User not found!'
            })
          }

          axios
            .get(process.env.SEND_MESSAGE_ENDPOINT + '/send-message?number=' + phoneNumber + '&message=' + secretString)
            .then(() => {
              res.status(200).json({
                message: `Secret string changed and sent to ${phoneNumber}!`
              })
            })
            .catch((error) => {
              console.error('Error sending secret string)', error)
              res.status(500).json({
                message: 'Internal server error!',
                error: error.message
              })
            })
        })
        .catch((error) => {
          console.error('Error updating secret string:', error)
          res.status(500).json({
            message: error.message
          })
        })
    })
    .catch((error) => {
      console.error('Error fetching user:', error)
      res.status(500).json({
        message: 'Internal server error!',
        error: error.message
      })
    })
}
