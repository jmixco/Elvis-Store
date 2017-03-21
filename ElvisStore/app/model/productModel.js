var db = require('../db');


exports.create = function (name, cost, quantity) {
    return new Promise((resolve, reject) => {
        var product = new db.productModel({
            name: name,
            cost: cost,
            inStock: quantity
		});
		product.save((error) => {
			if (error) {
				reject(error);
			} else {
				resolve(product);
			}
		});
	});
}

exports.all = (sortField) => {
    if (!sortField) {
        sortField='name'
    }
    return new Promise((resolve, reject) => {
        db.productModel.find().sort({ [sortField]: 1 }).exec((error, products) => {
            if (error) {
                reject(error);
            } else {
                resolve(products);
            }
        });
    });
    
}
exports.filterByName = (name, sortField) => {
    if (!sortField) {
        sortField = 'name'
    }
    return new Promise((resolve, reject) => {
        db.productModel.find({ name: new RegExp(name, "i") }).sort({ [sortField]: 1 }).exec((error, products) => {
            if (error) {
                reject(error);
            } else {
                resolve(products);
            }
        });
    });
};
exports.findById = id => {
	return new Promise((resolve, reject) => {
		db.productModel.findById(id, (error, product) => {
			if (error) {
				reject(error);
			} else {
				resolve(product);
			}
		});
	});
};

exports.findByName = name => {
	return new Promise((resolve, reject) => {
		db.productModel.findOne({ name: name }, (error, product) => {
			if (error) {
				reject(error);
			} else {
				resolve(product);
			}
		});
	});
};

exports.buy = (productid, userid, quantity) => {
    return new Promise((resolve, reject) => {
        if (quantity <=0) {
            reject("Product quantity should be >0.");
        }
        this.findById(id)
            .then((product) => {
                if (!product) {
                    reject("Product not found.");
                }
                
                if (product.inStock >= quantity) {
                    product.inStock -= quantity;
                    product.save((error) => {
                        if (error) {
                            reject(error);
                        } else {
                            let phistory = new db.purchaseHistoryModel({
                                userId: userid,
                                productId: productid,
                                quantity,
                                unitCost:product.cost
                            });
                            phistory.save((error) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(phistory)
                                }
                            });
                        }
                    });
                } else {
                    reject("Not enough product in stock.");
                }
            })
            .catch((error) => {
                reject(error);
            });
        
    });
};