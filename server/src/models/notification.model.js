const mongoose = require('mongoose');
const Design = require('./design.model');
const User = require('./user.model');
// const DesignPermission = require('./design.permission.model');
// const AppError = require('../utils/app.error');

const notificationSchema = new mongoose.Schema(
	{

		design: {
			type: mongoose.Schema.ObjectId,
			ref: 'Design',
			required: true,
		},
		user_request: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},
		user_recive: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},
		// product: {
		// 	type: mongoose.Schema.ObjectId,
		// 	ref: 'Product',
		// 	required: [true, 'A design should belong to a product'],
		// },
		// product_export: Object,

		is_readed: {
			type: Boolean,
			default: false,
		},
		is_accept: {
			type: String,
			default: '',
		},

		type: {
			type: String,
			required: true,

		},

		message: {
			type: String,
			required: true
	
		}
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);


const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
