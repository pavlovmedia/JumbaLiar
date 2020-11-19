
class Generic {

  couch;
  express;
  util;

  constructor(couch, express, util) {
    this.couch = couch;
    this.express = express;
    this.util = util;
  }

  getAll(database, req, res, auth = true) {
    const validity = auth ? this.util.validateToken(req) : {status: 'success', id: 'NO_AUTH'};
    if (validity.status === 'success') {
      this.couch.read(database).then(couchReturn => {
        res.send( this.util.formatArrayReturn(couchReturn) );
      }, err => {
        res.status(500).send({'500': 'Internal Server Error', 'error': err});
      }); 
    } else {
      this.util.sendTokenError(validity.status, res);
    }
  }

  create(database, req, res, type, auth = true) {
    const validity = auth ? this.util.validateToken(req) : {status: 'success', id: 'NO_AUTH'};
    if (validity.status === 'success') {
      const payload = this.util.matchType(req.body, type);
      if (payload) {
        this.couch.create(database, payload).then(couchResponse => {
          if (res) {
            this.couch.read(database, this.util.id(couchResponse.id)).then(couchResponse2 => {
              res.send(this.util.formatSingleReturn(couchResponse2));
            });
          }
        });
      } else {
        if (res) { res.status(400).send({'400': 'Bad Request'}); }
      }
    } else {
      if (res) { this.util.sendTokenError(validity.status, res); }
    }
  }

  read(database, req, res, auth = true) {
    const validity = auth ? this.util.validateToken(req) : {status: 'success', id: 'NO_AUTH'};
    if (validity.status === 'success') {
      this.couch.read(database, this.util.id(req.params.id)).then(couchReturn => {
        const r = this.util.formatSingleReturn(couchReturn);
        r ? res.send(r) : res.status(404).send({'404': 'Not Found'});
      }, err => {
        res.status(500).send({'500': 'Internal Server Error', 'error': err});
      });
    } else {
      this.util.sendTokenError(validity.status, res);
    }
  }

  readIndex(database, index, req, res, auth = true) {
    const validity = auth ? this.util.validateToken(req) : {status: 'success', id: 'NO_AUTH'};
    if (validity.status === 'success') {
      this.couch.read(database).then(couchReturn => {
        res.send( this.util.formatArrayReturn(couchReturn)[index] );
      }, err => {
        res.status(500).send({'500': 'Internal Server Error', 'error': err});
      }); 
    } else {
      this.util.sendTokenError(validity.status, res);
    }
  }

  filter(database, filter, req, res, auth = true) {
    const validity = auth ? this.util.validateToken(req) : {status: 'success', id: 'NO_AUTH'};
    if (validity.status === 'success') {
      this.couch.read(database).then(couchReturn => {
        let filtered = this.util.formatArrayReturn(couchReturn);
        filter.forEach(i => filtered = this.util.filter(filtered, i) );
        if (filter.length === 0 && filter[0].fieldName === 'id' && filter[0].filterType === 'Equals') {
          if (filtered.length === 1) {
            res.send( filtered[0] );
          } else if (filtered.length === 0) {
            res.status(404).send({'404': 'Not Found'});
          } else {
            res.send( filtered );
          }
        } else {
          res.send( filtered );
        }
      }, err => {
        res.status(500).send({'500': 'Internal Server Error', 'error': err});
      }); 
    } else {
      this.util.sendTokenError(validity.status, res);
    }
  }

  update(database, req, res, type, auth = true) {
    const validity = auth ? this.util.validateToken(req) : {status: 'success', id: 'NO_AUTH'};
    if (validity.status === 'success') {
      const payload = this.util.matchType(req.body, type);
      if (payload && payload.id) {
        this.couch.read(database, this.util.id(payload.id)).then(dto => {
          const r = this.util.formatSingleReturn(dto, true);
          if (r) {
            this.couch.update(database, payload, r).then(couchResponse => {
              if (res) {
                this.couch.read(database, this.util.id(couchResponse.id)).then(couchResponse2 => {
                  res.send(this.util.formatSingleReturn(couchResponse2));
                });
              }
            });
          } else {
            res.status(404).send({'404': 'Not Found'});
          }
        }, err => {
          res.status(500).send({'500': 'Internal Server Error', 'error': err});
        });
      } else {
        res.status(400).send({'400': 'Bad Request'});
      }
    } else {
      this.util.sendTokenError(validity.status, res);
    }
  }

  delete(database, req, res, auth = true) {
    const validity = auth ? this.util.validateToken(req) : {status: 'success', id: 'NO_AUTH'};
    if (validity.status === 'success') {
      this.couch.read(database, this.util.id(req.params.id)).then(couchReturn => {
        const foundDTO = this.util.formatSingleReturn(couchReturn, true);
        if (foundDTO) {
          this.couch.delete(database, foundDTO._id, foundDTO._rev).then(() => {
            res.send(true);
          });
        } else {
          res.status(400).send({'400': 'Bad Request'});
        }
      });
    } else {
      this.util.sendTokenError(validity.status, res);
    }
  }

  crud(database, type, ignore = []) {

    this.couch.createDB(database.toLowerCase());

    if (ignore.indexOf('getAll') === -1) {
      this.express.app.get('/services/' + database, (req, res) => {
        this.getAll(database.toLowerCase(), req, res);
      });
    }
    if (ignore.indexOf('create') === -1) {
      this.express.app.post('/services/' + database, (req, res) => {
        this.create(database.toLowerCase(), req, res, type);
        if (database === 'types') { this.couch.createDB('data/' + req.body.name.toLowerCase()); }
      });
    }

    if (ignore.indexOf('read') === -1) {
      this.express.app.get('/services/' + database + '/:id', (req, res) => {
        this.read(database.toLowerCase(), req, res);
      });
    }

    if (ignore.indexOf('update') === -1) {
      this.express.app.put('/services/' + database + '/:id', (req, res) => {
        this.update(database.toLowerCase(), req, res, type);
      });
    }

    if (ignore.indexOf('delete') === -1) {
      this.express.app.delete('/services/' + database + '/:id', (req, res) => {
        this.delete(database.toLowerCase(), req, res);
        if (database === 'types') { 
          this.couch.read('types', this.util.id(req.params.id)).then(type => {
            const r = this.util.formatSingleReturn(type, true);
            if (r) {
              this.couch.deleteDB('data/' + r.name.toLowerCase()); 
            }
          })
        }
      });
   }
  }

}

module.exports = Generic;