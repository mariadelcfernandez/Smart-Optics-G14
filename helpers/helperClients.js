import Client from "../models/clientsModel.js"
export default class clientsHelpers{
  parseClient(data){
    const{correo, password, dni, nombre, apellido, telefono, direccion, fenac} = data
    const CI = parseInt(dni)
    const client = new Client(correo, password, CI, nombre, apellido, telefono, direccion, fenac)
    console.log(client)
    return client
  }
}