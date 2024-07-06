import ClientDaosMySQL from '../db/daos/clientDaosMySQL.js'
import clientsHelpers from '../helpers/helperClients.js'
export default class ClientsControllers {
  constructor() {
    this.db = new ClientDaosMySQL()
    this.helpers = new clientsHelpers()
  }
  
  getAllClients = async (req, res) => {
    const clients = await this.db.getAllClients()
    res.json(clients)
  }
  
  getClientByName = async (req, res) => {
    const { correo } = req.query
    const result = await this.db.getClientByName(correo)
    res.json(result)
  }

  getClientByID = async (req, res) => {
    const { dni } = req.params
    const client = await this.db.getClientByID(dni)
    res.json(client)
  }


  createClient = async (req, res) => {
    const cliente = this.helpers.parseClient(req.body)
    //console.log(cliente)
    const result = await this.db.createClient(cliente)
    res.json(result)
  }

  updateClient = async (req, res) => {
    const data = this.helpers.parseClient(req.body)
    const result = await this.db.updateClient(data)
    res.json(result)
  }

  deleteClient = async (req, res) => {
    const { dni } = req.query
    const result = await this.db.deleteClient(dni)
    res.json(result)
  }
}
