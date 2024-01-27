const Design = require('../models/design.model');
const Product = require('../models/product.model');

const Collection = require('../models/collection.model');
// const getAllProduct = async (req, res) => {
// 	const products = await Product.find({ isPublic: true }).sort('-numDesigns')
// 	res.status(200).json({
// 		status: 'success',
// 		result: products.length,
// 		data: products,
// 	});

// };
const createCollection = async (req, res) => {
	// res.body.user = req.body

		const newDesign = await Collection.create(req.body);

		console.log('newDesign', newDesign);
		res.status(200).json({
			status: 'success',
			data: newDesign,
		});
	
};

const getCollectionByUser = async (req, res) => {


	const collection = await Collection.find({
		user: req.query.userId
	}).populate(['upperBody','lowerBody','user'])

	// console.log('collection', collection)

	res.status(200).json({
		status: 'success',
		data: collection,
	});


}

const deleteCollection = async (req, res) => {

	console.log("collection delete", req.query)

	await Collection.deleteMany({ _id:  req.query.id });


	// const collection = await Collection.find({
	// 	user: req.query.userId
	// }).populate(['upperBody','lowerBody','user'])

	// // console.log('collection', collection)

	res.status(200).json({
		status: 'success',
		
	});


}


module.exports = {
	createCollection,
	getCollectionByUser,
	deleteCollection

};
