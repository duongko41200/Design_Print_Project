const express = require('express');

const router = express.Router();
const request = require('request');
// const ApiControl = require('../controller/user.controller');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const uploadProfile = multer({
	dest: '../client/src/uploadImage/upload_Profile/',
}); //tai anh se vao thu muc nay
const uploadImageDesign = multer({
	dest: '../client/src/uploadImage/upload_Image_Design/',
}); //tai anh se vao thu muc nay
const path = require('path');

const { uploadFile, getFileStream } = require('../utills/s3');

const clientFolderPath = path.join(
	__dirname,
	'../../../client/src/uploadImage/'
); // Đường dẫn tới thư mục client

const imageFolderPath = path.join(clientFolderPath, 'upload_Profile');
const imageUploadDesign = path.join(
	clientFolderPath,
	'upload_Image_Design'
);
const checkFilePath = (req, res, next) => {
	if (!fs.existsSync(imageFolderPath)) {
		fs.mkdirSync(`${imageFolderPath}`);
		console.log('đã tạo file thành công');
	}
	next();
};
const checkImageExists = (path) => {
	try {
		fs.accessSync(path, fs.constants.F_OK);
		console.log('Checking image exists', path);
		return true; // Tệp tồn tại
	} catch (err) {
		return false; // Tệp không tồn tại
	}
};
const uploadImageByS3 = (app) => {
	router.post(
		'/upload',
		upload.single('file'),
		async (req, res, next) => {
			const file = req.file;

			const result = await uploadFile(file);
			console.log('result', result);
			await unlinkFile(file.path);
			console.log('result', result);

			// const description = req.body.description
			res.status(200).json({
				status: 'success',
				data: result,
			});
		}
	);

	router.post(
		'/uploadProfile',
		checkFilePath,
		uploadProfile.single('file'),
		async (req, res, next) => {
			const tempPath = req.file.path;
			const targetPath = `${imageFolderPath}/${req.file.originalname}`;
			console.log('targetPath: ', targetPath);
			fs.rename(tempPath, targetPath, (err) => {
				if (err) {
					console.error(err);
					return res.status(500).send('Lỗi khi lưu tệp.');
				}
				const pathImage = `upload_Profile/${req.file.originalname}`;

				res.status(200).json({
					status: 'success',
					data: pathImage,
				});
			});
		}
	);

	router.post(
		'/uploadImageDesign',
		checkFilePath,
		uploadImageDesign.single('file'),
		async (req, res, next) => {
			const tempPath = req.file.path;
			const targetPath = `${imageUploadDesign}/${req.file.originalname}`;
			console.log('targetPath: ', targetPath);

			const pathImage = `upload_Image_Design/${req.file.originalname}`;
			console.log('path name: ', pathImage);

			let isEist = false;
			fs.rename(tempPath, targetPath, (err) => {
				if (err) {
					console.error(err);
					return res.status(500).send('Lỗi khi lưu tệp.');
				}
			});

			while (isEist === false) {
				console.log(
					'checkImageExists(targetPath) ',
					checkImageExists(targetPath)
				);

				if (checkImageExists(targetPath) === true) {
					console.log(
						'checkImageExists(targetPath) ',
						checkImageExists(targetPath)
					);
					console.log('Image already exists');
					res.status(200).json({
						status: 'success',
						data: pathImage,
					});

					isEist = true;
				}
			}
		}
	);

	// fix 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported
	router.post('/get-remote-image', (req, res) => {
		const imageUrl = req.body.url; 
		request.get(imageUrl, { encoding: null }, (error, response, body) => {
			console.log("boday : ",body)
			if (!error && response.statusCode === 200) {
			  const base64Image = Buffer.from(body).toString('base64');
			  const dataUri = `data:image/jpeg;base64,${base64Image}`;
			  res.send(dataUri); // Send the Base64 image data to the client
			} else {
			  res.status(500).send('Error fetching image');
			}
		  });
	
	});

	return app.use('/api/image', router);
};

module.exports = uploadImageByS3;
