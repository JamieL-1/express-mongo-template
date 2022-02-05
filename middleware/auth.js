const config = require('config')
const res = require('express/lib/response')
const jwt = require('jsonwebtoken')

const auth = () => {
  const token = req.header('x-auth-token')

  if (!token) return res.status(401).json({ msg: 'No token, authorisation denied' })

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded
    next()
  } catch (error) {
    res.status(400).json({ msg: 'invalid token' })
  }
}

module.exports = auth
