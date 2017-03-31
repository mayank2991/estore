var mdbClient 	= require('mongodb').MongoClient;
var assert 		= require('assert');


exports.getCategories = function(cb){
	mdbClient.connect("mongodb://localhost:27017/dbcategories", function(err, db) {
		var collection = db.collection('categoriesdata');
		collection.find().toArray(function(err, items) {
			cb(items);
			db.close();
		});
	});
};

exports.getProducts = function(cb){
	mdbClient.connect("mongodb://localhost:27017/products", function(err, db) {
		var collection = db.collection('products');
		collection.find().toArray(function(err, items) {
			cb(items);
			db.close();
		});
	});	
};

var insertOrder = function(req, db, callback) {
   db.collection('orderdata').insertOne( {
         "product_name" : req.body.product_title,
         "product_price" : req.body.product_price,
         "product_qty" : req.body.product_qty
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback();
  });
};

exports.orderdb = function(req, cb){
	mdbClient.connect("mongodb://localhost:27017/order", function(err, db) {
		assert.equal(null, err);
		insertOrder(req, db, function() {
			db.close();
		});
	});
};

var insertFeedback = function(req, db, callback) {
   db.collection('feedbackData').insertOne( {
         "Name" : req.body.name,
         "Email" : req.body.email,
         "Title" : req.body.title,
		 "comment" : req.body.comment,
         "product" : req.body.product,
		 "date" : new Date().toLocaleString()
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Feedback add for"+ req.body.product +".");
    callback();
  });
};

exports.feedbackdb = function(req, cb){
	mdbClient.connect("mongodb://localhost:27017/feedback", function(err, db) {
		assert.equal(null, err);
		insertFeedback(req, db, function() {
			db.close();
		});		
	});
};

exports.getfeedbackdb = function(cb){
	mdbClient.connect("mongodb://localhost:27017/feedback", function(err, db) {
		var collection = db.collection('feedbackData');
		collection.find().toArray(function(err, feedback_text) {
			cb(feedback_text);
			db.close();
		});		
	});
};