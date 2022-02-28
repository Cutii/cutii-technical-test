import { DataTypes, Sequelize } from "sequelize";
import 'dotenv/config';

export const sequelize = new Sequelize(process.env.POSTGRES_URL)


sequelize.authenticate().then(() => console.log('Connection has been established successfully.')).catch(console.error)


export const Robot = sequelize.define('Robot', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true
  },
  avatarUrl: DataTypes.STRING,
}, { sequelize })


export const Owner = sequelize.define('Owner', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true
  },
  avatarUrl: DataTypes.STRING,
})

Robot.belongsTo(Owner, {as: 'owner'})
Owner.hasMany(Robot, { foreignKey: 'ownerId'} )