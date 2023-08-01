const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");

class Express {

  app;
  express;

  constructor() {
    this.app = app;
    this.express = express;
    this.init();
  }

  init() {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  }

  listen() {
    const server = app.listen(80, () => console.log(`JumbaLiar listening on port 80!`));
  }
}



module.exports = Express;