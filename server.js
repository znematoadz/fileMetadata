'use strict';

const express = require('express'),
      cors = require('cors'),
      multer = require('multer');


let app = express();
let storage = multer.memoryStorage()
let upload = multer({ storage: storage })

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
})

app.use(function(req, res, next){
   res.status(404);
   res.type('txt').send('Not found');
 });

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
