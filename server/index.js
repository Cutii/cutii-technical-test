
import express from 'express'
import { sequelize } from './db.js';
import apiRoutes from './routes/index.js';
const app = express()
const port = 3002

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(apiRoutes)

sequelize.sync().then(() => {
  app.listen(port, (err) => {
    if (err) console.error(`Failed to start server : ${err}`)
    console.log(`Server listening on port ${port}`)
  })
}).catch(err => console.error(`Failed to sync database : ${err}`))

