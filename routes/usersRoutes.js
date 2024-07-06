import UsersControllers from '../controllers/UsersControllers.js'
import Routes from './Routes.js'
export default class UserRoutes extends Routes {
  constructor() {
    super()
    this.controller = new UsersControllers()
    this.getRoutes()
  }

  getRoutes() {
    this.router
      .get('/', this.controller.getAllUsers)
      .get('/user', this.controller.getUserByName)
      .get('/:id', this.controller.getUserByID)
      .put('/', this.controller.updateUser)
      .delete('/user', this.controller.deleteUser)
      .post('/', this.controller.createUser)
  }
}