const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db')
    const {email, username, password} = req.body
    const {session} = req
    let emailTaken = await db.checkEmail({email})
    emailTaken = +emailTaken[0].count
    if(emailTaken !== 0){
      return res.sendStatus(409)
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const user_id = await db.registerUser({
      username,
      email,
      hash
    })
    console.log(user_id)
    session.user={
      username,
      hash,
      login_id: user_id[0].user_id
    }
    res.sendStatus(200)
  },
  login: async (req, res) => {
    const db = req.app.get('db')
    const {session} = req
    const {loginUserName: username} = req.body
    try{
      let user = await db.login({username})
      session.user = user[0]
      
    }
  }
}