import express from 'express';
import robotsRoutes from './robot.js';
import ownerRoutes from './owner.js';

const apiRoutes = express.Router();


apiRoutes
  .use('/robots', robotsRoutes)
  .use('/owners', ownerRoutes)



export default apiRoutes;