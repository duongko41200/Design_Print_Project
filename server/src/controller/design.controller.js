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
const getAllDesignByUser = async (req, res) => {

	const listDesign = await Design.find({ user: req.query.userId }).populate('user');

	res.status(200).json({
		status: 'success',
		data: listDesign,
	});

};
const deleteDesign = async (req, res) => {
	const id = req.query.idDesign
	const user = req.query.userId

	console.log("req.body", req.query);
	const deleteDesign = await Design.deleteMany({ _id: id })
	const listDesign = await Design.find({ user: user}).populate('user');
	console.log("deleteDesign", deleteDesign)
	res.status(200).json({
		status: 'success',
		data: listDesign,
	});
}


module.exports = {
	createDesign,getAllDesignByUser, deleteDesign

};
