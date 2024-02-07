const mongoose = require('mongoose');
// const Product = require('./product.model');
// const DesignPermission = require('./design.permission.model');
// const AppError = require('../utils/app.error');

const cartSchema = new mongoose.Schema(
	{

		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},
		design:[{
			type: mongoose.Schema.ObjectId,
			ref: 'Design',
			
		}],
		isPayment:{
			type: Boolean,
			default:false
		},
		sumCost: {
			type: Number,
			required:true
		}

	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);





const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
