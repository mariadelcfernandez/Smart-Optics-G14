import ProductDaosMySQL from '../db/daos/productDaosMySQL.js'
import productsHelpers from '../helpers/helperProducts.js'
export default class ProductsControllers {
  constructor() {
    this.db = new ProductDaosMySQL()
    this.helpers = new productsHelpers()
  }
  
  getAllProducts = async (req, res) => {
    const products = await this.db.getAllProducts()
    res.json(products)
  }
  
  getProductByName = async (req, res) => {
    const { descripcion } = req.query
    //console.log("by name: ", descripcion)
    const result = await this.db.getProductByName(descripcion)
    res.json(result)
  }

  getProductByID = async (req, res) => {
    const { referencia } = req.query
    //console.log("by ID: ", referencia)
    const product = await this.db.getProductByID(referencia)
    res.json(product)
  }


  createProduct = async (req, res) => {
    const product = this.helpers.parseProduct(req.body)
    //console.log("controller: ",product)
    const result = await this.db.createProduct(product)
    res.json(result)
  }

  updateProduct = async (req, res) => {
    const data = this.helpers.parseProduct(req.body)
    console.log("actualizando: ", data)
    const result = await this.db.updateProduct(data)
    res.json(result)
  }

  deleteProduct = async (req, res) => {
    const { referencia } = req.query
    console.log("Controller borrando: ", referencia)
    const result = await this.db.deleteProduct(referencia)
    res.json(result)
  }
}
