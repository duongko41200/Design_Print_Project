const express = require('express');
const router = express.Router();
const NotificationControl = require('../controller/notification.controller');


const notificationApi = (app) => {

	router.post('/create', NotificationControl.creatNotifica);
	router.get('/allByUser', NotificationControl.getAllByUser)
	router.put('/updateNotifi', NotificationControl.updatNotifiShare)
	router.put('/updateStatusAccept', NotificationControl.updateStatusAcceptShare)

	return app.use('/api/notification', router);
};

module.exports = notificationApi;
