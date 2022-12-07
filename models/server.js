const express = require("express");
const cors = require('cors')

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/users'

    //Middlewares
    this.middlewares();
    //App routes
    this.routes();
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
    this.app.use(this.usuariosPath, require('../routes/user'))      
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`escuchando en puerto ${this.port}`);
    });
  }
}

module.exports = Server;
