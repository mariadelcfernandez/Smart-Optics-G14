import CategDaosMySQL from '../db/daos/categDaosMySQL.js'
import categsHelpers from '../helpers/helperCategs.js'
export default class CategsControllers {
  constructor() {
    this.db = new CategDaosMySQL()
    this.helpers = new categsHelpers()
  }
  
  getAllCategs = async (req, res) => {
    const categs = await this.db.getAllCategs()
    res.json(categs)
  }

  getCategByName = async (req, res) => {
    const { marca } = req.query
    const result = await this.db.getCategByName(marca)
    res.json(result)
  }

  getCategByID = async (req, res) => {
    const { id } = req.params
    const categ = await this.db.getCategByID(id)
    res.json(categ)
  }


  createCateg = async (req, res) => {
    const categ = this.helpers.parseCatego(req.body)
    const result = await this.db.createCateg(categ)
    res.json(result)
  }

  updateCateg = async (req, res) => {
    const data = this.helpers.parseCatego(req.body)
    const result = await this.db.updateCateg(data)
    res.json(result)
  }

  deleteCateg = async (req, res) => {
    const { categoria } = req.query
    const id = parseInt(categoria)
    const result = await this.db.deleteCateg(id)
    res.json(result)
  }
}
