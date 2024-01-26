const mongoose = require('mongoose');
// const Product = require('./product.model');
// const DesignPermission = require('./design.permission.model');
// const AppError = require('../utils/app.error');

const collectionSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			default: 'Untitled',
			required: [true, 'Please provide your name!'],
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},
		upperBody: {
			type: mongoose.Schema.ObjectId,
			ref: 'Product',
			required: [true, 'A design should belong to a product'],
		},
		lowerBody: {
			type: mongoose.Schema.ObjectId,
			ref: 'Product',
			required: [true, 'A design should belong to a product'],
		},
		// product_export: Object,

		// objects: {
		// 	type: [Object],
		// 	default: [],
		// },
		// numberLike: {
		// 	type: Number,
		// 	default: 0,
		// },
		// userLike: {
		// 	type: Array,
		// 	default: [],
		// },

		isPublic: {
			type: String,
			default: 'public',
		}
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

designSchema.index({ name: 'text' });



const Collection = mongoose.model('Collection', collectionSchema);
module.exports = Collection;
