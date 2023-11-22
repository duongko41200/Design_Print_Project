const Product = require('../models/product.model');
const getAllProduct = async (req, res) => {
	const products = await Product.find({ isPublic: true }).populate('user').sort('-numDesigns')
	res.status(200).json({
		status: 'success',
		result: products.length,
		data: products,
	});

};

module.exports = {
	getAllProduct,

};
