const express = require('express');
const router = express.Router();
const DesignControl = require('../controller/design.controller');


const DesignApi = (app) => {

	router.post('/create', DesignControl.createDesign);
	router.get('/all', DesignControl.getAllDesignByUser);
	router.delete('/delete', DesignControl.deleteDesign);
	router.get('/findDesign', DesignControl.findDesign);
	router.get('/allDesign', DesignControl.getAllDesign);
	router.post('/SearchDesign', DesignControl.SearchDesign);

	return app.use('/api/design', router);
};

module.exports = DesignApi;
