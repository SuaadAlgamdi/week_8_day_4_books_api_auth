const jwt = require("jsonwebtoken")
const { User } = require("../models/User")

const chrckToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")
    if (!token) return res.status(401).send("token is required")

    ///--------------------------------------------------------------------------شغلته يفك التشفير ويتفقد ادا انا سيت التوكن --------------
    const decrytedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

    const userId = decrytedToken.sub
    const user = await User.findById(userId)
    if (!user) return res.status(404).send("token not found")
    req.userId = userId
    next()
  } catch (error) {
    res.status(500).send(error.message)
  }
}
module.exports = chrckToken
