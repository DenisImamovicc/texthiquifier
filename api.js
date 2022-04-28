let http = require('http');
let formidable = require('formidable');
let fs = require('fs');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      let oldpath = files.filetoupload.filepath;
      let newpath = 'C:/Users/Denis/Desktop/Visual studio/Arbetsprov/Hiq-takeawaytest/files/' + files.filetoupload.originalFilename;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080, () =>
console.log(8080, `Api live at http://localhost:${8080}`)
);