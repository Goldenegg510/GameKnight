module.exports = {
  getUserGroups: async (req, res) => {
    const db = req.app.get('db')
    const {user_id} = req.params
    const groups = await db.getUserGroups({user_id})
    if(groups !== []){
      res.status(200).send(groups)
    }
  }
}