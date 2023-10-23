import baseSidebar from '@/components/BaseSidebar/baseSidebar.vue';
import ImageAssetService from '@/sevices/imageAssets.service';
import ApiService from '@/sevices/api.service';
import { fabric } from 'fabric';
import { createNamespacedHelpers } from 'vuex';
const authMappper = createNamespacedHelpers('auth');
const globalMappper = createNamespacedHelpers('global');
export default {
	components: {
		baseSidebar,
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

			//DEMO IMAGE LIST
			images: [
				{ image: 'https://source.unsplash.com/OyCl7Y4y0Bk' },
				{ image: 'https://source.unsplash.com/55btQzyDiO8' },
				{ image: 'https://source.unsplash.com/v1OW17UcR-Q' },
				{ image: 'https://source.unsplash.com/OyCl7Y4y0Bk' },
				{ image: 'https://source.unsplash.com/v1OW17UcR-Q' },
				{ image: 'https://source.unsplash.com/v1OW17UcR-Q' },
			],

			imagePixaBay: [],

			url: 'https://treobangron.com.vn/wp-content/uploads/2022/09/background-dep-5-2.jpg',

			currentMode: '',
			mousePressed: false,
			modes: {
				pan: 'pan',
				drawing: 'drawing',
				eraser: 'eraser',
			},



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
				fontFamily: '',
				fontSize: '40',
				textDecoration: '',
				textAlign: '',
				underline: false,
				fontWeight: '',
				fontStyle: '',
			},
		};
	},
	computed: {
		...authMappper.mapState(['email', 'userInfo']),
	},
	async mounted() {
		this.contentOption = this.images;
		this.canvas = await this.initCanvas(this.$refs.canvas);
		this.canvas.selection = true;
		// this.setPanEvents(this.canvas);
		// this.setBackground(this.url, this.canvas);
		this.handleEvents();
	},

	methods: {
		...globalMappper.mapActions(['uploadImageByS3']),

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
				this.imagePixaBay = [];
				this.contentOption = this.images;
			} else if (name === 'Upload') {
				this.imagePixaBay = [];
				const imageAsset = await ImageAssetService.getAllImagAsset({
					email: this.email,
				});
				console.log('imageAsset', imageAsset.data.data);
				this.contentOption = imageAsset.data.data;
			} else if (name === 'Pixabay') {
				this.contentOption = [];
				const pixaBay = await ApiService.pixaBay();
				this.imagePixaBay = pixaBay.data.hits;

				console.log('pixaBay', pixaBay);
			} else if (name === 'Texts') {
				this.contentOption = [];
				this.imagePixaBay = [];
				this.addHeading();
			} else if (name === 'Draw') {
				this.onToggleDraw(this.canvas);
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
				const upload = await this.uploadImageByS3(fileImageAsset);
				const imageUrl = upload.data.data.Location;
				const filename = upload.data.data.key;
				await ImageAssetService.createImagAsset({
					email: this.email,
					imageUrl: imageUrl,
					filename: filename,
				});

				const imageAsset = await ImageAssetService.getAllImagAsset({
					email: this.email,
				});

				this.contentOption = imageAsset.data.data;
				this.$toast.success('update image success', {
					position: 'top-right',
					duration: 2000,
				});
			} catch (error) {
				console.log({ error });
			}
		},

		///canvas
		initCanvas(id) {
			return new fabric.Canvas(id, {
				preserveObjectStacking: true,
				width: 600,
				height: 600,
				backgroundColor: 'green',
			});
		},


		onMoveHome() {
			this.$router.push('/');
		},

		addHeading() {
			var text = new fabric.Textbox('Chỉnh sửa tôi!', {
				type: 'text',

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

			text.on('editing:exited', () => {
				console.log('perform updates here!', text._savedProps);

				console.log('cavas value:', this.canvas.toJSON());
				// text.dirty = true;
				// text.set({ fill: 'red' });
				// this.canvas.requestRenderAll();
			});
		},

		// setPanEvents(canvas) {
		// 	canvas.on('mouse:move', (event) => {
		// 		// console.log(event)
		// 		// console.log('event mouse move: ', this.mousePressed);
		// 		if (this.mousePressed && this.currentMode === this.modes.pan) {
		// 			canvas.setCursor('grab');
		// 			canvas.renderAll();
		// 			const mEvent = event.e;
		// 			const delta = new fabric.Point(
		// 				mEvent.movementX,
		// 				mEvent.movementY
		// 			);
		// 			canvas.relativePan(delta);
		// 			console.log('canvas.getObjects()', canvas.getObjects());
		// 		} else if (
		// 			this.mousePressed &&
		// 			this.currentMode === this.modes.drawing
		// 		) {
		// 			canvas.isDrawingMode = true;
		// 			console.log('canvas.getObjects()', canvas.getObjects());
		// 		} else if (
		// 			this.mousePressed &&
		// 			this.currentMode == this.modes.eraser
		// 		) {
		// 			canvas.isDrawingMode = true;
		// 		}
		// 	});
		// 	// keep track of mouse down/up
		// 	this.canvas.on('mouse:down', () => {
		// 		this.mousePressed = true;
		// 		if (this.currentMode === this.modes.pan) {
		// 			canvas.setCursor('grab');
		// 		}
		// 	});
		// 	this.canvas.on('mouse:up', () => {
		// 		this.mousePressed = false;
		// 		canvas.setCursor('default');
		// 	});
		// },

		onToggleDraw() {
			if (this.currentMode != 'drawing') {
				console.log('this.currentMode', this.currentMode);
				this.currentMode = 'drawing';
				this.canvas.freeDrawingBrush.color = 'black'; //corlor
				this.canvas.freeDrawingBrush.width = 15;
				this.canvas.isDrawingMode = true;
			} else {
				console.log('currentMode', this.currentMode);
				this.currentMode = '';
				this.canvas.isDrawingMode = false;
			}
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
				} else {
					this.isBoxEditText = false;
				}

				console.log('cavas value:', activeObject);
			});

			this.canvas.on('selection:cleared', () => {
				this.isBoxEditText = false;
			});
		},

		onClickImageUpload(image) {
			console.log('uploading image', image);

			fabric.Image.fromURL(image.image, (img) => {
				// img.set({
				// 	selectable: false,
				// });
				this.canvas.add(img);
				// this.canvas.renderAll()
			});
		},
		onClickImageFixabay(image) {
			console.log('fixabay image', image);

			fabric.Image.fromURL(image.previewURL, (img) => {
				// img.set({
				// 	selectable: false,
				// });
				this.canvas.add(img);
				// this.canvas.renderAll()
			});
		},
	},

	watch: {
		textDesign() {
			let activeObject = this.canvas.getActiveObject();
			console.log('activeObject', activeObject);
			if (activeObject) {
				activeObject.set({
					fill: this.textDesign.textColor,
					backgroundColor: this.textDesign.bgColor,
					fontSize: parseInt(this.textDesign.fontSize),
					underline: this.textDesign.underline,
					fontWeight: this.textDesign.fontWeight,
					fontStyle: this.textDesign.fontStyle,
					textAlign: this.textDesign.textAlign,
				});
				this.canvas.requestRenderAll();
			}
		},
	},
};
