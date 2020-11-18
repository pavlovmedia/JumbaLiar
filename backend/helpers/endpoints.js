class Endpoints {

  endpointPayload = ['path', 'method', 'owner', 'typeId', 'usedByIds', 'visibility', 'authorization', 'conditionals'];

  couch;
  express;
  util;
  generic;

  constructor(couch, express, util, generic){
    this.couch = couch;
    this.express = express;
    this.util = util;
    this.generic = generic;
    this.generic.crud('endpoints', this.endpointPayload, ['create', 'update', 'delete']);

    this.express.app.post('/services/endpoints', (req, res) => {
      this.generic.create('endpoints', req, res, this.endpointPayload);
      setTimeout(() => process.exit(), 1000);
    });

    this.express.app.put('/services/endpoints/:id', (req, res) => {
      this.generic.update('endpoints', req, res, this.endpointPayload);
      setTimeout(() => process.exit(), 1000);
    });

    this.express.app.post('/services/endpoints/bulk', (req, res) => {
      req.body.forEach(i => {
        const iterateReq = {...req};
        iterateReq.body = i;
        this.generic.create('endpoints', iterateReq, null, this.endpointPayload, false);
      });
      res.send(true);
      setTimeout(() => process.exit(), 2000);
    });

    this.express.app.delete('/services/endpoints/:id', (req, res) => {
      this.generic.delete('endpoints', req, res);
      setTimeout(() => process.exit(), 1000);
    });

    setTimeout(() => this.initializeEndpoints(), 1000);
  }

  initializeEndpoints() {
    console.log('Initializing Endpoints');
    this.couch.read('endpoints').then(e => {
      const endpoints = this.util.formatArrayReturn(e, true);
      endpoints.forEach(endpoint => {
        if (endpoint.visibility) {
          this.express.app[endpoint.method.toLowerCase()]('/services/' + endpoint.path, (req, res) => {            
            const conditionsMet = [];
            endpoint.conditionals.forEach(condition => {
              if (this.conditionMet(condition.if[0], req)) {
                conditionsMet.push(condition);
              }
            });
            conditionsMet.forEach(condition => {
              this.processCondition(condition.then[0], endpoint, req, res);
            });
          });
        }
      });
    }) 
  }

  conditionMet(condition, req) {
    switch (condition.type) {
      case '*':
        return true;
      case 'payload':
        return req.body === condition.body;
      case 'payloadKey':
        return req.body[condition.config] === condition.body;
      case 'user':
        return true;
      case 'pathParam':
        return req.params[condition.config] === condition.body;
      default:
        return false;
    }
  }

  processCondition(condition, endpoint, req, res) {
    this.couch.read('types').then(couchReturn => {
      const types = this.util.formatArrayReturn(couchReturn);
      const type = types.find(t => t.id === endpoint.typeId);
      const database = 'data/' + type.name.toLowerCase();
      const definition = Object.keys(JSON.parse(type.definition));

      switch (condition.type) {
        case 'pushBody':
          this.generic.create(database, req, res, definition, endpoint.authorization);
          return;
        case 'updateData':
          this.generic.update(database, req, res, definition, endpoint.authorization);
          return;
        case 'deleteData':
          this.generic.delete(database, req, res, endpoint.authorization);
          return;
        case 'returnObject':
          res.send(JSON.parse(condition.body));
          return;
        case 'returnData':
          this.generic.getAll(database, req, res, endpoint.authorization);
          return;
        case 'returnDataWhereKey':
          const newFilter = {
            fieldName: condition.config,
            filterType: condition.checkType,
            check: condition.body,
          };
          if (condition.body.indexOf(':') !== -1) {
            newFilter['check'] = req.params[condition.body.replace(':', '')];
          }
          this.generic.filter(database, newFilter, req, res, endpoint.authorization);
          return;
        case 'returnDataWhereIndex':
          const index = parseInt(condition.body, 10);
          this.generic.readIndex(database, index, req, res, endpoint.authorization);
          return;
        case 'returnDataWhereQuery':
          this.generic.filter(database, req.body, req, res, endpoint.authorization);
          return;
        case 'returnError':
          const send = {};
          send[condition.body] = "Conditional Error";
          res.status(condition.body).send(send);
          return;
      }

    });
  }
}

module.exports = Endpoints;