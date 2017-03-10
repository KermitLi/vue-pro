const parse = require('co-busboy'),path = require('path'),fs = require('fs'),os = require('os');


module.exports = function *(next){
    var parts = parse(this);
    console.log(parts.length);
    var part;

  while ((part = yield parts)) {
    var uploadpath = path.join(__dirname,'../public/photo/'+part.filename);
    var stream = fs.createWriteStream(uploadpath);
    console.log('uploading %s -> %s', part.filename, stream.path);
    console.log(part);
  }
}
