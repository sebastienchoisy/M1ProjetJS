const User = require("./model/User");
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
const jwt = require("jsonwebtoken");
const Order = require("./model/Order");

//var url = 'mongodb://localhost:27017/test';

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test';


MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	let dbo = db.db(dbName);
	if(!dbo.collection("users")) {
		dbo.createCollection("users", function (err) {
			if (err) throw err;
			db.close();
		});
	}
	if(!dbo.collection("orders")) {
		dbo.createCollection("orders", function (err) {
			if (err) throw err;
			console.log("Collection orders created!");
			db.close();
		});
	}
});

exports.connexionMongo = async () => {
	let client = await MongoClient.connect(url, { useNewUrlParser: true });
	let db = client.db(dbName);

	return db;
}

exports.countRestaurants = async (name) => {
	let client = await MongoClient.connect(url, { useNewUrlParser: true });
	let db = client.db(dbName);
	let reponse;

	try {
		if (name == '') {
			reponse = await db.collection('restaurants')
				.countDocuments();
		} else {
			let query = {
				"name": { $regex: ".*" + name + ".*", $options: "i" }
			}
			reponse = await db.collection('restaurants')
				.find(query)
				.count()
		}
	} catch (err) {
		reponse = {
			succes: false,
			error: err,
			msg: "erreur lors du count"
		};
	} finally {
		client.close();
		return reponse;
	}
};


exports.findRestaurants = async (page, pagesize, name) => {
	let client = await MongoClient.connect(url, { useNewUrlParser: true });
	let db = client.db(dbName);
	let reponse;

	try {
		let restaurants;
		let count;

		if (name == '') {
			restaurants = await db.collection('restaurants')
				.find()
				.skip(page * pagesize)
				.limit(pagesize)
				.toArray();

			count = await db.collection('restaurants').countDocuments();
		} else {
			let query = {
				"name": { $regex: ".*" + name + ".*", $options: "i" }
			}
			restaurants = await db.collection('restaurants')
				.find(query)
				.skip(page * pagesize)
				.limit(pagesize)
				.toArray();

			count = await db.collection('restaurants')
				.find(query)
				.count();
		}
		// On renvoie la réponse sous la forme d'une promesse (la fonction est async)
		reponse = {
			succes: true,
			msg: "restaurant recherchés avec succès",
			data: restaurants,
			count: count
		}
	} catch (err) {
		reponse = {
			succes: false,
			error: err,
			msg: "erreur lors du find"
		};
	} finally {
		client.close();
		return reponse;
	}
}


exports.findRestaurantById = async (id) => {
	let client = await MongoClient.connect(url, { useNewUrlParser: true });
	let db = client.db(dbName);
	let reponse;

	try {
		let myquery = { "_id": ObjectId(id) };

		let data = await db.collection("restaurants").findOne(myquery);

		reponse = {
			succes: true,
			restaurant: data,
			error: null,
			msg: "Details du restaurant envoyés"
		};
	} catch (err) {
		reponse = {
			succes: false,
			restaurant: null,
			error: err,
			msg: "erreur lors du find"
		};
	} finally {
		client.close();
		return reponse;
	}
}

exports.createRestaurant = async (formData) => {
	let client = await MongoClient.connect(url, { useNewUrlParser: true });
	let db = client.db(dbName);
	let reponse;

	try {
		let toInsert = {
			name: formData.nom,
			cuisine: formData.cuisine
		};
		let data = await db.collection("restaurants").insertOne(toInsert);
		reponse = {
			succes: true,
			result: toInsert._id,
			msg: "Ajout réussi " + toInsert._id
		};
	} catch (err) {
		reponse = {
			succes: false,
			error: err,
			msg: "erreur lors du insert"
		};
	} finally {
		client.close();
		return reponse;
	}
}

exports.updateRestaurant = async (id, formData) => {
	let client = await MongoClient.connect(url, { useNewUrlParser: true });
	let db = client.db(dbName);
	let reponse;

	try {
		let myquery = { "_id": ObjectId(id) };
		let newvalues = {
			$set: {
				name: formData.name,
				cuisine: formData.cuisine
			}
		};
		let result = await db.collection("restaurants").updateOne(myquery, newvalues);

		reponse = {
			succes: true,
			result: result,
			error: null,
			msg: "Modification réussie " + result
		};
	} catch (err) {
		reponse = {
			succes: false,
			error: err,
			msg: "Problème à la modification"
		};
	} finally {
		client.close();
		return reponse;
	}

}

exports.deleteRestaurant = async function (id, callback) {
	let client = await MongoClient.connect(url, { useNewUrlParser: true });
	let db = client.db(dbName);
	let reponse;

	try {
		let myquery = { "_id": ObjectId(id) };

		let result = await db.collection("restaurants")
			.deleteOne(myquery);
		reponse = {
			succes: true,
			result: result,
			error: null,
			msg: "Suppression réussie " + result
		};

	} catch (err) {
		reponse = {
			succes: false,
			error: err,
			msg: "Problème à la suppression"
		};
	} finally {
		client.close();
		return reponse;
	}
}

