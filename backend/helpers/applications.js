class Applications {

  applicationPayload = ['name', 'colorHex', 'basePath'];

  couch;
  express;
  util;
  generic;

  constructor(couch, express, util, generic){
    this.couch = couch;
    this.express = express;
    this.util = util;
    this.generic = generic;
    this.generic.crud('applications', this.applicationPayload, ['create', 'update', 'delete']);

    this.express.app.post('/services/applications', (req, res) => {
      this.generic.create('applications', req, res, this.applicationPayload);
      setTimeout(() => process.exit(), 1000);
    });

    this.express.app.put('/services/applications/:id', (req, res) => {
      this.generic.update('applications', req, res, this.applicationPayload);
      setTimeout(() => process.exit(), 1000);
    });

    this.express.app.delete('/services/applications/:id', (req, res) => {
      this.generic.delete('applications', req, res);
      setTimeout(() => process.exit(), 1000);
    });
  }
}

module.exports = Applications;