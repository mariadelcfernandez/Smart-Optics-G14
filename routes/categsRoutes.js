import CategsControllers from '../controllers/CategsControllers.js'
import Routes from './Routes.js'
export default class CategRoutes extends Routes {
  constructor() {
    super()
    this.controller = new CategsControllers()
    this.getRoutes()
  }

  getRoutes() {
    this.router
      .get('/', this.controller.getAllCategs)
      .get('/categ', this.controller.getCategByName)
      .get('/:id', this.controller.getCategByID)
      .put('/', this.controller.updateCateg)
      .delete('/categ', this.controller.deleteCateg)
      .post('/', this.controller.createCateg)
  }
}