exports.registerNewOrder = async (req) => {
	let client = await MongoClient.connect(url, { useNewUrlParser: true });
	let db = client.db(dbName);
	try {
		if(await db.collection("orders").countDocuments({'customerName': req.body.customerName}, {limit: 1}) !== 0 &&
			await db.collection("orders").countDocuments({'date': new Date(req.body.date)}, {limit: 1}) !== 0) {
			await client.close();
			return 'Cette commande existe déjà !'
		} else {
			let isAuthVerified;
			let token = req.headers["x-access-token"];
			jwt.verify(token,"bigmac",(err,decoded)=> {
				if (err) {
					return err;
				} else if (req.body.customerName === decoded.username) {
					isAuthVerified = true;
				}
			})
			if(isAuthVerified) {
				const order = new Order({
					id: req.body.id,
					status: req.body.status,
					restaurantName: req.body.restaurantName,
					customerName: req.body.customerName,
					date: new Date(req.body.date),
					items: req.body.items,
					totalCost: req.body.totalCost,
					paymentMethod: req.body.paymentMethod
				});
				let idOrder;
				await db.collection("orders").insertOne(order).then((result)=> idOrder = result.insertedId);
				await client.close();
				return 'Commande enregistrée'+idOrder;
			} else {
				return 'Problème d\'authentification (API KEY)';
			}
		}
	} catch (err) {
		return err;
	}
};

exports.getOrdersDetails = async (req) => {
	let client = await MongoClient.connect(url, { useNewUrlParser: true });
	let db = client.db(dbName);
	try {
		if(await db.collection("orders").find({'customerName': req.body.username})) {
			let isAuthVerified;
			let token = req.headers["x-access-token"];
			jwt.verify(token,"bigmac",(err,decoded)=> {
				if (err) {
					return err;
				} else if (req.body.username === decoded.username) {
					isAuthVerified = true;
				}
			})
			if(isAuthVerified) {
				return await db.collection("orders").find({'customerName': req.body.username}).toArray();
				} else {
				return 'Problème d\'authentification (API KEY)';
			}
		} else {
			return 'Aucune commande trouvée pour ce pseudo';
		}
	} catch (err) {
		return err;
	}
};


exports.registerNewUser = async (req) => {
	let client = await MongoClient.connect(url, { useNewUrlParser: true });
	let db = client.db(dbName);
	try {
		if(await db.collection("users").countDocuments({'username': req.body.username}, {limit: 1}) !== 0 ) {
			await client.close();
			return 'Ce compte existe déjà !'
		} else {
			const user = new User({
				username: req.body.username,
				name: req.body.name,
				lastname: req.body.lastname,
				email: req.body.email,
				password: req.body.password,
				phoneNumber: req.body.phoneNumber,
				address: req.body.address,
				type: req.body.type,
				restaurants: []
			});

			await db.collection("users").insertOne(user);
			await client.close();
			return 'inscription réussie';
		}
	} catch (err) {
		return err;
	}
};

exports.login = async (req) => {
	let client = await MongoClient.connect(url, { useNewUrlParser: true });
	let db = client.db(dbName);
	try {
		if(await db.collection("users").findOne({'username': req.body.username})) {
			const user = new User({
				username: req.body.username
			});
			const token = await user.generateAuthToken();
			let newToken = {
				$set: {
					token: token
				}
			};
			await db.collection("users").updateOne({'username': req.body.username},newToken)
			return await db.collection("users").findOne({username: req.body.username});
		} else {
			await client.close();
			return 'Ce compte n\'existe pas';
		}
	} catch(err) {
		return err;
	}
}

exports.getUserDetails = async (req) => {
	let client = await MongoClient.connect(url, { useNewUrlParser: true });
	let db = client.db(dbName);
	let isAuthVerified;
	try {
		let token = req.headers["x-access-token"];
		jwt.verify(token,"bigmac",(err,decoded)=> {
			if (err) {
				return err;
			} else if (req.body.username === decoded.username) {
				isAuthVerified = true;
			}
		})
		if (isAuthVerified) {
			return db.collection("users").findOne({username: req.body.username});
		} else {
			return "Problème d'authentification"
		}

	} catch(err) {
		return err;
	}
}

exports.addUserRestaurant = async (req) => {
	let client = await MongoClient.connect(url, { useNewUrlParser: true });
	let db = client.db(dbName);
	let isAuthVerified;
	try {
		let token = req.headers["x-access-token"];
		jwt.verify(token,"bigmac",(err,decoded)=> {
			if (err) {
				return err;
			} else if (req.body.username === decoded.username) {
				isAuthVerified = true;
			}
		})
		if (isAuthVerified) {
			await db.collection("users").updateOne({'username': req.body.username},{$addToSet: {restaurants: req.body.idRestaurant}});
			return 'Restaurant ' + req.body.idRestaurant + ' ajouté'
		} else {
			return "Problème d'authentification"
		}

	} catch(err) {
		return err;
	}
}

exports.removeUserRestaurant = async (req) => {
	let client = await MongoClient.connect(url, { useNewUrlParser: true });
	let db = client.db(dbName);
	let isAuthVerified;
	try {
		let token = req.headers["x-access-token"];
		jwt.verify(token,"bigmac",(err,decoded)=> {
			if (err) {
				return err;
			} else if (req.body.username === decoded.username) {
				isAuthVerified = true;
			}
		})
		if (isAuthVerified) {
			let role = await db.collection("users").findOne({username: req.body.nusername}).then((result)=> result.role)
			if(role === 'restaurateur') {
				await db.collection("users").updateOne({'username': req.body.username}, {$pull: {restaurants: req.body.idRestaurant}});
				return 'Restaurant ' + req.body.idRestaurant + ' supprimé'
			} else {
				return "Vous n'êtes pas restaurateur !"
			}
		} else {
			return "Problème d'authentification"
		}

	} catch(err) {
		return err;
	}
}