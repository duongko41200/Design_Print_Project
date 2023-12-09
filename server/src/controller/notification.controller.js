const Design = require('../models/design.model');
const Product = require('../models/product.model');
const Notification = require('../models/notification.model');

const creatNotifica = async (req, res) => {
	const notification = await Notification.create(req.body);
	const list = await Notification.find({
		user_recive: req.body.user_recive,
	}).populate(['user_recive', 'user_request', 'design']);

	res.status(200).json({
		status: 'success',
		data: list,
	});
};

const updatNotifiShare = async (req, res) => {
	console.log('req.body: ', req.body.id);
	const updateNotifi = await Notification.updateMany(
		{ user_recive: req.body.id },
		{ $set: { is_readed: true } }
	);

	res.status(200).json({
		status: 'success',
	});
};

const updateStatusAcceptShare = async (req, res) => {
	console.log('req.body: ', req.body);
	const updateNotifi = await Notification.findOneAndUpdate(
		{ _id: req.body.notifiId},
		{ is_accept: req.body.is_accept }
	);

	res.status(200).json({
		status: 'success',
	});
};

const getAllByUser = async (req, res) => {

	console.log("req.query bsdffses:", req.query);
	const notification = await Notification.find({
		user_recive: req.query.id,
	}).populate(['user_recive', 'user_request', 'design']).sort({createdAt:-1});

	res.status(200).json({
		status: 'success',
		data: notification,
	});
};

module.exports = {
	creatNotifica,
	getAllByUser,
	updatNotifiShare,
	updateStatusAcceptShare,
};
