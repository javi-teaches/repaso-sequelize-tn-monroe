module.exports = (sequelize, dataTypes) => {
	const Category = sequelize.define('Categories', {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: dataTypes.STRING,
	});

	Category.associate = (models) => {
		Category.belongsToMany(models.Products, {
			as: 'products',
			through: 'category_product',
			foreignKey: 'category_id',
			otherKey: 'product_id'
		});
	}

	return Category;
}