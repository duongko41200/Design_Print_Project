const express = require('express');
const router = express.Router();
const collectionControl = require('../controller/collection.controller');


const CollectionApi = (app) => {

	router.post('/create', collectionControl.createCollection);
	router.get('/collectionByUser', collectionControl.getCollectionByUser);
	router.delete('/deleteCollection', collectionControl.deleteCollection);

	

	return app.use('/api/collection', router);
};

module.exports = CollectionApi;
