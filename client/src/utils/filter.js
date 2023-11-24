const dayjs = require('dayjs');

const filterKeyWord = (list, keyWord) => {
	console.log(list,keyWord);
	const result = list.filter((item) => {
		console.log("lsdkflksdflk",item.name?.toLowerCase().includes(keyWord.toLowerCase()) );
		return item.name?.toLowerCase().includes(keyWord.toLowerCase())
			? item.name?.toLowerCase().includes(keyWord.toLowerCase())
			: item.username?.toLowerCase().includes(keyWord.toLowerCase()) || item.user?.username?.toLowerCase().includes(keyWord.toLowerCase());
	});
	return result;
};

const filterDate = (list, date) => {
	const result = list.filter((item) => {
		return (
			date[0] <= dayjs(item.updatedAt).unix() &&
			dayjs(item.updatedAt).unix() <= date[1]
		);
	});

	return result;
};
const filterCatalogeProduct = (list, cataloge) => {
	console.log('items', list);
	const result = list.filter((item) => {
		return item.product.name === cataloge;
	});
	return result;
};
const filterIsPublic = (list, statusPublics) => {
	const result = list.filter((item) => {
		console.log('item.product.name ', item.product.name);
		return item.isPublic === statusPublics;
	});

	return result;
};
const filterLike = (list, numberLike) => {
	console.log('items', list, numberLike);
	const result = list.filter((item) => {
		return item.numberLike <= numberLike;
	});

	return result;
};

export {
	filterKeyWord,
	filterCatalogeProduct,
	filterIsPublic,
	filterDate,
	filterLike,
};
