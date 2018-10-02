var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
// 引入商品信息数据库操作模型
var Goods = require("../models/goods.js");



// 连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/local");
mongoose.connection.on("connected",function () {
	console.log('MongodDB connected success');
});
mongoose.connection.on("error",function () {
	console.log('MongodDB connected false');
});
mongoose.connection.on("disconnected",function () {
	console.log('MongodDB connected disconnected');
});


// 得到用户商品列表接口
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//得到商品价格过滤接口
router.get("/list",function (req,res,next) {
	// res.send("hello,goods list");
	let sort =parseInt(req.param("sort"));
	let page = parseInt(req.param("page"));
	let pageSize = parseInt(req.param("pageSize"));
	let skip  = (page-1)*pageSize;
	let params = {};
	let priceLevel = req.param("priceLevel");
	let priceGt = "";
	let priceLte = "";
	if(priceLevel != "all") {
		switch (priceLevel) {
		case "0":
			priceGt = 0;
			priceLte = 100;
			break;
		case "1":
			priceGt = 100;
			priceLte = 500;
			break;
		case "2":
			priceGt = 500;
			priceLte = 1000;
			break;
		case "3":
			priceGt = 1000;
			priceLte = 5000;
			break;
	}
	params = {
		salePrice: {
			$gt:priceGt,
			$lte:priceLte
		}
	}
	}
	let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
	goodsModel.sort({"salePrice":sort})
	goodsModel.exec(function(err,doc) {
		if(err) {
			res.json({
				status:"1",
				msg:err.message
			});
		}else{
			res.json({
				status:"0",
				msg:"",
				result:{
					count:doc.length,
					list:doc
				}
			})
		}
	})
});
// 加入购物车接口
router.post("/addCart", function(req,res,next) {
	var userId= "100000077";
	var productId = req.body.productId;
	//console.log(productId);
	var User = require("../models/user.js");
	User.findOne({userId:userId},function(err,userDoc) {
		if(err) {
			res.json({
				status:"1",
				msg:err.message
			})
		}else {
			// console.log('userDoc:'+userDoc);
			if(userDoc) {
				let goodsItem = "";
				// console.log(userDoc);
				userDoc.cartList.forEach(function(item) {
					if (item.productId == productId) {
						goodsItem = item;
						item.productNum ++;
					}
				})
				if (goodsItem) {
					userDoc.save(function(err2,doc2) {
						if(err2) {
							res.json({
								status:"1",
								msg:err2.message
							})
						}else {
							res.json({
								status:"0",
								msg:"",
								result:"suc"
							})
						}
					})
				}
				else {
					Goods.findOne({productId:productId},function(err,doc) {
						if(err) {
							res.json({
								status:"1",
								msg:err.message
							})
						}else {
							if(doc) {
								doc.productNum = 1;
								doc.checked = 1;
								userDoc.cartList.push(doc);
								userDoc.save(function(err2,doc2) {
									if(err2) {
										res.json({
											status:"1",
											msg:err2.message
										})
									}else {
										res.json({
											status:"0",
											msg:"",
											result:"suc"

										})
									}
								})
							}
						}
				})}

			}
		}
	})
})


module.exports = router;