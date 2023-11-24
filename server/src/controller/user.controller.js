const User = require('../models/user.model');
const { CreatJWT, veryfiToken } = require('../middleware/JWTAction');
const bcrypt = require('bcrypt');
const Design = require('../models/design.model');

var checkEmail = (email) => {
	const emailRegexp =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	return emailRegexp.test(email);
};

var checkUserPassword = (password) => {
	var regex = /^[A-Za-z\d]{6,10}$/;
	return regex.test(password);
};
// var checkPhoneNumber = (phoneNumber) => {
//     var regex = /^0[0-9]{9}$/;
//     return regex.test(phoneNumber);
// }
const validateSignUp = (data) => {
	if (data.password == '' || data.username == '' || data.email == '') {
		return 'không được bỏ trống thông tin';
	} else if (data.username.length < 6) {
		return 'Kích thước username không đúng';
	} else if (!checkEmail(data.email)) {
		return 'Email không đúng định dạng';
	} else if (!checkUserPassword(data.password)) {
		return 'mật khẩu phải có trên 6 ký tự';
	} else if (data.password != data.comfirmPassword) {
		return 'comFirmPassword voi password không trùng khớp';
	}
};

const handleSignup = async (req, res) => {
	if (validateSignUp(req.body)) {
		return res.status(200).json({
			status: 'fail',
			reason: validateSignUp(req.body),
		});
	}

	const username = req.body.username;
	const password = req.body.password;
	const email = req.body.email;
	const findUser = await User.find({ email: email });

	if (findUser.length === 0) {
		const token = CreatJWT({
			username: username,
			password: password,
			email: email,
		});
		//mã howas password
		const hashPassword = await bcrypt.hash(password, 12);
		console.log('mã hóa', hashPassword);

		const createUser = await User.create({
			username,
			email,
			password: hashPassword,
		});
		return res.status(200).json({
			status: 'success',
			token: token,
			data: createUser,
		});
	} else {
		return res.status(200).json({
			status: 'fail',

			reason: 'email đã tồn tại',
		});
	}
};
const handleLogin = async (req, res) => {
	const password = req.body.password;
	const email = req.body.email;

	const checkLogin = await User.find({ email });

	/**
	 * đếm số design
	 * b1 lay id user
	 * b2 tim id user trong bang design
	 * b3 dem so design cua nguoi dung
	 */

	console.log('kjfksdjfkjsdkfdskf', checkLogin);
	if (checkLogin.length === 0) {
		return res.status(200).json({
			status: 'fail',
			reason: 'email/phone or password không đúng',
		});
	}
	const hashPassword = checkLogin[0].password;
	const comparePass = await bcrypt.compare(password, hashPassword);
	// console.log(comparePass,password, hashPassword)
	if (comparePass) {
		const token = CreatJWT({
			id: checkLogin[0]._id.toString(),
			username: checkLogin[0].username,
			password: password,
			email: email,
			image: checkLogin[0].image,
			role: checkLogin[0].role,
			description: checkLogin[0].description,
			favoriteDesign: checkLogin[0].favoriteDesign,
		});

		return res.status(200).json({
			status: 'success',
			token: token,
			data: checkLogin,
		});
	} else {
		return res.status(200).json({
			status: 'fail',
			reason: 'email/phone or password không đúng',
		});
	}
};

const handleUpdate = async (req, res) => {
	const body = req.body.param;

	console.log('body;', body);

	////kiểm tra lại chõ này
	const bodyCopy = req.body.param;

	const tokenUser = CreatJWT({
		id: body.id,
		username: body.username,
		email: body.email,
		password: body.password,
		image: body.image,
		role: body.role,
		description: body.description,
		favoriteDesign: body.favoriteDesign,
	});

	console.log('body request:', body);
	try {
		const hashPassword = await bcrypt.hash(body.password, 12);

		const user = await User.findOne({ email: body.email });
		if (user.password === body.password) {

			const updateProfile = await User.findOneAndUpdate(
				{ email: body.email },
				{
					username: body.username,
					email: body.email,
			
					image: body.image,
					role: body.role,
					description: body.description,
					favoriteDesign: body.favoriteDesign,
				}
			);
		} else {
			
			const updateProfile = await User.findOneAndUpdate(
				{ email: body.email },
				{
					username: body.username,
					email: body.email,
					password: hashPassword,
					image: body.image,
					role: body.role,
					description: body.description,
					favoriteDesign:body.favoriteDesign,
				}
			);
		}


		return res.status(200).json({
			status: 'success',
			token: tokenUser,
			data: bodyCopy,
		});
	} catch (error) {
		console.log('error', error);
	}
};

