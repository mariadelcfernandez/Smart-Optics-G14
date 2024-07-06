import 'dotenv/config'
import express from 'express'
import UserRoutes from '../routes/usersRoutes.js'
import CategRoutes from '../routes/categsRoutes.js'
import ClientRoutes from '../routes/clientsRoutes.js'
import ProductsRoutes from '../routes/productsRoutes.js'
export default class Server {
  static app = express()

  static middleWares() {
    Server.app
      .use(express.static('public'))
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
  }

  static routes() {
    const users = new UserRoutes()
    //const auths = new AuthRoutes()
    const categs = new CategRoutes()
    const clients = new ClientRoutes()
    const products = new ProductsRoutes()
    //Server.app.use("/auths", auths.router)
    Server.app.use("/users", users.router)
    Server.app.use("/categs", categs.router)
    Server.app.use("/clients", clients.router)
    Server.app.use("/products", products.router)
  }
  //static runServer(Puerto, ipAddr) {
  //Server.app.listen(Puerto, ipAddr, () =>
  static runServer(PORT) {
    Server.app.listen(PORT, () =>
      console.log(`escuchando en http://localhost:${PORT}`)
    )
  }

  static run(PORT) {
    console.clear()
    Server.middleWares()
    Server.routes()
    Server.runServer(PORT)
  }
}