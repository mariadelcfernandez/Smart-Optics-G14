import ClientsControllers from '../controllers/ClientsControllers.js'
import Routes from './Routes.js'
export default class ClientRoutes extends Routes {
  constructor() {
    super()
    this.controller = new ClientsControllers()
    this.getRoutes()
  }

  getRoutes() {
    this.router
      .get('/', this.controller.getAllClients)
      .get('/client', this.controller.getClientByName)
      .get('/:dni', this.controller.getClientByID)
      .put('/', this.controller.updateClient)
      .delete('/client', this.controller.deleteClient)
      .post('/', this.controller.createClient)
  }
}