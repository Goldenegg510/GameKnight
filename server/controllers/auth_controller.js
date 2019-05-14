const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db')
    const { email, username, password } = req.body
    const { session } = req
    let emailTaken = await db.checkEmail({ email })
    emailTaken = +emailTaken[0].count
    if (emailTaken !== 0) {
      return res.sendStatus(409)
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const user_id = await db.registerUser({
      username,
      email,
      hash
    })
    session.user = {
      username,
      user_id: user_id[0].user_id
    }
    console.log(session.user.user_id)
    res.status(200).send({ user_id: session.user.user_id })
  },
  login: async (req, res) => {
    const db = req.app.get('db')
    const { session } = req
    const { loginUsername } = req.body
    try {
      let user = await db.login({ loginUsername })
      let { user_id, username, email } = user[0]
      session.user = { user_id, username, email }
      const authenticated = bcrypt.compareSync(req.body.loginPassword, user[0].password)
      if (authenticated) {
        res.status(200).send({ user_id, username, email, authenticated })
      } else {
        throw new error(401)
      }
    } catch (err) {
      res.sendStatus(401)
    }
  },
  update: (req, res) => {
    const db = req.app.get('db')
    const { session } = req
    const { newUsername, newPassword, newEmail, username, password, email } = req.body
    if (!newUsername) {
      newUsername = username
    }
    if (!newPassword) {
      newPassword = password
    } else {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(newPassword, salt)
    }
    if (!newEmail) {
      newEmail = email
    }
    const worked = db.updateUserDetails({ newUsername, newPassword, hash, })
  },
  userData(req, res) {
    const { user } = req.session;
    if (user) return res.status(200).send({ authenticated: true, user });
    else return res.sendStatus(401)
  }
}