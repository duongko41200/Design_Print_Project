import baseSidebar from '@/components/BaseSidebar/baseSidebar.vue';
import ImageAssetService from '@/sevices/imageAssets.service';
import ApiService from '@/sevices/api.service';
import ImageService from '@/sevices/image.service';
import DesignService from '@/sevices/design.service';
import { fabric } from 'fabric';
import { createNamespacedHelpers } from 'vuex';
import navbarDesign from '@/components/NavbarDesign/navbarDesign.vue';
import { AvailableFontFamilies } from '@/Contant/WebFontConfig';
import WebFontConfig from '@/Contant/WebFontConfig';
import WebFont from 'webfontloader';
import modalPreview from '@/components/ModalPreview/modalPreview.vue';
const authMappper = createNamespacedHelpers('auth');
const globalMappper = createNamespacedHelpers('global');
const productMappper = createNamespacedHelpers('product');
const designMappper = createNamespacedHelpers('design');
const imageAssetMappper = createNamespacedHelpers('imageAsset');
export default {
	components: {
		baseSidebar,
		navbarDesign,
		modalPreview,
	},
	data() {
		return {
			titleOption: 'Upload',
			contentOption: [],
			isShowPreview: false,
			countShowBgBack:0,
			typePreview: '',
			width: '',
			height: '',
			nameOption: '',
			optionDesign: [
				{ icon: 'fa-solid fa-image', name: 'Upload', active: true },
				{ icon: '', name: 'Pixabay', active: false },
				{ icon: 'fa-solid fa-font', name: 'Texts', active: false },
				{ icon: 'fa-solid fa-pencil', name: 'Draw', active: false },

				{ icon: 'fa-solid fa-shapes', name: 'Shapes', active: false },
			],
			isImage: true,
			showModalSave: false,
			imgPreviewFront: '',
			imgPreviewBack: '',
			imageUrlPixabay: '',

			//DEMO IMAGE LIST

			imagePixaBay: [],

			mode: 'front',

			// -------TextBOx------------------------- //
			customStyle: '',
			isBoldText: false,
			isItalicText: false,
			isAlignLeft: true,
			isAlignRight: false,
			isAlignCenter: false,
			isAlignjustify: false,

			textDesign: {
				textColor: 'black',
				bgColor: '',
				fontFamily: 'Roboto',
				fontSize: '40',
				textDecoration: '',
				textAlign: '',
				underline: false,
				fontWeight: '',
				fontStyle: '',
			},



			drawDesign: {
				color: 'black',
				stroke: '',
			},

			fontFamilyOptions: [],

			/// Draw ////

			isDrawing: false, 
			strokeDrawing: [
				{ stroke: '20', image: 'brushStroke1.svg', active: false },
				{ stroke: '15', image: 'brushStroke2.svg', active: false },
				{ stroke: '10', image: 'brushStroke3.svg', active: false },
				{ stroke: '5', image: 'brushStroke4.svg', active: false },
			],


			// shape //
			shapeDesign: {
				color: 'gray',
			},


			shapes: [
				{
					option: 'shapes',
					type: 'circle',
					image: 'tron.png',
				},
				{
					option: 'shapes',
					type: 'square',
					image: 'vuong.png',
				},
			],
		};
	},
	computed: {
		...authMappper.mapState(['email', 'userInfo']),
		...productMappper.mapState(['product']),
		...designMappper.mapState(['designEdit', 'infoDesign']),
		...imageAssetMappper.mapState(['allImageAssets']),
	},
	beforeDestroy() {
		// Gỡ bỏ sự kiện lắng nghe khi component bị hủy
		window.removeEventListener('popstate', this.handleBack);
	},

	async mounted() {
		const imageAsset = await ImageAssetService.getAllImagAsset({
			userId: this.userInfo.id,
		});
		this.contentOption = imageAsset.data.data;
		// console.log('imageAsset', imageAsset.data.data);

		const screenWidth = window.innerWidth;
		const screenHeight = window.innerHeight;
		this.width = screenWidth;
		this.height = screenHeight;

		window.document.body.style.paddingLeft = '0px';

		this.canvas = await this.initCanvas(this.$refs.canvas);
		// this.canvas.selection = true;
		window.addEventListener('popstate', this.handleBack);
		if (this.product && !this.designEdit ) {
			this.setBackgroundBack();
			this.setBackgroundFront();

			// this.changeMode(this.mode)
		}

		this.handleEvents();
		this.changeMode(this.mode)
		this.fontFamilyOptions = AvailableFontFamilies;
		WebFont.load(WebFontConfig);
	},

	methods: {
		...globalMappper.mapActions([
			'uploadImageByS3',
			'uploadImageByDesign',
		]),
		...productMappper.mapMutations(['SET_PRODUCT_MODEL']),
		...designMappper.mapMutations(['SET_INFO_DESIGN']),
		...imageAssetMappper.mapActions(['getAllImageAssets']),

		///canvas
		initCanvas(id) {
			const initCanvas = new fabric.Canvas(id, {
				preserveObjectStacking: true,
				width: this.width / 2,
				height: this.height - 200,
				backgroundColor: 'white',
			});

			// khi chọn vào sản phẩm để edit thì chạy cái này
			if (this.designEdit) {
				initCanvas?.loadFromJSON(this.designEdit);

				console.log('this.designEdit', this.designEdit)
			}

			return initCanvas;
		},

		setBackgroundFront() {
			fabric.Image.fromURL(
				require(`@/uploadImage/${this.product.imageFront}`),
				(img) => {
			
					// const imageWidth = img.width;
					// const imageHeight = img.height;
					// const left = (800 - imageWidth) / 2;
					// const top = (750 - imageHeight) / 2;
					const imageWidth = img.width;
					const imageHeight = img.height;
					const left = (this.width - imageWidth) / 5;
					const top = (this.height - imageHeight) / 10;
					img.set({
						selectable: false,
						scaleX: 0.6,
						scaleY: 0.6,
						top: top,
						left: left,
						mode: 'front',
					});
					this.canvas.add(img);
				}
			);
		},
		setBackgroundBack() {
			fabric.Image.fromURL(
				require(`@/uploadImage/${this.product.imageBack}`),
				(img) => {
					console.log('bACK');

					const imageWidth = img.width;
					const imageHeight = img.height;
					const left = (this.width - imageWidth) / 5;
					const top = (this.height - imageHeight) / 10;
					img.set({
						selectable: false,
						scaleX: 0.6,
						scaleY: 0.6,
						top: top,
						left: left,
						mode: 'back',
					});
					this.canvas.add(img);
					this.canvas.renderAll();
				}
			);
			``;
		},

		/// choose option design
		async onMoveOption(idx, name) {
			this.nameOption = name;
			this.optionDesign = this.optionDesign.map((value, i) => {
				if (i === idx) {
					value.active = true;
				} else {
					value.active = false;
				}
				return value;
			});
			this.titleOption = name;

			if (name === 'Upload') {
				this.isImage = true;
				this.imagePixaBay = [];
				this.canvas.isDrawingMode = false;
				const imageAsset = await ImageAssetService.getAllImagAsset({
					userId: this.userInfo.id,
				});
				console.log('imageAsset', imageAsset.data.data);
				this.contentOption = imageAsset.data.data;
			} else if (name === 'Pixabay') {
				this.isImage = true;
				this.contentOption = [];
				this.canvas.isDrawingMode = false;
				const pixaBay = await ApiService.pixaBay();
				this.imagePixaBay = pixaBay.data.hits;

				console.log('pixaBay', pixaBay);
			} else if (name === 'Texts') {
				this.contentOption = [];
				this.imagePixaBay = [];
				this.isImage = true;
				this.canvas.isDrawingMode = false;
				this.addHeading();
			} else if (name === 'Draw') {
				this.contentOption = [];
				this.imagePixaBay = [];
				this.isImage = false;
				// this.onToggleDraw(this.canvas);
			} else if (name === 'Shapes') {
				this.contentOption = [];
				this.imagePixaBay = [];
				this.isImage = true;
				this.contentOption = this.shapes;
				// this.onToggleDraw(this.canvas);
			} else {
				this.contentOption = [];
				this.imagePixaBay = [];
			}
		},

		//upload imageassets
		async uploadImageAsset(e) {
			e.preventDefault();
			const fileImageAsset = this.$refs.fileImageAsset;

			try {
				const upload = await this.uploadImageByDesign(fileImageAsset);
				console.log('upload: ', upload);
				const imageUrl = upload.data.data;
				// const filename = upload.data.data.key;
				await ImageAssetService.createImagAsset({
					email: this.email,
					imageUrl: imageUrl,
					filename: this.userInfo.username,
				});
				const imageAsset = await ImageAssetService.getAllImagAsset({
					userId: this.userInfo.id,

				});

				setTimeout( () => {
				
					

					const imageData = structuredClone(imageAsset.data.data)

					this.contentOption = imageData;

					console.log('content',this.contentOption)

					this.$toast.success('update image success', {
						position: 'top-right',
						duration: 2000,
					});
				}, 1000);
			} catch (error) {
				console.log({ error });
			}
		},

		addHeading() {
			var text = new fabric.Textbox('Add heading', {
				type: 'text',

				mode: this.mode,
				fontFamily: 'Roboto',
				opacity: 1,
				shadow: undefined,
				visible: true,
				backgroundColor: '',
				fillRule: 'nonzero',
				paintFirst: 'fill',
				fill: 'black',
				globalCompositeOperation: 'source-over',
				skewX: 0,
				skewY: 0,
				lineHeight: 1.16,
				overline: false,
				linethrough: false,
				textAlign: 'left',
				textBackgroundColor: '',
				charSpacing: 0,
				width: 300,
				splitByGrapheme: true,
				styles: {},
			});
			console.log('text : ', text);
			text.editable = true;

			this.canvas.add(text);
		},

		onClickStrokeDraw(value) {
			const deepCode = structuredClone(this.strokeDrawing);

			for (let i = 0; i < this.strokeDrawing.length; i++) {
				if (value.stroke === this.strokeDrawing[i].stroke) {
					this.strokeDrawing[i].active = !this.strokeDrawing[i].active;
				} else {
					this.strokeDrawing[i].active = false;
				}
			}
			this.isDrawing = !this.isDrawing;

			const pencilBrush = new fabric.PencilBrush(this.canvas);
			console.log({ pencilBrush });

			pencilBrush.color = 'black';
			pencilBrush.type = 'draw';

			pencilBrush.width = parseInt(value.stroke);

			// Kích hoạt chế độ vẽ bằng bút
			this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
			this.canvas.freeDrawingBrush = pencilBrush;

			//handle logic add mode vao cavans

			this.canvas.on('mouse:up', () => {
				if (this.isDrawing === true) {
					// add mode for canvas to handle font and back
					const object = this.canvas.getObjects();
					// object[0].type = 'draw';
					console.log('object', object);
					object.map((value) => {
						if (!value.mode) {
							value.mode = this.mode;
						}
					});
					this.strokeDrawing = deepCode;
					this.isDrawing = false;
				}

				this.canvas.isDrawingMode = false;
			});
		},



		// custom elements
		changeTextDesign() {
			const deepCode = structuredClone(this.textDesign);
			this.textDesign = deepCode;
		},

		changeShapeDesign() {
			let activeObject = this.canvas.getActiveObject();
			if (activeObject) {
				activeObject.set({
					fill: this.shapeDesign.color,
				});
				this.canvas.requestRenderAll();
			}
			this.canvas.requestRenderAll();

			console.log({ activeObject });
		},

		changeDrawDesign() {
	
			let activeObject = this.canvas.getActiveObject();

			if (activeObject) {
				activeObject.set({
					stroke: this.drawDesign.color,
					strokeWidth: this.drawDesign.stroke,
				});
				this.canvas.requestRenderAll();
			}
			this.canvas.requestRenderAll();

			console.log({ activeObject });
		},
		changeTextStyle(value) {
			switch (value) {
				case 'underline':
					this.textDesign.underline = !this.textDesign.underline;
					break;
				case 'bold':
					this.isBoldText = !this.isBoldText;
					this.textDesign.fontWeight = this.isBoldText ? 'bold' : '';
					break;
				case 'italic':
					this.isItalicText = !this.isItalicText;
					this.textDesign.fontStyle = this.isItalicText ? 'italic' : '';
					break;
				case 'align-left':
					this.isAlignLeft = true;
					(this.isAlignCenter = false),
						(this.isAlignRight = false),
						(this.isAlignjustify = false),
						(this.textDesign.textAlign = this.isAlignLeft
							? 'left'
							: '');
					break;
				case 'align-right':
					this.isAlignLeft = false;
					(this.isAlignCenter = false),
						(this.isAlignRight = true),
						(this.isAlignjustify = false),
						(this.textDesign.textAlign = this.isAlignRight
							? 'right'
							: '');
					break;
				case 'align-center':
					this.isAlignLeft = false;
					(this.isAlignCenter = true),
						(this.isAlignRight = false),
						(this.isAlignjustify = false),
						(this.textDesign.textAlign = this.isAlignCenter
							? 'center'
							: '');
					break;

				case 'align-justify':
					this.isAlignLeft = false;
					(this.isAlignCenter = false),
						(this.isAlignRight = false),
						(this.isAlignjustify = true),
						(this.textDesign.textAlign = this.isAlignjustify
							? 'justify'
							: '');
					break;

				default:
					break;
			}
			this.changeTextDesign();
		},



		handleEvents() {
			this.canvas.on('selection:created', () => {
				let activeObject = this.canvas.getActiveObject();
				console.log('activeObject sadasdasd : ', activeObject);

				
				if (activeObject && activeObject.type === 'text') {
					this.customStyle = 'text';
					this.textDesign.textColor = activeObject.fill;
					this.textDesign.bgColor = activeObject.backgroundColor;
					this.textDesign.fontSize = activeObject.fontSize;
					this.textDesign.underline = activeObject.underline;
					this.textDesign.fontWeight = activeObject.fontWeight;
					this.textDesign.fontStyle = activeObject.fontStyle;
					this.textDesign.textAlign = activeObject.textAlign;
					this.textDesign.fontFamily = activeObject.fontFamily;


				} else if (activeObject && activeObject.type === 'shape') {
					this.customStyle = 'shape';
					this.shapeDesign.color = activeObject.fill;
				} else if (
					activeObject &&
					activeObject.canvas.freeDrawingBrush.type === 'draw'
				) {
					this.customStyle = 'draw';
					this.shapeDesign.color = activeObject.fill;
					this.drawDesign.stroke = activeObject.strokeWidth;
					this.drawDesign.color = activeObject.stroke;
				}

				console.log('click value:', activeObject);
			});
			this.canvas.on('selection:updated', () => {
				let activeObject = this.canvas.getActiveObject();
				if (activeObject && activeObject.type === 'text') {
					this.customStyle = 'text';
					this.textDesign.textColor = activeObject.fill;
					this.textDesign.bgColor = activeObject.backgroundColor;
					this.textDesign.fontSize = activeObject.fontSize;
					this.textDesign.underline = activeObject.underline;
					this.textDesign.fontWeight = activeObject.fontWeight;
					this.textDesign.fontStyle = activeObject.fontStyle;
					this.textDesign.textAlign = activeObject.textAlign;
					this.textDesign.fontFamily = activeObject.fontFamily;
				} else if (activeObject && activeObject.type === 'shape') {
					this.customStyle = 'shape';
					this.shapeDesign.color = activeObject.fill;
				} else if (
					activeObject &&
					activeObject.canvas.freeDrawingBrush.type === 'draw'
				) {
					this.customStyle = 'draw';
					this.shapeDesign.color = activeObject.fill;
					this.drawDesign.stroke = activeObject.strokeWidth;
					this.drawDesign.color = activeObject.stroke;
				} else {
					this.customStyle = '';
				}

			});

			this.canvas.on('selection:cleared', () => {
				this.customStyle = '';
			});
		},

		deleteSelectedObject() {
			const activeObject = this.canvas.getActiveObject();
			if (activeObject) {
				this.canvas.remove(activeObject);
				this.canvas.renderAll();
			}
		},
		copySelectedObject() {
			let copiedObject = null;
			let activeObject = this.canvas.getActiveObject();
			if (activeObject) {
				// Tạo một bản sao của đối tượng

				copiedObject = fabric.util.object.clone(activeObject);

				console.log('copiedObject', copiedObject)

				copiedObject.set('top', copiedObject.top + 20);
				copiedObject.set('left', copiedObject.left + 20);
				if (copiedObject) {
	
					this.canvas.add(copiedObject);
					this.canvas.setActiveObject(copiedObject);
					this.canvas.requestRenderAll();
				}
			}
		},

		onClickImageUpload(image) {
			console.log('uploading image');

			fabric.Image.fromURL(
				require(`@/uploadImage/${image.image}`),
				(img) => {
					img.set({
						scaleX: 0.1,
						scaleY: 0.1,
						// width: 100,
						// height:200,
						mode: this.mode,
					});
					this.canvas.add(img);
					this.canvas.renderAll();
				}
			);
		},
		async onClickImageFixabay(image) {
			try {
				const imageRemote = await ImageService.getRemoteImage({
					url: image.previewURL,
				});
				console.log('imageRemote', imageRemote);
				fabric.Image.fromURL(imageRemote.data, (img) => {
					img.set({
						mode: this.mode,
					});
					this.canvas.add(img);
					// this.canvas.renderAll()
				});
			} catch (error) {
				console.log('error;', error);
			}
		},

		onClickShapes(shapes) {
			if (shapes.type === 'circle') {
				const circle = new fabric.Circle({
					type: 'shape',
					mode: this.mode,
					radius: 50, // Độ rộng của hình tròn
					fill: 'gray', // Màu sắc của hình tròn
					left: 100, // Tọa độ X
					top: 100, // Tọa độ Y
				});
				this.canvas.add(circle);
			} else if (shapes.type === 'square') {
				const square = new fabric.Rect({
					type: 'shape',
					mode: this.mode,
					width: 80, 
					height: 80, 
					fill: 'gray', 
					left: 200, 
					top: 150, 
				});
				this.canvas.add(square);
			}
		},


		changeMode(mode) {
			this.mode = mode;

			// if (this.mode == 'back' && this.countShowBgBack == 0) {
			// 	this.setBackgroundBack();
			// 	this.countShowBgBack ++
			// }

			console.log('get object mode', this.canvas.getObjects());

			this.canvas.getObjects().forEach((object) => {
				object.visible = object.mode != mode ? false : true;
			});

			this.canvas.discardActiveObject();
			this.canvas.renderAll();
		},

		///// handlle logic design

		handleBack() {
			// Thực hiện tác vụ khi nút "Back" được nhấn
			this.SET_PRODUCT_MODEL('');
			this.SET_INFO_DESIGN('');

			// Xóa tất cả các thành phần trên canvas
			this.canvas.clear();
		},
		openModeSave() {
			this.onPreviewDesign('front');
			this.onPreviewDesign('back');
			this.typePreview = 'save';

			this.isShowPreview = true;
		},
		oncloseModal() {
			this.isShowPreview = false;
			this.changeMode('front');
		},

		async clickSaveDesign(payload) {
			/**
			 * @param {name,description,userId,productId,object:"thong so design",thumbnailFront,thumbnailBack, isPublic}
			 */

			const object = this.canvas.getObjects();
		
			const json = this.canvas?.toJSON();
	
			const objectCanvas = JSON.parse(JSON.stringify(json));
	


			object.map((value, idx) => {
				objectCanvas.objects[idx].mode = value.mode;

			});

			// localStorage.setItem('canvas', JSON.stringify(objectCanvas));
			console.log('product:', this.product);

			const idDesign = this.infoDesign?._id;
			const idProduct = this.product
				? this.product.id
				: this.infoDesign.product;
			console.log('idDesign', idDesign);

			const params = {
				name: payload.name,
				description: payload.description,
				user: this.userInfo.id,
				product: idProduct,
				objects: objectCanvas.objects,
				thumbnailFront: this.imgPreviewFront,
				thumbnailBack: this.imgPreviewBack,
				isPublic: payload.status.type,
			};

			try {
				await DesignService.createDesignByProduct({ params, idDesign });
				this.oncloseModal();

				console.log('params:', params);

				this.$toast.success('saved success', {
					position: 'top-right',
					duration: 2000,
				});
				this.$router.push(`/userInfo`);

				// goi api them design

				this.SET_PRODUCT_MODEL(null);
			} catch (error) {
				console.log(error);
			}
		},

		// handle image Preview
		onPreviewDesign(mode) {
			const img = new Image();
			img.crossOrigin = 'Anonymous';

			//dung de loc anh mat truoc va mat sau
			this.canvas.getObjects().forEach((object) => {
				object.visible = object.mode == mode ? true : false;
			});

			this.canvas.renderAll();

			console.log('element canvas', this.canvas.getObjects());
			console.log('this.canvas', this.canvas);

			img.src = this.canvas.toDataURL({ format: 'png', quality: 1 });
			

			img.onload = () => {
				if (mode === 'front') {
					this.imgPreviewFront = img.src;
					console.log("img src", img.src);
				} else if (mode === 'back') {
					this.imgPreviewBack = img.src;
				}
			};
		},
		PreviewDesign() {
			this.onPreviewDesign('front');
			this.onPreviewDesign('back');
			this.typePreview = 'preview';

			this.isShowPreview = true;
		},
	},

	watch: {
		textDesign() {
			let activeObject = this.canvas.getActiveObject();

			if (activeObject) {
				activeObject.set({
					fill: this.textDesign.textColor,
					backgroundColor: this.textDesign.bgColor,
					fontSize: parseInt(this.textDesign.fontSize),
					underline: this.textDesign.underline,
					fontWeight: this.textDesign.fontWeight,
					fontStyle: this.textDesign.fontStyle,
					textAlign: this.textDesign.textAlign,
					fontFamily: this.textDesign.fontFamily,
				});
				this.canvas.requestRenderAll();
			}
		},

	},
};
