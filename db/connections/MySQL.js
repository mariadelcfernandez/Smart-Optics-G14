import mysql from 'mysql2'
import config from '../../config/MySqlConfig.js'
export default class Mysql {
  constructor() {
    this.connection = mysql.createConnection(config)
    this.connection.connect(err =>
      err
        ? console.error('No hay conexión')
        : console.log("Conectado con DB ")
    )
  }
}