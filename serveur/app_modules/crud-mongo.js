var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

//var url = 'mongodb://localhost:27017/test';

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test';

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