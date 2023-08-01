const multer = require('multer');
var sizeOf = require('image-size');
const fs = require('fs');

var upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, "./uploads");
    },
    filename: function(req, file, callback) {
      // callback(null, req.params.id + '.' + mime.extension(file.mimetype));
      callback(null, file.originalname);
    }
  })
}).array("file", 3); //Field name and max count

class Media {
  
  couch;
  express;
  util;
  generic;

  constructor(couch, express, util, generic){
    this.couch = couch;
    this.express = express;
    this.util = util;
    this.generic = generic;

    this.express.app.use('/uploads', this.express.express.static('uploads'));
    this.initializeEndpoints();
  }

  initializeEndpoints() {
    this.express.app.get('/services/uploads', function(req, res){
      try {
        fs.readdir('./uploads', (err, files) => {
          files = files.filter(i => i !== '.gitkeep')
          const payload = [];
          files.forEach(i => {
            payload.push({
              name: i,
              width: sizeOf('./uploads/' + i).width,
              height: sizeOf('./uploads/' + i).height
            })
          })
          res.send(payload);
        });
      } catch(err) {
        console.error(err)
        res.status(500).send({'500': 'error'});
      }
    });
    this.express.app.post('/services/uploads', function(req, res){
      upload(req, res, function(err, body) {
        if (err) {
          console.log(err);
          return res.status(400).send({ error: 'Could not upload file' });
        } else {
          res.send({'200': 'ok'});
        }
      });
    });
    this.express.app.delete('/services/uploads/:id', function(req, res){
      try {
        fs.unlinkSync('./uploads/' + req.params.id);
        res.send({'200': 'ok'});
      } catch(err) {
        console.error(err);
        res.status(500).send({'500': 'error'});
      }
    });
  }
}

module.exports = Media;