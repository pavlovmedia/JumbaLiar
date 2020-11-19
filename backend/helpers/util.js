
class Util {

  jwt = require('jsonwebtoken');
  secret = 'changeme';

  constructor() {}

  generateToken(id) {
    return this.jwt.sign({ id: id }, this.secret, { expiresIn: 86400 });
  }

  validateToken(req) {
    const header = req.headers.authorization;
    if (header) {
      const auth = header.replace('access_token ', '');
      if (auth && auth !== '') {
        try {
          const decoded = this.jwt.verify(auth, this.secret);
          var current_time = new Date().getTime() / 1000;
          if (decoded && (current_time < decoded.exp)) {
            return {status: 'success', id: decoded.id};
          } else {
            return {status: 'expired', id: null};
          }
        } catch(e) {
          return {status: 'fail', id: null};
        }
      } else {
        return {status: 'none', id: null};
      }
    } else {
      return {status: 'none', id: null};
    }
  }

  sendTokenError(tokenStatus, res) {
    switch(tokenStatus) {
      case 'none':
        res.status(401).send({'401': 'Unauthorized'});
        return;
      case 'fail':
        res.status(401).send({'401': 'Unauthorized'});
        return;
      case 'expired':
        res.status(440).send({'440': 'Session Expired'});
        return;
      default:
        res.status(500).send({'500': 'Internal Server Error'});
        return;
    }
  }

  id(string) {
    return { selector: { "_id": string } };
  }

  email(string) {
    return { selector: { "email": string } };
  }

  filter(arr, jsonFilter) {
    console.log(jsonFilter);
    switch (jsonFilter['filterType']) {
      case 'StartsWith':
        return arr.filter(i => i[jsonFilter['fieldName']].startsWith(jsonFilter['check']));
      case 'EndsWith':
        return arr.filter(i => i[jsonFilter['fieldName']].startsWith(jsonFilter['check']));
      case 'Contains':
      case 'In':
        return arr.filter(i => i[jsonFilter['fieldName']].indexOf(jsonFilter['check']) !== -1);
      case 'Regex':
        return arr.filter(i => i[jsonFilter['fieldName']].test(jsonFilter['check']));
      case 'Equals':
      case 'LongEquals':
        return arr.filter(i => i[jsonFilter['fieldName']] === jsonFilter['check']);
      case 'NotEquals':
        return arr.filter(i => i[jsonFilter['fieldName']] !== jsonFilter['check']);
      case 'LongGreaterThan':
        return arr.filter(i => parseFloat(i[jsonFilter['fieldName']]) > parseFloat(i[jsonFilter['check']]));
      case 'LongGreaterThanOrEqual':
        return arr.filter(i => parseFloat(i[jsonFilter['fieldName']]) >= parseFloat(i[jsonFilter['check']]));
      case 'LongLessThan':
        return arr.filter(i => parseFloat(i[jsonFilter['fieldName']]) < parseFloat(i[jsonFilter['check']]));
      case 'LongLessThanOrEqual':
        return arr.filter(i => parseFloat(i[jsonFilter['fieldName']]) <= parseFloat(i[jsonFilter['check']]));
      default:
        return [];
    }
  }

  formatSingleReturn(object, allowMeta = false) {
    let docs = object.docs;
    docs = docs.filter(i => !i.language || i.language !== 'query');
    docs.forEach(i => i.id = i._id);
    if (!allowMeta) {
      docs.forEach(i => { 
        delete i._id;
        delete i._rev;
        delete i.password;
      });
    }
    return docs[0];
  }

  formatArrayReturn(object, allowMeta = false) {
    let docs = object.rows;
    docs = docs.map(i => i.doc);
    docs = docs.filter(i => !i.language || i.language !== 'query');
    docs.forEach(i => i.id = i._id);
    if (!allowMeta) {
      docs.forEach(i => { 
        delete i._id;
        delete i._rev;
        delete i.password;
      });
    }
    return docs;
  }

  matchType(inputObject, values) {
    let newObject = {};
    Object.keys(inputObject).forEach(key => {
      if (values.indexOf(key) !== -1 && inputObject[key] !== '') {
        newObject[key] = inputObject[key];
      }
    });
    if (inputObject['id']) { newObject['id'] = inputObject['id']}
    if (inputObject['createdOn']) { newObject['createdOn'] = inputObject['createdOn']}
    if (inputObject['updatedOn']) { newObject['updatedOn'] = inputObject['updatedOn']}
    return newObject;
  }


}

module.exports = Util;