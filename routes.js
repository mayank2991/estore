var _         = require("underscore");
var db 		  = require('./db');



exports.index = function(req, res) {
	db.getCategories(function(items) {
		res.render("index", { 
			_     : _, 
			title : "Welcome to EStore!",
			items : items
		});
	});
};

exports.hello = function(req, res) {
	db.getCategories(function(items) {
		res.render("hello", { 
			_     : _, 
			title : "Hello World!",
			items : items
		});
	});
};

exports.category = function(req, res) {
	db.getCategories(function(items) {
		res.render("category", { 
			_     : _, 
			title : req.params.data,
			items : items
		});
	});
};

exports.subcategory = function(req, res) {
	db.getCategories(function(items) {
		res.render("subcategory", { 
			_     : _, 
			title : req.params.data,
			items : items
		});
	});
};

exports.product = function(req, res) {
	db.getProducts(function(items) {
		db.getCategories(function(catitems) {
			res.render("product", { 
				_     : _, 
				title : req.params.data,
				items : items,
				catitems : catitems
			});
		});
	});
};

exports.showproduct = function(req, res) {
	db.getProducts(function(items) {
		db.getfeedbackdb(function(feedback_text) {
			res.render("pdp", { 
				_     : _, 
				title : req.params.data,
				items : items,
				feedback_text : feedback_text
			});
		});
	});
};

exports.thankyou = function(req, res) {
	res.render("thanks");
};

exports.cart = function(req, res, cookies) {
	db.getProducts(function(items) {
		db.getCategories(function(Categories) {
			res.render("cart", {
				_     : _,
				items : items,
				Categories : Categories,
				cookies : req.cookies.order
			});
		});
	});
};

// add order data
exports.order = function(req, res, next){
  db.orderdb(req);
  res.redirect('/thank-you');
};

exports.feedback = function(req, res, next){
  db.feedbackdb(req);
  res.redirect('/thank-you');
};

exports.productlist = function(req, res) {
	db.getProducts(function(items) {
        var Product = items;
		res.type('text/plain');
		res.json(Product);
	});
};
