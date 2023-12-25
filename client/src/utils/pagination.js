const pagination = (list, limit, currentPage) => {
	const totalPages = Math.ceil(list.length / limit);

	const startIndex = (currentPage - 1) * limit;
	const endIndex = startIndex + limit;
	const result = list.slice(startIndex, endIndex);

	return {
		totalPages: totalPages,	
		data: result
	};
};

export { pagination };
