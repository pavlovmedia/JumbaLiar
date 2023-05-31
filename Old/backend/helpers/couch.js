
class Couch {
  couch = require('nano')('http://' + process.env.COUCHDB_USER + ':' + process.env.COUCHDB_PASSWORD + '@' + process.env.COUCHDB_URL);

  util;

  constructor(util) {
    this.util = util;
    this.init();
  }

  init() {

  }

  createDB(name) {
    this.couch.db.list().then(dbs => {
      if (dbs.indexOf(name) === -1) { 
        this.couch.db.create(name).then(j => {
          const indexDef = {
            index: { fields: ['id'] },
            name: 'id'
          };
          const db = this.couch.use(name);
          db.createIndex(indexDef).then((result) => {
            console.log(result);
          });
        }); 
      }
    });
  }

  deleteDB(name) {
    this.couch.db.destroy(name).then((result) => {
      console.log(result);
    });
  }

  listDBs() {
    return this.couch.db.list();
  }

  create(database, object) {
    object['createdOn'] = new Date();
    object['updatedOn'] = new Date();
    const db = this.couch.use(database);
    return db.insert(object);
  }

  read(database, selector) {
    const db = this.couch.use(database);
    return selector ? db.find(selector) : db.list({include_docs: true})
  }

  update(database, object, rawCouchObject) {
    const newObject = Object.assign(rawCouchObject, object);
    newObject['updatedOn'] = new Date();
    newObject['_id'] = rawCouchObject['_id'];
    newObject['_rev'] = rawCouchObject['_rev'];
    const db = this.couch.use(database);
    return db.insert(newObject);
  }

  delete(database, couchId, couchRev) {
    const db = this.couch.use(database);
    return db.destroy(couchId, couchRev);
  }
}



module.exports = Couch;