const handleLogout = (req, res) => {
	return res.status(200).json({
		status: 'success',
	});
};

const handleValidateToken = async (req, res) => {
	const token = await req.body.token;

	try {
		const validateToken = veryfiToken(token);
		console.log(validateToken);

		return res.status(200).json({
			status: 'success',
			data: validateToken,
		});
	} catch (error) {
		console.log({ error });
	}
};

const handleFindByUser = async (req, res) => {
	const _id = req.query.userId;
	const getUser = await User.find({ _id });
	console.log('user:', getUser);
	return res.status(200).json({
		status: 'success',
		data: getUser,
	});
};

const getAllUser = async (req, res) => {
	const getUser = await User.find();
	console.log('user dfsdfsdf:', getUser);
	return res.status(200).json({
		status: 'success',
		data: getUser,
	});
};
const handleDeleteByUser = async (req, res) => {
	const id = req.query.userId;
	await User.deleteMany({ _id: id });
	await Design.deleteMany({ user: id });
	res.status(200).json({
		status: 'success',
	});
};

const handleCreateFavoriteDesign = async (req, res) => {
	const uerId = req.body.userId;
	const designId = req.body.designId;
	console.log('user:', uerId, designId);

	const getUser = await User.find({ _id: uerId });
	console.log('getUser.favoriteDesign', getUser[0]);

	const listfavorite = getUser[0].favoriteDesign
		? getUser[0].favoriteDesign
		: [];

	const favoriteDesignArray = [...listfavorite, designId];
	console.log('favoriteDesign fdsfdsg:', favoriteDesignArray);

	const tokenUser = CreatJWT({
		id: getUser[0].id,
		username: getUser[0].username,
		email: getUser[0].email,
		password: getUser[0].password,
		image: getUser[0].image,
		role: getUser[0].role,
		description: getUser[0].description,
		favoriteDesign: favoriteDesignArray,
	});

	const updateListfavorite = await User.findOneAndUpdate(
		{ _id: uerId },
		{
			favoriteDesign: favoriteDesignArray,
		}
	);

	return res.status(200).json({
		status: 'success',
		token: tokenUser,
		data: {
			id: getUser[0].id,
			username: getUser[0].username,
			email: getUser[0].email,
			password: getUser[0].password,
			image: getUser[0].image,
			role: getUser[0].role,
			description: getUser[0].description,
			favoriteDesign: favoriteDesignArray,
		},
	});
};
const handleDeleteFavoriteDesign = async (req, res) => {
	const uerId = req.body.userId;
	const designId = req.body.designId;
	console.log('user:', uerId, designId);

	const getUser = await User.find({ _id: uerId });
	console.log('getUser.favoriteDesign', getUser[0]);

	const listfavorite = getUser[0].favoriteDesign
		? getUser[0].favoriteDesign
		: [];
	let favoriteDesignArray = [];
	for (let i = 0; i < listfavorite.length; i++) {
		if (listfavorite[i] !== designId) {
			favoriteDesignArray = [...favoriteDesignArray, listfavorite[i]];
		}
	}

	console.log('favoriteDesign delete:', favoriteDesignArray);

	const tokenUser = CreatJWT({
		id: getUser[0].id,
		username: getUser[0].username,
		email: getUser[0].email,
		password: getUser[0].password,
		image: getUser[0].image,
		role: getUser[0].role,
		description: getUser[0].description,
		favoriteDesign: favoriteDesignArray,
	});

	const updateListfavorite = await User.findOneAndUpdate(
		{ _id: uerId },
		{
			favoriteDesign: favoriteDesignArray,
		}
	);

	return res.status(200).json({
		status: 'success',
		token: tokenUser,
		data: {
			id: getUser[0].id,
			username: getUser[0].username,
			email: getUser[0].email,
			password: getUser[0].password,
			image: getUser[0].image,
			role: getUser[0].role,
			description: getUser[0].description,
			favoriteDesign: favoriteDesignArray,
		},
	});
};

module.exports = {
	handleSignup,
	handleLogin,
	handleLogout,
	handleValidateToken,
	handleUpdate,
	handleFindByUser,
	handleCreateFavoriteDesign,
	handleDeleteFavoriteDesign,
	getAllUser,
	handleDeleteByUser,
};
