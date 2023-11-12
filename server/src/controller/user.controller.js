const User = require('../models/user.model');
const { CreatJWT, veryfiToken } = require('../middleware/JWTAction');
const bcrypt = require('bcrypt');

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


	if (checkLogin.length === 0) {
		return res.status(200).json({
			status: 'fail',
			reason: 'email/phone or password không đúng',
		});
	}
	const hashPassword = checkLogin[0].password;
	const comparePass = await bcrypt.compare(password, hashPassword);
	if (comparePass) {
		const token = CreatJWT({
			id: checkLogin[0]._id.toString(),
			username: checkLogin[0].username,
			password: password,
			email: email,
			image: checkLogin[0].image,
			description: checkLogin[0].description
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

	////kiểm tra lại chõ này
	const bodyCopy = req.body.param



	const tokenUser = CreatJWT({
		id:body.id,
		username: body.username,
		email: body.email,
		password: body.password,
		image: body.image,
		description: body.description
	});

	console.log('body request:', body);
	try {
		console.log('token request:', tokenUser);
		const hashPassword = await bcrypt.hash(body.password, 12);
		body.password = hashPassword;
		const updateProfile = await User.findOneAndUpdate(
			{ email: body.email },
			{
				username: body.username,
				email: body.email,
				password: body.password,
				image: body.image,
				description: body.description
			}
		);

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

module.exports = {
	handleSignup,
	handleLogin,
	handleLogout,
	handleValidateToken,
	handleUpdate,
};
