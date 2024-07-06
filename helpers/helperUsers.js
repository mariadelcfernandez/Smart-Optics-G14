import User from "../models/usersModel.js"
export default class usersHelpers{
  parseUser(data){
    const{usuario, password, nombre, perfil, foto, estado} = data
    const estat = parseInt(estado)
    const user = new User(usuario, password, nombre, perfil, foto, estat)
    return user
  }
}