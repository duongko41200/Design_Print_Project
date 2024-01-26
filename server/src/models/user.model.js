const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'Please provide your name!'],
			trim: true,
		},

		image: {
			type: String,
			default: 'man.png',
		},
		backgroud: {
			type: String,
			default: 'users/default.jpg',
		},
		title: {
			type: String,
			default: 'Welcome to my channel',
		},
		email: {
			type: String,
			required: [true, 'Please provide your email!'],
			// validate: [validator.isEmail, 'Please provide a valid email!'],
			unique: true,
			lowercase: true,
		},
		description: {
			type: String,
			default: '',
		},

		role: {
			type: String,
			enum: ['admin', 'user'],
			default: 'user',
		},
		status: {
			type: String,
			enum: ['active', 'inactive'],
			default: 'active',
		},
		favoriteDesign: {
			type: Array,
			default: [],
		},
		password: {
			type: String,
			required: [true, 'Please provide your passsword!'],
			// validate: {
			// 	validator: function (value) {
			// 		// Additional validation logic if needed
			// 		return !this.oauthProvider || value.length >= 8;
			// 	},
			// 	message: 'Password must be at least 8 characters',
			// },
			// select: false,
		},
	
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);



const User = mongoose.model('User', userSchema);
module.exports = User;
