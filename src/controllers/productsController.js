const db = require('../database/models');
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

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
		req.body.user_id = Math.ceil(Math.random() * 3);
		db.Products
			.create(req.body)
			.then(productSaved => {
				productSaved.addCategories(req.body.categories);
				return res.redirect('/products');
			})
			.catch(error => console.log(error));
	},

	destroy: (req, res) => {
		db.Products
			.findByPk(req.params.id, {
				include: ['categories']
			})
			.then(product => {
				let categories = product.categories;
				categories.map(cat => {
					sequelize
						.query(`DELETE FROM category_product WHERE product_id = ${product.id} AND category_id = ${cat.id}`)
						.then(() => console.log('Done!'))
						.catch(() => console.log('Ups I did it again!'));
				});
				product.destroy();
				return res.status(200).redirect('/products');
			})
			.catch(() => console.log('Is the final count down!'));
	}
}

module.exports = controller;