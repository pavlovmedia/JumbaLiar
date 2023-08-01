class Sse {

  SSE = require('express-sse');
  emitter = new this.SSE();;


  couch;
  express;
  util;
  generic;

  constructor(couch, express, util, generic){
    this.couch = couch;
    this.express = express;
    this.util = util;
    this.generic = generic;

    setTimeout(() => this.initialize(), 1500);
  }

  initialize() {
    console.log('Initializing SSE');
    this.couch.read('types').then(t => {
      const types = this.util.formatArrayReturn(t, true);
      types.forEach(type => { this.followDb(type.name) });

      this.express.app.get('/services/allsse', (req, res) => {
        res.send(types.map(i => i.name));
      });

      this.express.app.post('/services/allsse', this.emitter.init);
    });
  }

  followDb(name) {
    console.log('Listening to changes on: ' + name);
    const db = this.couch.couch.use('data/' + name.toLowerCase());
    var feed = db.follow({since: "now"});
    feed.on('change', (change) => {
      this.couch.read('data/' + name.toLowerCase(), this.util.id(change.id)).then(i => {
        const item = this.util.formatSingleReturn(i);
        if (item === undefined) {
          // Item was deleted
          this.emit({changeType: 'DELETED', dtoName: name, id: change.id});
        } else if (item.createdOn !== item.updatedOn) {
          // Item was updated
          this.emit({changeType: 'UPDATED', dtoName: name, id: change.id});
        } else if (item.createdOn === item.updatedOn) {
          // Item was created
          this.emit({changeType: 'CREATED', dtoName: name, id: change.id});
        }
      });
    });
    feed.follow();
  }

  emit(event) {
    this.emitter.serialize(event);
  }

}

module.exports = Sse;