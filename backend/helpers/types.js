class Types {

  typePayload = ['name', 'definition'];

  couch;
  express;
  util;
  generic;

  constructor(couch, express, util, generic){
    this.couch = couch;
    this.express = express;
    this.util = util;
    this.generic = generic;
    this.generic.crud('types', this.typePayload, ['create', 'update', 'delete']);

    this.express.app.post('/services/types', (req, res) => {
      this.generic.create('types', req, res, this.typePayload);
      this.couch.createDB('data/' + req.body.name.toLowerCase());
    });

    this.express.app.put('/services/types/:id', (req, res) => {
      this.generic.update('types', req, res, this.typePayload);
      setTimeout(() => process.exit(), 1000);
    });

    this.express.app.delete('/services/types/:id', (req, res) => {
      this.generic.delete('types', req, res);
      this.couch.read('types', this.util.id(req.params.id)).then(type => {
        const r = this.util.formatSingleReturn(type, true);
        if (r) {
          this.couch.deleteDB('data/' + r.name.toLowerCase()); 
        }
      })
    });

    setTimeout(() => this.initializeEndpoints(), 1000);
  }

  initializeEndpoints() {
    console.log('Initializing Types');
    this.couch.read('types').then(t => {
      const types = this.util.formatArrayReturn(t, true);
      types.forEach(type => {
        this.generic.crud('data/' + type.name, Object.keys(type.definition));
      });
    }) 
  }

}

module.exports = Types;