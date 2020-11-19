
class Accounts {

  bcrypt = require('bcryptjs');

  loginPayload = ['email', 'password'];
  accountPayload = ['firstName', 'lastName','email', 'password', 'role'];

  couch;
  express;
  util;
  generic;

  constructor(couch, express, util, generic) {
    this.couch = couch;
    this.express = express;
    this.util = util;
    this.generic = generic;
    this.init();
  }

  init() {
    // Authorization
    this.express.app.post('/services/authorization/login', (req, res) => {
      const payload = this.util.matchType(req.body, this.loginPayload);
      if (payload) {
        this.couch.read('accounts', this.util.email(req.body.email)).then(account => {
          const r = this.util.formatSingleReturn(account, true);
          if (r) {
            const valid = this.bcrypt.compareSync(req.body.password, r.password);
            if (valid) {
              res.send({"token": this.util.generateToken(r.id)});
            } else {
              res.status(401).send({'401': 'Unauthorized'});
            }
          } else {
            res.status(401).send({'401': 'Unauthorized'});
          }
        });
      } else {
        res.status(400).send({'400': 'Bad Request'});
      }
    });

    // ME
    this.express.app.get('/services/authorization/me', (req, res) => {
      const validity = this.util.validateToken(req);
      if (validity.status === 'success') {
        this.couch.read('accounts', this.util.id(validity.id)).then(account => {
          const r = this.util.formatSingleReturn(account);
          r ? res.send(r) : res.status(404).send({'404': 'Not Found'});
        }, err => {
          res.status(500).send({'500': 'Internal Server Error', 'error': err});
        });
      } else {
        this.util.sendTokenError(validity.status, res);
      }
    });

    // Accounts 
    
   this.generic.crud('accounts', this.accountPayload, ['create']);

    // CREATE
    this.express.app.post('/services/accounts', (req, res) => {
      const payload = this.util.matchType(req.body, this.accountPayload);
      if (payload) {
        this.couch.read('accounts', this.util.email(req.body.email)).then(account => {
          const foundAccount = this.util.formatSingleReturn(account);
          if (!foundAccount) {
            payload.password = this.bcrypt.hashSync(payload.password, 8);
            this.couch.create('accounts', payload);
            res.send(true);
          } else {
            res.status(409).send({'409': 'Conflict'});
          }
        });
      } else {
        res.status(400).send({'400': 'Bad Request'});
      }
    });

  }
}

module.exports = Accounts;