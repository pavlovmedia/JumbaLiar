const {application} = require('express');

class Swagger {
  swagger = require('swagger-ui-express');
  couch;
  util;
  express;
  swaggerDocument = require('../swagger.json');

  constructor(couch, util, express) {
    this.couch = couch;
    this.util = util;
    this.express = express;
    setTimeout(() => this.init(), 2000);
  }

  init() {
    console.log('Initializing Swagger JSON');
    this.couch.read('accounts').then(u => {
      this.couch.read('applications').then(a => {
        this.couch.read('types').then(t => {
          this.couch.read('endpoints').then(e => {
            const accounts = this.util.formatArrayReturn(u, true);
            const applications = this.util.formatArrayReturn(a, true);
            const types = this.util.formatArrayReturn(t, true);
            const endpoints = this.util.formatArrayReturn(e, true);

            types.forEach(type => {
              this.swaggerDocument.tags.push({name: type.name, description: 'Everything using the ' + type.name + ' type definition.'});
              this.initializeDefinition(type.name);
              this.swaggerDocument.definitions[type.name]['properties']['id'] = { type: 'string', readOnly: true };
              const parsedTypes = JSON.parse(type.definition);
              this.generateDefinitions(type.name, parsedTypes);
              this.swaggerDocument.definitions[type.name]['properties']['createdOn'] = { type: 'string', format: "date-time", readOnly: true };
              this.swaggerDocument.definitions[type.name]['properties']['updatedOn'] = { type: 'string', format: "date-time", readOnly: true };
            });
            
            let paths = this.swaggerDocument.paths;
            endpoints.forEach(endpoint => {
              let pathParams = endpoint.path.match(/:([a-z_]+)/gi);
              pathParams = pathParams ? pathParams.map(i => i.replace(':', '')) : [];
              
              const usedBy = [];
              endpoint.usedByIds.forEach(i => usedBy.push(applications.find(j => j.id === i)['name']));    
              const owner = accounts.find(i => i.id === endpoint.owner)['firstName'] + ' ' + accounts.find(i => i.id === endpoint.owner)['lastName'];
              let description = 'Created by ' + owner;
              if (usedBy.length > 0) {
                description = description + "\nUsed by " + usedBy.join(', ');
              }

              endpoint.path = endpoint.path.replace(/:([a-z_]+)/gi, '{$1}');
              if (!paths['/' + endpoint.path]) {
                paths['/' + endpoint.path] = {};
              }
              if (!paths['/' + endpoint.path][endpoint.method.toLowerCase()]) {
                paths['/' + endpoint.path][endpoint.method.toLowerCase()] = {};
              }
              if (!paths['/' + endpoint.path][endpoint.method.toLowerCase()]['responses']) {
                paths['/' + endpoint.path][endpoint.method.toLowerCase()]['responses'] = {};
              }
              if (!paths['/' + endpoint.path][endpoint.method.toLowerCase()]['parameters']) {
                paths['/' + endpoint.path][endpoint.method.toLowerCase()]['parameters'] = [];
              }
              paths['/' + endpoint.path][endpoint.method.toLowerCase()]['tags'] = [types.find(i => i.id === endpoint.typeId).name];
              paths['/' + endpoint.path][endpoint.method.toLowerCase()]['description'] = description;
              paths['/' + endpoint.path][endpoint.method.toLowerCase()]['produces'] = ["application/json"];
              paths['/' + endpoint.path][endpoint.method.toLowerCase()]['security'] = [{BearerAuth: []}];
              paths['/' + endpoint.path][endpoint.method.toLowerCase()]['responses']['200'] = {description: 'Success'};
              paths['/' + endpoint.path][endpoint.method.toLowerCase()]['responses']['403'] = {description: 'Forbidden'};
              
              pathParams.forEach(i => {
                paths['/' + endpoint.path][endpoint.method.toLowerCase()]['parameters'].push({name: i, in: 'path', required: true, type: 'string'});
              });

              this.setResponse(endpoint.conditionals[0].then[0].type, types, endpoint, paths);
            });
          });
        });
      });
    });
    setTimeout(() => {
      this.express.app.use('/swagger-ui', this.swagger.serve, this.swagger.setup(this.swaggerDocument));
    }, 0);
  }

