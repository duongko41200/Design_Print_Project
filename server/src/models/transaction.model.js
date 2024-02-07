const mongoose = require('mongoose');
// const Product = require('./product.model');
// const DesignPermission = require('./design.permission.model');
// const AppError = require('../utils/app.error');

const transactionSchema = new mongoose.Schema(
	{

		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},
		cart:[{
			type: mongoose.Schema.ObjectId,
			ref: 'Cart',
			
		}],

	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);





const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
