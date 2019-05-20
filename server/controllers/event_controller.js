module.exports = {
  getGroupEvents: async (req, res) => {
    const db = req.app.get('db')
    const {group_id} = req.params
    const groupEvents = await db.getGroupEvents({group_id})
      res.status(200).send(groupEvents)
  },
  addEvent: async (req, res) => {
    const db = req.app.get('db')
    const {event_date, group_id, place, time} = req.body
    const newEventId = await db.addEvent({event_date, group_id, place, time})
    if (newEventId[0].event_id > 0){
      res.status(200).send(newEventId)
    } else {
      res.sendStatus(500)
    }
  },
  getEventById: async (req, res) => {
    const db = req.app.get('db')
    const {new_event_id} = req.params
    const event = await db.getEventById({new_event_id})
    res.status(200).send(event[0])
  }
}