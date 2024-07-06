import MySql from "./../connections/MySQL.js";

export default class ClientDaosMySQL extends MySql {
  constructor() {
    super()
    this.table = "clientes"
  }

  async getAllClients(){
    const query = `SELECT * FROM ${this.table}`
    const [result] = await this.connection.promise().query(query)
    console.log(result)
    return result
  }

  async getClientByID(dni) {
    const query = `select * from ${this.table} where cl_dni = ${dni}`
    const [result] = await this.connection.promise().query(query)
    console.log(result)
    return result

  }

  async getClientByName(correo) {
    const query = `select * from ${this.table} where cl_correo = "${correo}"`
    const [result] = await this.connection.promise().query(query)
    console.log(result)
    return result

  }

  async createClient(client) {
    const query = `insert into ${this.table} (cl_correo, cl_contrasena, cl_dni, cl_nombres, cl_apellidos, cl_telefono, cl_direccion, cl_fecha_nac)
    values
    ("${client.correo}", "${client.password}", ${client.dni}, "${client.nombre}", "${client.apellido}", "${client.telefono}", "${client.direccion}", "${client.fenac}")`
    const [result] = await this.connection.promise().query(query)
    if(result.affectedRows = 1)
      return "Ok"
    else
      return "Error insertando"
  }
  
  async updateClient(data) {
    const query = `UPDATE ${this.table} SET
      cl_correo = "${data.correo}", 
      cl_contrasena = "${data.password}", 
      cl_nombres = "${data.nombre}", 
      cl_apellidos = "${data.apellido}", 
      cl_telefono = "${data.telefono}", 
      cl_direccion = "${data.direccion}", 
      cl_fecha_nac = "${data.fenac}"
      WHERE cl_dni = ${data.dni}`
      const [result] = await this.connection.promise().query(query)
      if(result.affectedRows = 1)
        return "Ok"
      else
        return "Error actualizando"
    
  }
  async deleteClient(dni) {
    const query = `DELETE FROM ${this.table} WHERE cl_dni = ${dni}`
    const [result] = await this.connection.promise().query(query)
    console.log(result)
    if(result.affectedRows = 1)
      return "Ok"
    else
      return "Error eliminando"
  }
}