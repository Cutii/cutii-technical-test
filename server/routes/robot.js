import express from 'express';
import { Owner, Robot } from '../db.js';


const apiRoutes = express.Router();


// get all
apiRoutes.get('/', (req, res, next) => {
  return Robot.findAll({
    include: [{
      model: Owner,
      as: 'owner'
    }]
  })
    .then(robots => res.status(200).json({ success: true, robots }))
    .catch(err => { console.error(err); next() });
});

// get by name
apiRoutes.get('/:name', (req, res, next) => {
  const { name } = req.params;
  if (!name) return res.status(400).json({ success: false, reason: 'Missing name' }).catch(err => { console.error(err); next() });
  return Robot.findOne({
    where: {
      name
    }
  }).then(robot => {
    if (!robot) return res.status(400).json({ success: false, reason: 'Robot not found' });
    return res.status(200).json({ success: true, robot })
  })
});

// create
apiRoutes.post('/', (req, res, next) => {
  const { name, avatarUrl, ownerName } = req.body;
  if (!name || !avatarUrl || !ownerName) return res.status(400).json({ success: false, reason: 'Missing parameter' });
  return Robot.findOne({
    where: {
      name
    }
  }).then(robot => {
    if (robot) return res.status(400).json({ success: false, reason: 'Robot already exists' });

  }).then(() => Owner.findOne({
    where: {
      name: ownerName
    }
  }).then(owner => {
    if (!owner) return res.status(400).json({ success: false, reason: 'Owner not found' });
    return Robot.create({ name, avatarUrl })
      .then(robot => {
        robot.setOwner(owner);
        return robot;
      })
      .then(robot => res.status(201).json({ success: true, robot })).catch(err => { console.error(err); next() })
  }).catch(err => { console.error(err); next() }))

})


export default apiRoutes;