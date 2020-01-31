const db = require('../database/models');
const sequelize = db.sequelize;

const controller = {
	index: (req, res) => {
		db.Products
			.findAll({
				include: ['brand', 'user', 'categories']
			})
			.then(products => {
				return res.render('products/index', { products });
			})
			.catch(error => console.log(error));
	},

	create: (req, res) => {
		db.Brands
			.findAll()
			.then(brands => {
				db.Categories
					.findAll()
					.then(categories => {
						return res.render('products/create', { brands, categories });
					})
					.catch(error => console.log(error));
			})
			.catch(error => console.log(error));
	},

	store: (req, res) => {
		// return res.send(req.body);
		// req.body.user_id = req.session.user.id;
		req.body.user_id = 3;
		db.Products
			.create(req.body)
			.then(productSaved => {
				// let categories = req.body.categories;
				// for (const oneCategory of categories) {
				// 	// Guardar en la tabla pivot
				// 	db.CategoriesProducts
				// 		.create({
				// 			product_id: productSaved.id,
				// 			category_id: oneCategory
				// 		})
				// }
				res.redirect('/products');
			})
			.catch(error => console.log(error));
	}
}

module.exports = controller;