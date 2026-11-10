import { Sequelize, DataTypes } from 'sequelize';
import 'dotenv/config';
import getTarefaModel from './tarefa.js';
import pg from 'pg';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false }
  },
  logging: false, 
});

const models = {
  Tarefa: getTarefaModel(sequelize, DataTypes),
};

sequelize.sync();

export default models;