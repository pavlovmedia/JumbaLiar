const Accounts = require('./helpers/accounts');
const Couch = require('./helpers/couch');
const Express = require('./helpers/express');
const Util = require('./helpers/util');
const Generic = require('./helpers/generic');
const Applications = require('./helpers/applications');
const Endpoints = require('./helpers/endpoints');
const Swagger = require('./helpers/swagger');
const Types = require('./helpers/types');
const Media = require('./helpers/media');
const Proxy = require('./helpers/proxy');
const Sse = require('./helpers/sse');


const util = new Util();
const couch = new Couch(util);
const express = new Express();
const generic = new Generic(couch, express, util);
const media = new Media(couch, express, util, generic);
const swagger = new Swagger(couch, util, express);
const accounts = new Accounts(couch, express, util, generic);
const applications = new Applications(couch, express, util, generic);
const endpoints = new Endpoints(couch, express, util, generic);
const types = new Types(couch, express, util, generic);
const proxy = new Proxy(couch, express, util, generic);
const sse = new Sse(couch, express, util, generic);


setTimeout(() => express.listen(), 1500);