module.exports = (sequelize, dataTypes) => {
	const Product = sequelize.define('Products', {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: dataTypes.STRING,
		price: dataTypes.INTEGER,
		image: dataTypes.STRING,
		user_id: dataTypes.INTEGER,
		brand_id: dataTypes.INTEGER,
	});

	Product.associate = (models) => {
		Product.belongsTo(models.Brands, {
			as: 'brand',
			foreignKey: 'brand_id'
		});

		Product.belongsTo(models.Users, {
			as: 'user',
			foreignKey: 'user_id'
		});
		
		Product.belongsToMany(models.Categories, {
			as: 'categories',
			through: 'category_product',
			foreignKey: 'product_id',
			otherKey: 'category_id'
		});
	}

	return Product;
}