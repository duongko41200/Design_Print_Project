import baseSidebar from '@/components/BaseSidebar/baseSidebar.vue';
import ImageAssetService from '@/sevices/imageAssets.service';
import ApiService from '@/sevices/api.service';
import { fabric } from 'fabric';
import { createNamespacedHelpers } from 'vuex';
import logoUser from '@/components/logoUser/logoUser.vue';
import { AvailableFontFamilies } from '@/Contant/WebFontConfig';
import WebFontConfig from '@/Contant/WebFontConfig';
import WebFont from 'webfontloader';
const authMappper = createNamespacedHelpers('auth');
const globalMappper = createNamespacedHelpers('global');
const productMappper = createNamespacedHelpers('product');
export default {
	components: {
		baseSidebar,
		logoUser,
	},
	data() {
		return {
			titleOption: 'Templates',
			contentOption: [],
			optionDesign: [
				{ icon: 'fa-solid fa-list', name: 'Templates', active: true },
				{ icon: 'fa-solid fa-shapes', name: 'Shapes', active: false },
				{ icon: 'fa-solid fa-image', name: 'Upload', active: false },
				{ icon: '', name: 'Pixabay', active: false },
				{ icon: 'fa-solid fa-font', name: 'Texts', active: false },
				{ icon: 'fa-solid fa-pencil', name: 'Draw', active: false },
			],
			isImage: true,

			//DEMO IMAGE LIST

			imagePixaBay: [],

			mode: 'front',

			//////////////////////-------TextBOx-------------------------
			isBoxEditText: false,
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

			fontFamilyOptions: [],

			/// Draw ////

			isDrawing: false, ///
			strokeDrawing: [
				{ stroke: '20', image: 'brushStroke1.svg', active: false },
				{ stroke: '15', image: 'brushStroke2.svg', active: false },
				{ stroke: '10', image: 'brushStroke3.svg', active: false },
				{ stroke: '5', image: 'brushStroke4.svg', active: false },
			],
		};
	},
	computed: {
		...authMappper.mapState(['email', 'userInfo']),
		...productMappper.mapState(['product']),
	},

	async mounted() {
		// this.contentOption = this.images;
		console.log('psjfiopjsdf', this.product.imageBack);
		this.canvas = await this.initCanvas(this.$refs.canvas);
		this.canvas.selection = true;
		this.setBackground();
		this.handleEvents();
		this.fontFamilyOptions = AvailableFontFamilies;
		WebFont.load(WebFontConfig);
	},

	methods: {
		...globalMappper.mapActions([
			'uploadImageByS3',
			'uploadImageByDesign',
		]),

		///canvas
		initCanvas(id) {
			return new fabric.Canvas(id, {
				preserveObjectStacking: true,
				width: 900,
				height: 600,
				backgroundColor: 'white',
			});
		},

		setBackground() {
			
			fabric.Image.fromURL(
				require(`@/uploadImage/${this.product.imageBack}`),
				(img) => {

					const imageWidth = img.width;
					const imageHeight = img.height;
					const left = (900 - imageWidth) / 2; 
					const top = (600 - imageHeight) / 2;
					img.set({
						selectable: false,
						scaleX: 1,
						scaleY: 1,
						top: top,
						left: left,
						mode: 'back',
					});
					this.canvas.add(img);
					this.canvas.renderAll();
				}
			);
			fabric.Image.fromURL(
				require(`@/uploadImage/${this.product.imageFront}`),
				(img) => {
					const imageWidth = img.width;
					const imageHeight = img.height;
					const left = (900 - imageWidth) / 2; 
					const top = (600 - imageHeight) / 2;
					img.set({
						selectable: false,
						scaleX: 1,
						scaleY: 1,
						top: top,
						left: left,
						mode: 'front',
					});
					this.canvas.add(img);
					this.canvas.renderAll();
				}
			);

			// console.log('canvas.getObjects()', canvas.getObjects());
		},

		onMoveHome() {
			this.$router.push('/');
		},

		/// choose option design
		async onMoveOption(idx, name) {
			this.optionDesign = this.optionDesign.map((value, i) => {
				if (i === idx) {
					value.active = true;
				} else {
					value.active = false;
				}
				return value;
			});
			this.titleOption = name;

			if (name === 'Templates') {
				this.isImage = true;
				this.imagePixaBay = [];
				this.contentOption = [];
				this.canvas.isDrawingMode = false;
				// this.contentOption = this.images;
			} else if (name === 'Upload') {
				this.isImage = true;
				this.imagePixaBay = [];
				this.canvas.isDrawingMode = false;
				const imageAsset = await ImageAssetService.getAllImagAsset({
					email: this.email,
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
				console.log('upload laf: ', upload);
				const imageUrl = upload.data.data;
				// const filename = upload.data.data.key;
				await ImageAssetService.createImagAsset({
					email: this.email,
					imageUrl: imageUrl,
					filename: this.userInfo.username,
				});

				const imageAsset = await ImageAssetService.getAllImagAsset({
					email: this.email,
				});
				setTimeout(() => {
					this.contentOption = imageAsset.data.data;

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
			var text = new fabric.Textbox('Chỉnh sửa tôi!', {
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
			pencilBrush.color = 'black';
			pencilBrush.width = parseInt(value.stroke);

			// Kích hoạt chế độ vẽ bằng bút
			this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
			this.canvas.freeDrawingBrush = pencilBrush;
			this.canvas.on('mouse:up', () => {
				if (this.isDrawing === true) {
					// add mode for canvas to handle font and back
					const object = this.canvas.getObjects();
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

		changeTextDesign() {
			console.log('da vaof changed text design');
			const deepCode = structuredClone(this.textDesign);
			this.textDesign = deepCode;
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
				if (activeObject && activeObject.type === 'text') {
					this.isBoxEditText = true;
					this.textDesign.textColor = activeObject.fill;
					this.textDesign.bgColor = activeObject.backgroundColor;
					this.textDesign.fontSize = activeObject.fontSize;
					this.textDesign.underline = activeObject.underline;
					this.textDesign.fontWeight = activeObject.fontWeight;
					this.textDesign.fontStyle = activeObject.fontStyle;
					this.textDesign.textAlign = activeObject.textAlign;
					this.textDesign.fontFamily = activeObject.fontFamily;
				}

				console.log('cavas value:', activeObject);
			});
			this.canvas.on('selection:updated', () => {
				let activeObject = this.canvas.getActiveObject();
				if (activeObject && activeObject.type === 'text') {
					this.isBoxEditText = true;
					this.textDesign.textColor = activeObject.fill;
					this.textDesign.bgColor = activeObject.backgroundColor;
					this.textDesign.fontSize = activeObject.fontSize;
					this.textDesign.underline = activeObject.underline;
					this.textDesign.fontWeight = activeObject.fontWeight;
					this.textDesign.fontStyle = activeObject.fontStyle;
					this.textDesign.textAlign = activeObject.textAlign;
					this.textDesign.fontFamily = activeObject.fontFamily;
				} else {
					this.isBoxEditText = false;
				}

				console.log('cavas value:', activeObject);
			});

			this.canvas.on('selection:cleared', () => {
				this.isBoxEditText = false;
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

				copiedObject.set('top', copiedObject.top + 20);
				copiedObject.set('left', copiedObject.left + 20);
				if (copiedObject) {
					// Thêm bản sao vào canvas
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
						// selectable: false,
						scaleX: 0.3,
						scaleY: 0.3,
						mode: this.mode,
					});
					this.canvas.add(img);
					this.canvas.renderAll();
				}
			);
		},
		onClickImageFixabay(image) {
			console.log('fixabay image', image);

			fabric.Image.fromURL(image.previewURL, (img) => {
				img.set({
					// selectable: false,
					mode: this.mode,
				});
				this.canvas.add(img);
				// this.canvas.renderAll()
			});
		},

		changeMode(mode) {
			this.mode = mode;

			console.log('get object mode', this.canvas.getObjects());

			this.canvas.getObjects().forEach((object) => {
				console.log('object:', object);
				object.visible = object.mode != mode ? false : true;
			});

			this.canvas.discardActiveObject();
			this.canvas.renderAll();
		},
	},

	watch: {
		textDesign() {
			let activeObject = this.canvas.getActiveObject();
			console.log('activeObject', activeObject);
			if (activeObject) {
				console.log('activeObject ádfsdfdsf', activeObject);
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
