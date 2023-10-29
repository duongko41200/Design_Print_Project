const Design = require('../models/design.model');
// const getAllProduct = async (req, res) => {
// 	const products = await Product.find({ isPublic: true }).sort('-numDesigns')
// 	res.status(200).json({
// 		status: 'success',
// 		result: products.length,
// 		data: products,
// 	});

// };
const createDesign = async (req, res) => {
	// res.body.user = req.body

	console.log("res.body jshfjsdhfjs", req.body);
	// console.log("res.body sdfsdfsdf", req.body.object)

	
	const newDesign = await Design.create(req.body);

	console.log("newDesign", newDesign);
	res.status(200).json({
		status: 'success',
		data: newDesign,
	});

};

module.exports = {
	createDesign,

};
