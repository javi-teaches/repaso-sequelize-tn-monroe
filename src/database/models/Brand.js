module.exports = (sequelize, dataTypes) => {
	const Brand = sequelize.define('Brands', {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: dataTypes.STRING,
	});

	return Brand;
}