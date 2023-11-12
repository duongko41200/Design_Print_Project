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

	const getDesign = await Design.find({ _id: req.body.idDesign });

	console.log('getDesign', getDesign);
	if (getDesign.length >0) {
		const updateDesign = await Design.updateMany({ _id: req.body.idDesign },req.body.params);
		console.log('updateDesign', updateDesign);
		res.status(200).json({
			status: 'success',
		});
	} else {
		const newDesign = await Design.create(req.body.params);

		console.log("newDesign", newDesign);
		res.status(200).json({
			status: 'success',
			data: newDesign,
		});
	}
};
const getAllDesignByUser = async (req, res) => {
	const listDesign = await Design.find({
		user: req.query.userId,
	}).populate('user');

	res.status(200).json({
		status: 'success',
		data: listDesign,
	});
};
const deleteDesign = async (req, res) => {
	const id = req.query.idDesign;
	const user = req.query.userId;
	await Design.deleteMany({ _id: id });
	const listDesign = await Design.find({ user: user }).populate('user');
	res.status(200).json({
		status: 'success',
		data: listDesign,
	});
};
const findDesign = async (req, res) => {
	const id = req.query.idDesign;
	const getDesign = await Design.find({ _id: id });
	res.status(200).json({
		status: 'success',
		data: getDesign,
	});
};

const getAllDesign = async (req, res) => { 
	const listDesign = await Design.find({
		isPublic: 'public',
	}).populate('user');

	console.log('lise All Design :',listDesign)

	res.status(200).json({
		status: 'success',
		data: listDesign,
	});

}

module.exports = {
	createDesign,
	getAllDesignByUser,
	deleteDesign,
	findDesign,
	getAllDesign
};
