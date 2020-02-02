module.exports = (sequelize, dataTypes) => {
	const CategoryProduct = sequelize.define('CategoryProduct', {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		product_id: dataTypes.INTEGER,
		category_id: dataTypes.INTEGER,
	}, {
		tableName: 'category_product'
	});

	return CategoryProduct;
};