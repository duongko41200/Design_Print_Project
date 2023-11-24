const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please enter product name!'],
			trim: true,
			unique: [true, 'Duplicate product name'],
		},
		description: String,
		user: {
			required: true,
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
		imageFront: {
			type: String,
			required: [true, 'Product must have an front image'],
		},
		imageBack: {
			type: String,
			required: [true, 'Product must have an back image'],
		},
		thumbnail: {
			type: String,
		},
		numDesigns: {
			type: Number,
			default: 0,
		},
		status: {
			type: String,
			default: 'pending',
		}
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

productSchema.index({ name: 'text', email: 'text' });
productSchema.index({ numDesigns: -1 });

productSchema.pre('save', function (next) {
	if (!this.isNew) {
		return next();
	}

	if (!this.thumbnail || this.thumbnail === 'undefined') {
		this.thumbnail = this.image;
	}

	next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
