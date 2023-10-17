const express = require('express');
const router = express.Router();
// const ApiControl = require('../controller/user.controller');
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const uploadProfile = multer({ dest: '../client/src/assets/upload_Profile/' })//tai anh se vao thu muc nay
const path = require('path');

const { uploadFile, getFileStream } = require('../utills/s3')

const clientFolderPath = path.join(__dirname, '../../../client/src/assets/'); // Đường dẫn tới thư mục client

const imageFolderPath = path.join(clientFolderPath, 'upload_Profile');
const checkFilePath = (req, res, next) => {
	if (!fs.existsSync(imageFolderPath)) {
		fs.mkdirSync(`${imageFolderPath}`);
		console.log('đã tạo file thành công')
	}
	next();
	
}

const uploadImageByS3 = (app) => {
	
	router.post('/upload', upload.single('file'), async(req, res, next) => { 
		const file = req.file
	  
		const result = await uploadFile(file)
		console.log("result ; ksdjfkdsfjksdj", result)
		await unlinkFile(file.path)
		console.log("result", result)
		
		
		// const description = req.body.description
		res.status(200).json({
			status: 'success',
			data:result
			
		})
	});

	router.post('/uploadProfile',checkFilePath, uploadProfile.single('file'), async (req, res, next) => { 
		const tempPath = req.file.path
		const targetPath = `${imageFolderPath}/${req.file.originalname}`;
		fs.rename(tempPath, targetPath, (err) => {
			if (err) {
			  console.error(err);
			  return res.status(500).send('Lỗi khi lưu tệp.');
			}
			const pathImage = `upload_Profile/${req.file.originalname}`
		
			res.status(200).json({
				status: 'success',
				data:pathImage
				
			})
		  });
	
	});


	return app.use('/api/image', router);
};

module.exports = uploadImageByS3;
