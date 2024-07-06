import Producto from "../models/productsModel.js"
export default class productsHelpers{
  parseProduct(data){
    const{referencia, descripcion, categoria, imagen, stock, smin, costo, precio, estado} = data
    const CI = parseInt(categoria)
    const ST = parseInt(stock)
    const SM = parseInt(smin)
    const CS = parseFloat(costo)
    const PV = parseFloat(precio)
    const ES = parseInt(estado)
    const product = new Producto(referencia, descripcion, CI, imagen, ST, SM, CS, PV, ES)
    console.log("HElper: ", product)
    return product
  }
}