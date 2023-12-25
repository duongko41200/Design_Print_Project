const Design = require('../models/design.model');
const Product = require('../models/product.model');
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

	if (getDesign.length > 0) {
		const updateDesign = await Design.updateMany(
			{ _id: req.body.idDesign },
			req.body.params
		);
		console.log('updateDesign', updateDesign);
		res.status(200).json({
			status: 'success',
		});
	} else {
		const newDesign = await Design.create(req.body.params);

		console.log('newDesign', newDesign);
		res.status(200).json({
			status: 'success',
			data: newDesign,
		});
	}
};
const getAllDesignByUser = async (req, res) => {
	let listDesign = '';
	if (req.query.isPublic === 'public') {
		const listDesignByPublic = await Design.find({
			user: req.query.userId,
			isPublic: req.query.isPublic,
		}).populate(['user', 'product']);
		listDesign = listDesignByPublic;
	} else {
		const listDesignByAll = await Design.find({
			user: req.query.userId,
		}).populate(['user', 'product']);
		listDesign = listDesignByAll;
	}

	res.status(200).json({
		status: 'success',
		data: listDesign,
	});
};
const getAllDesignByProduct = async (req, res, next) => {
	const listDesign = await Design.find({
		product: req.query.productId,		
	}).populate(['user', 'product']);;

	res.status(200).json({
		status: 'success',
		data: listDesign,
	});
};
const deleteDesign = async (req, res) => {
	const id = req.query.idDesign;
	const user = req.query.userId;
	const productId = req.query.productId;

	console.log(
		'deleteDesign sjdhfkjsdhfkhfskjhfdjk:',
		id,
		user,
		productId
	);
	await Design.deleteMany({ _id: id });
	const product = await Product.find({ _id: productId });
	console.log('product deleted', product);
	if (!product) {
		return next(new AppError('No product found with that id', 404));
	}
	const count = product[0].numDesigns - 1;
	const updateProfile = await Product.findOneAndUpdate(
		{ _id: productId },
		{
			numDesigns: count,
		}
	);

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
	}).populate(['user','product']);

	// console.log(
	// 	'lise All Design :',
	// 	listDesign[0]
	// );

	res.status(200).json({
		status: 'success',
		data: listDesign,
	});
};

const likeDesign = async (req, res) => {
	// b1; tim thay design(id)
	// b2: cap nhap so like vaf nguoi like --lay duoc id nguowif like cho vao mang
	console.log('gia tri param: ', req.body);
	const designId = req.body.idDesign;
	const userId = req.body.idUser;
	const design = await Design.find({ _id: designId }).populate('user');
	let numberLike =
		parseInt(design[0].numberLike ? design[0].numberLike : 0) + 1;
	const array = design[0].userLike ? design[0].userLike : [];
	let userLike = [...array, userId];

	const updateDesign = await Design.updateMany(
		{ _id: designId },
		{ numberLike: numberLike, userLike: userLike }
	);

	res.status(200).json({
		status: 'success',
		data: {
			userLike: userLike,
			numberLike: numberLike,
		},
	});
};
const unLikeDesign = async (req, res) => {
	// b1; tim thay design(id)
	// b2: cap nhap so like vaf nguoi like --lay duoc id nguowif like cho vao mang
	console.log('gia tri param: ', req.body);
	const designId = req.body.idDesign;
	const userId = req.body.idUser;
	const design = await Design.find({ _id: designId }).populate('user');
	let numberLike =
		parseInt(design[0].numberLike ? design[0].numberLike : 0) - 1;
	const array = design[0].userLike ? design[0].userLike : [];

	let userLike = [];
	for (let i = 0; i < array.length; i++) {
		if (array[i] != userId) {
			userLike = [...userLike, array[i]];
		}
	}

	const updateDesign = await Design.updateMany(
		{ _id: designId },
		{ numberLike: numberLike, userLike: userLike }
	);

	res.status(200).json({
		status: 'success',
		data: {
			userLike: userLike,
			numberLike: numberLike,
		},
	});
};

/**
 * statistical Design and like
 */
const statisticalByDesign = async (req, res) => {
	// const designId = req.body.idDesign;
	const userId = req.query.idUser;
	const design = await Design.find({ user: userId });

	let sumLike = 0;
	for (let i = 0; i < design.length; i++) {
	
		sumLike = design[i].numberLike + sumLike;
	}

	res.status(200).json({
		status: 'success',
		data: {
			sumLike: sumLike,
			sumDesign: design.length,
		},
	});
};

module.exports = {
	createDesign,
	getAllDesignByUser,
	deleteDesign,
	findDesign,
	getAllDesign,
	likeDesign,
	unLikeDesign,
	statisticalByDesign,
	getAllDesignByProduct,
};
