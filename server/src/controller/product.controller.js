const Product = require('../models/product.model');
const getAllProduct = async (req, res) => {
	const products = await Product.find({ isPublic: true }).populate('user').sort('-numDesigns')
	res.status(200).json({
		status: 'success',
		result: products.length,
		data: products,
	});

};

const UpdatesProduct = async (req, res) => {
	const product = req.body
	const updateProduct = await Product.findOneAndUpdate(
		{ _id: req.body.param.id },
		{ name: req.body.param.productName }
	);

	console.log("product:", product, updateProduct);
	res.status(200).json({
		status: 'success',
	})

};
const deleteProduct = async (req, res) => { 
	const param = req.query
	const products = await Product.find({ _id: param.productId })

	if (products[0].numDesigns > 0) {
		res.status(200).json({
			status: 'fail',
		})

	} else {
		const deleteProduct = await Product.deleteMany(
			{ _id: param.productId},
		
		);

		res.status(200).json({
			status: 'success',
		})
	
	}


	console.log("product:",products);

}

module.exports = {
	getAllProduct,
	UpdatesProduct,
	deleteProduct

};
