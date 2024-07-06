import MySql from "./../connections/MySQL.js";

export default class UserDaosMySQL extends MySql {
  constructor() {
    super()
    this.table = "usuarios"
  }

  async getAllUsers(){
    const query = `SELECT * FROM ${this.table}`
    const [result] = await this.connection.promise().query(query)
    return result
  }

  async getUserByID(id) {
    const query = `select * from ${this.table} where u_id = ${id}`
    const [result] = await this.connection.promise().query(query)
    return result

  }

  async getUserByName(nombre) {
    const query = `select * from ${this.table} where u_usuario = "${nombre}"`
    const [result] = await this.connection.promise().query(query)
    return result

  }

  async createUser(user) {
    const query = `insert into ${this.table} (
    u_usuario, u_password, u_nombre, u_perfil, u_foto, u_estado)
    values
    ("${user.usuario}", "${user.password}", "${user.nombre}", "${user.perfil}", "${user.foto}", ${user.estado})`
    const [result] = await this.connection.promise().query(query)
    if(result.affectedRows = 1)
      return "Ok"
    else
      return "Error insertando"
  }
  async updateUser(data) {
    const query = `UPDATE ${this.table} SET
      u_password = "${data.password}", 
      u_nombre = "${data.nombre}", 
      u_perfil = "${data.perfil}", 
      u_foto = "${data.foto}", 
      u_estado = ${data.estado}
      WHERE u_usuario = "${data.usuario}"`
      const [result] = await this.connection.promise().query(query)
      if(result.affectedRows = 1)
        return "Ok"
      else
        return "Error actualizando"
    
  }
  async deleteUser(usuario) {
    console.log("Borrando: ", usuario)
    const query = `DELETE FROM ${this.table} WHERE u_usuario = "${usuario}"`
    const [result] = await this.connection.promise().query(query)
    console.log(query)
    console.log(result)
    if(result.affectedRows = 1)
      return "Ok"
    else
      return "Error eliminando"
  }
}