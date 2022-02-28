import express from 'express';
import { Owner, Robot } from '../db.js';

const apiRoutes = express.Router();

// create
apiRoutes.post('/', (req, res, next) => {
  const { name, avatarUrl } = req.body;

  if (!name || !avatarUrl) return res.status(400).json({ success: false, reason: 'Missing parameter' });
  return Owner.findOne({
    where: {
      name
    }
  }).then(owner => {
    if (owner) return res.status(400).json({ success: false, reason: 'Owner already exists' });
  }).then(() => Owner.create({ name, avatarUrl })
    .then(owner => res.status(201).json({ success: true, owner }))
    .catch(e => { console.error(e); return next() }))

})

// get all
apiRoutes.get('/', (req, res, next) => {
  return Owner.findAll({
    include: [{
      model: Robot,
    }]
  }).then(owners => res.status(200).json({ success: true, owners }))
    .catch(err => { console.error(err); next() });
})

// get by name
apiRoutes.get('/:name', (req, res, next) => {
  const { name } = req.params;
  if (!name) return res.status(400).json({ success: false, reason: 'Missing name' }).catch(err => { console.error(err); next() });
  return Owner.findOne({
    where: {
      name
    }
  }).then(owner => {
    if (!owner) return res.status(400).json({ success: false, reason: 'Owner not found' });
    return res.status(200).json({ success: true, owner })
  })
});


export default apiRoutes;