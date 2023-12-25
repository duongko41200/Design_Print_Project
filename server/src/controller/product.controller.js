const { response } = require('express');
const Product = require('../models/product.model');

const createProduct = async (req, res) => {
	const newDesign = await Product.create(req.body.param);

	console.log('newDesign', newDesign);
	res.status(200).json({
		status: 'success',
		data: newDesign,
	});
};

const getAllProduct = async (req, res) => {
	console.log('req ', req.query);

	if (req.query.status === 'accept') {
		const products = await Product.find({ status: 'accept' })
			.populate('user')
			.sort('-numDesigns');

		res.status(200).json({
			status: 'success',
			result: products.length,
			data: products,
		});
	} else {
		const products = await Product.find({ status: 'pending' })
			.populate('user')
			.sort('-numDesigns');
		res.status(200).json({
			status: 'success',
			result: products.length,
			data: products,
		});
	}
};
const getByProduct = async (req, res) => {
	if (req.query.status === 'accept') {
		const products = await Product.find({
			user: req.query.userId,
			status: 'accept',
		})
			.populate('user')
			.sort('-numDesigns');

		res.status(200).json({
			status: 'success',
			result: products.length,
			data: products,
		});
	} else {
		const products = await Product.find({
			user: req.query.userId,
			status: 'pending',
		})
			.populate('user')
			.sort('-numDesigns');

		res.status(200).json({
			status: 'success',
			result: products.length,
			data: products,
		});
	}
};

const UpdatesProduct = async (req, res) => {
	const product = req.body;
	const updateProduct = await Product.findOneAndUpdate(
		{ _id: req.body.param.id },
		{
			name: req.body.param.productName,
			description: req.body.param.description,
			status: req.body.param.status,
		}
	);

	console.log('product:', product, updateProduct);
	res.status(200).json({
		status: 'success',
	});
};
const deleteProduct = async (req, res) => {
	const param = req.query;
	const products = await Product.find({ _id: param.productId });

	if (products[0].numDesigns > 0) {
		res.status(200).json({
			status: 'fail',
		});
	} else {
		const deleteProduct = await Product.deleteMany({
			_id: param.productId,
		});

		res.status(200).json({
			status: 'success',
		});
	}

	console.log('product:', products);
};

module.exports = {
	getAllProduct,
	UpdatesProduct,
	deleteProduct,
	createProduct,
	getByProduct,
};
