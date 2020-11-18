const axios = require('axios');
const https = require('https');

class Proxy {

  proxyUrls = [];

  couch;
  express;
  util;
  generic;

  constructor(couch, express, util, generic){
    this.couch = couch;
    this.express = express;
    this.util = util;
    this.generic = generic;

    setTimeout(() => {
      this.couch.read('applications').then(a => {
        const applications = this.util.formatArrayReturn(a, true);
        applications.forEach(i => {
          if (i.basePath && i.basePath !== '') {
            this.proxyUrls.push(i.basePath);
          }
        });
        this.express.app.get('*', (req, res) => { this.checkProxy(req, res); });
        this.express.app.post('*', (req, res) => { this.checkProxy(req, res); });
        this.express.app.put('*', (req, res) => { this.checkProxy(req, res); });
        this.express.app.delete('*', (req, res) => { this.checkProxy(req, res); });
        this.express.app.options('*', (req, res) => { this.checkProxy(req, res); });
        console.log('Proxy constructed with ' + this.proxyUrls.length + ' URL.');
      });
    }, 2000);
  }

  checkProxy(req, res) {
    const agent = new https.Agent({
      rejectUnauthorized: false
    });
    const headers = {
      'Content-Type': 'application/json'
    }
    if (req.headers['authorization']) {
      headers['authorization'] = req.headers['authorization'];
    }
    const promises = [];
    this.proxyUrls.forEach(i => {
      if (req.method.toLowerCase() === 'get') {
        promises.push(axios[req.method.toLowerCase()](`${i}${req.url}`, {httpsAgent: agent, headers: headers} ));
      } else {
        promises.push(axios[req.method.toLowerCase()](`${i}${req.url}`, req.body, {httpsAgent: agent, headers: headers} ));
      }
    });
  
    if (promises.length > 0) {
      let iteration = 0;
      let sent = 0;
  
      promises.
      map(promise => promise.
      then(i => {
        iteration++;
        if (sent === 0) {
          sent = 1;
          res.send(i.data);
        }
      }).
      catch(i => {
        iteration++;
        if (iteration === promises.length && sent === 0) {
          if (i.response) {
            const status = {};
            status[i.response.status] = i.response.data;
            res.status(i.response.status).send(status);
          } else {
            res.status(404).send({'404': 'Not Found'});
          }
          
        }
      }));
    } else {
      res.status(404).send({'404': 'Not Found'});
    }
  }

}

module.exports = Proxy;