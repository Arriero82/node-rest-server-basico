const express = require("express");
const cors = require('cors');
const { DBconnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/users'
    this.authPath = '/api/auth'

    //Connect to db
    this.conectarDB() 

    //Middlewares
    this.middlewares();
    //App routes
    this.routes();
  }

  async conectarDB() {
    DBconnection()
  }

  middlewares() {
    //public directory
    this.app.use(express.static('public'))
    //CORS
    this.app.use(cors())
    //parseo y lectura del body
    this.app.use( express.json() );
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth'))
    this.app.use(this.usuariosPath, require('../routes/user'))      
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`escuchando en puerto ${this.port}`);
    });
  }
}

module.exports = Server;
