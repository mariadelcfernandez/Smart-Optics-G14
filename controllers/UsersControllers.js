import UserDaosMySQL from '../db/daos/userDaosMySQL.js'
import usersHelpers from '../helpers/helperUsers.js'
export default class UsersControllers {
  constructor() {
    this.db = new UserDaosMySQL()
    this.helpers = new usersHelpers()
  }
  
  getAllUsers = async (req, res) => {
    const users = await this.db.getAllUsers()
    res.json(users)
  }
  
  getUserByName = async (req, res) => {
    const { usuario } = req.query
    const result = await this.db.getUserByName(usuario)
    res.json(result)
  }

  getUserByID = async (req, res) => {
    const { id } = req.params
    const user = await this.db.getUserByID(id)
    res.json(user)
  }


  createUser = async (req, res) => {
    const user = this.helpers.parseUser(req.body)
    const result = await this.db.createUser(user)
    res.json(result)
  }

  updateUser = async (req, res) => {
    const data = this.helpers.parseUser(req.body)
    console.log("Controlador req.body",req.body)
    console.log("Controlador req.body",data)
    const result = await this.db.updateUser(data)
    res.json(result)
  }

  deleteUser = async (req, res) => {
    const { usuario } = req.query
    console.log(usuario)
    const result = await this.db.deleteUser(usuario)
    res.json(result)
  }
}
