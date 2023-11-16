const express = require('express');
const router = express.Router();
const ApiControl = require('../controller/user.controller');


const userApi = (app) => {
	router.post('/signup', ApiControl.handleSignup);
	router.post('/login', ApiControl.handleLogin);
	router.get('/logout', ApiControl.handleLogout);
	router.post('/validate', ApiControl.handleValidateToken)
	router.get('/findByUser', ApiControl.handleFindByUser)
	router.put('/update', ApiControl.handleUpdate)
	router.post('/creatFavoriteDesign', ApiControl.handleCreateFavoriteDesign)

	return app.use('/api/user', router);
};

module.exports = userApi;
