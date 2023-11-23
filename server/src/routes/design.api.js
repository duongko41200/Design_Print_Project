const express = require('express');
const router = express.Router();
const DesignControl = require('../controller/design.controller');


const DesignApi = (app) => {

	router.post('/create', DesignControl.createDesign);
	router.get('/all', DesignControl.getAllDesignByUser);
	router.delete('/delete', DesignControl.deleteDesign);
	router.get('/findDesign', DesignControl.findDesign);
	router.get('/allDesign', DesignControl.getAllDesign);
	router.get('/listDesignOfProduct', DesignControl.getAllDesignByProduct);
	// router.post('/SearchDesign', DesignControl.SearchDesign);
	router.put('/likeDesign', DesignControl.likeDesign);
	router.put('/unLikeDesign', DesignControl.unLikeDesign);
	router.get('/statisticalInfoByDesign', DesignControl.statisticalByDesign);
	

	return app.use('/api/design', router);
};

module.exports = DesignApi;
