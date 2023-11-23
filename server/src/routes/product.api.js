const express = require('express');
const router = express.Router();
const ProductControl = require('../controller/product.controller');


const productApi = (app) => {

	router.get('/product', ProductControl.getAllProduct);
	router.put('/updateProduct', ProductControl.UpdatesProduct);
	router.delete('/deleteProduct', ProductControl.deleteProduct);

	return app.use('/api/model', router);
};

module.exports = productApi;