  initializeDefinition(name) {
    const definition = {
      type: 'object',
      properties: {}
    }
    this.swaggerDocument.definitions[name] = definition;
  }

  generateDefinitions(name, types) {
    Object.keys(types).forEach(i => {
      if (typeof types[i] === 'object' && types[i] !== null) {
        let generatedName = i.toPascalCase();
        if (this.swaggerDocument.definitions[generatedName]) {
          generatedName = name + "-" + generatedName
        }
        this.initializeDefinition(generatedName);
        this.generateDefinitions(generatedName, types[i]);
        this.swaggerDocument.definitions[name]['properties'][i] = { "$ref": "#/definitions/" + generatedName};
      } else if (types[i] !== 'string' && types[i] !== 'number' && types[i] !== 'boolean') {
        this.swaggerDocument.definitions[name]['properties'][i] = { "$ref": "#/definitions/" + types[i]};
      } else {
        this.swaggerDocument.definitions[name]['properties'][i] = { type: types[i] };
      }
    })
  }

  setResponse(type, types, endpoint, paths) {
    const typeName = types.find(i => i.id === endpoint.typeId).name
    switch (type) {
      case 'returnObject':
        paths['/' + endpoint.path][endpoint.method.toLowerCase()]['responses']['200'] = {
          description: 'Success',
          schema: {
            $ref: "#/definitions/" + typeName
          }
        }
        return;
      case 'returnData':
        paths['/' + endpoint.path][endpoint.method.toLowerCase()]['responses']['200'] = {
          description: 'Success',
          schema: {
            type: "array",
            items: {
              "$ref": "#/definitions/" + typeName
            }
          }
        }
        return;
      case 'returnDataWhereKey':
        paths['/' + endpoint.path][endpoint.method.toLowerCase()]['responses']['200'] = {
          description: 'Success',
          schema: {
            type: "array",
            items: {
              "$ref": "#/definitions/" + typeName
            }
          }
        }
        return;
      case 'returnDataWhereIndex':
        paths['/' + endpoint.path][endpoint.method.toLowerCase()]['responses']['200'] = {
          description: 'Success',
          schema: {
            $ref: "#/definitions/" + typeName
          }
        }
        return;
      case 'returnDataWhereQuery':
        paths['/' + endpoint.path][endpoint.method.toLowerCase()]['parameters'].push({
          "in": "body",
          "name": "body",
          "required": true,
          "schema": {
            type: "array",
            items: {
              "$ref": "#/definitions/JsonFilter"
            }
          }
        });
        paths['/' + endpoint.path][endpoint.method.toLowerCase()]['responses']['200'] = {
          description: 'Success',
          schema: {
            type: "array",
            items: {
              "$ref": "#/definitions/" + typeName
            }
          }
        }
        return;
      case 'returnError':
        return;
      case 'pushBody':

        paths['/' + endpoint.path][endpoint.method.toLowerCase()]['parameters'].push({
          "in": "body",
          "name": "body",
          "required": true,
          "schema": {
            "$ref": "#/definitions/" + typeName
          }
        });
      
        paths['/' + endpoint.path][endpoint.method.toLowerCase()]['responses']['200'] = {
          description: 'Success',
          schema: {
            $ref: "#/definitions/" + typeName
          }
        }
        return;
      case 'updateData':

        paths['/' + endpoint.path][endpoint.method.toLowerCase()]['parameters'].push({
          "in": "body",
          "name": "body",
          "required": true,
          "schema": {
            "$ref": "#/definitions/" + typeName
          }
        });

        paths['/' + endpoint.path][endpoint.method.toLowerCase()]['responses']['200'] = {
          description: 'Success',
          schema: {
            $ref: "#/definitions/" + typeName
          }
        }
        return;
      case 'deleteData':
        paths['/' + endpoint.path][endpoint.method.toLowerCase()]['responses']['200'] = {
          description: 'true',
        }
        return;
      default:
        return;
    }
  }
  
}

String.prototype.toPascalCase = function() {
  return this
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      new RegExp(/\s+(.)(\w+)/, 'g'),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\s/, 'g'), '')
    .replace(new RegExp(/\w/), s => s.toUpperCase());
};

module.exports = Swagger;