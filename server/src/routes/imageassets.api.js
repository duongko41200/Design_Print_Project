const express = require('express');
const router = express.Router();
const ImageAssetControl = require('../controller/imageassets.controller');


const imageAssetApi = (app) => {
	router.post('/upload', ImageAssetControl.creatImageAsset);
	router.get('/all', ImageAssetControl.getAllImages);
	router.delete('/delete', ImageAssetControl.deleteImageAsset);


	return app.use('/api/imageassets', router);
};

module.exports = imageAssetApi;
