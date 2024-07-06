import Catego from "../models/categsModel.js"
export default class categsHelpers {
  parseCatego(data) {
    let ID = 0
    const { uso, genero, material, montura, tipo, tratam, marca, id} = data
    const MA = marca.toUpperCase()
    if (id) {
      ID = parseInt(id)
    }
    console.log("ahora ID: ", ID)
    const categ = new Catego(uso, genero, material, montura, tipo, tratam, MA, ID)
    return categ
  }
}