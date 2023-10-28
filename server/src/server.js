const express = require('express')
var cors = require('cors')
// const webRouter = require('./routes/routes')
const userApi = require("./routes/user.api")
const imageAssetApi = require("./routes/imageassets.api")
const uploadImageByS3 = require("./routes/image.api")
const productApi = require("./routes/product.api")
require('dotenv').config()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express()
const PORT = process.env.PORT ||3000
app.set('trust proxy', process.env.VM_INSTANCE_IP);

app.use(cors())
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'||'http://localhost:8081');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//setup sử dụng body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// call api
userApi(app)
uploadImageByS3(app)
imageAssetApi(app)
productApi(app)




mongoose
.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then(() => console.log('DB connection successfully!'))
  .catch(err => console.log('Error connecting to', err));




app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT} `)
  console.log("cổng ", process.env.PORT)

})