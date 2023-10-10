const express = require('express');
const router = express.Router();
// const ApiControl = require('../controller/user.controller');
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile, getFileStream } = require('../utills/s3')

const uploadImageByS3 = (app) => {
	
	router.post('/upload', upload.single('file'), async(req, res, next) => { 
		const file = req.file
		console.log(file)
	  
		// apply filter
		// resize 
	  
		const result = await uploadFile(file)
		console.log("result ; ksdjfkdsfjksdj", result)
		await unlinkFile(file.path)
		console.log("result",result)
		const description = req.body.description
		res.send({imagePath: `/images/${result.Key}`})
	});


	return app.use('/api/image', router);
};

module.exports = uploadImageByS3;
