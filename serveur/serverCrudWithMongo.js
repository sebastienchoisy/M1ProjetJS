const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const server = require('http').Server(app);
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// pour les formulaires multiparts
var multer = require('multer');
var multerData = multer();

const mongoDBModule = require('./app_modules/crud-mongo');

// Pour les formulaires standards
const bodyParser = require('body-parser');
// pour les formulaires multiparts
var multer = require('multer');
var multerData = multer();

// Cette ligne indique le répertoire qui contient
// les fichiers statiques: html, css, js, images etc.
app.use(express.static(__dirname + '/public'));
// Paramètres standards du modyle bodyParser
// qui sert à récupérer des paramètres reçus
// par ex, par l'envoi d'un formulaire "standard"
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

	next();
});

// Lance le serveur avec express
server.listen(port);
console.log("Serveur lancé sur le port : " + port);

//------------------
// ROUTES
//------------------
// Utile pour indiquer la home page, dans le cas
// ou il ne s'agit pas de public/index.html
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/MyTableVue', (req, res) => {
	res.sendFile(__dirname + '/public/TableVue.html');
});

// Ici des routes en :
// http GET (pour récupérer des données)
// http POST : pour insérer des données
// http PUT pour modifier des données
// http DELETE pour supprimer des données

//----------------------------------------------
// Ces routes forment l'API de l'application !!
//----------------------------------------------

// Test de la connexion à la base
app.get('/api/connection', (req, res) => {
	// Pour le moment on simule, mais après on devra
	// réellement se connecte à la base de données
	// et renvoyer une valeur pour dire si tout est ok
	mongoDBModule.connexionMongo()
		.then(db => {
			let reponse;

			if (!db) {
				console.log("erreur connexion");
				reponse = {
					msg: "erreur de connexion err=" + err
				}
			} else {
				reponse = {
					msg: "connexion établie"
				}
			}
			res.send(JSON.stringify(reponse));
		});
});

app.get('/api/restaurants/count', (req, res) => {
	// Pour le moment on simule, mais après on devra
	// réellement se connecte à la base de données
	// et renvoyer une valeur pour dire si tout est ok
	let name = req.query.name || '';

	mongoDBModule.countRestaurants(name)
		.then(data => {
			var objdData = {
				msg: "restaurants count",
				data: data
			}
			res.send(JSON.stringify(objdData));
		});
});

// On va récupérer des restaurants par un GET (standard REST) 
// cette fonction d'API peut accepter des paramètres
// pagesize = nombre de restaurants par page
// page = no de la page
// Oui, on va faire de la pagination, pour afficher
// par exemple les restaurants 10 par 10
app.get('/api/restaurants', (req, res) => {
	// Si présent on prend la valeur du param, sinon 1
	let page = parseInt(req.query.page || 1);
	// idem si present on prend la valeur, sinon 10
	let pagesize = parseInt(req.query.pagesize || 10);

	let name = req.query.name || '';

	const data = mongoDBModule.findRestaurants(page, pagesize, name)
		.then(data => {
			res.send(JSON.stringify(data));
		})
});

// Récupération d'un seul restaurant par son id
app.get('/api/restaurants/:id', (req, res) => {
	var id = req.params.id;

	mongoDBModule.findRestaurantById(id)
		.then(data => {
			res.send(JSON.stringify(data));
		});
});

app.get('/api/restaurants/details/:id', function(req,res) {
	let id = req.params.id;
	let api_key = 'AIzaSyCz9DqNjZr_2P3G0YBBFIN6rIUOAr7SrhE';
	mongoDBModule.findRestaurantById(id)
		.then((data) => {
		let url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cphoto%2Crating%2Copening_hours' +
			'&input=' + data.restaurant.name + '&inputtype=textquery' +
			'&locationbias=circle%3A2000%40' + data.restaurant.address.coord[1] + '%2C' + data.restaurant.address.coord[0] + '&key=' + api_key;
		return fetch(url)
			.then((response) => response.json())
			.then((detail) => res.send(detail))
			.catch(function (err) {
				console.log(err);
			});
	});
});

app.get('/api/restaurants/photo/:id', function(req,res) {
	let id = req.params.id;
	let api_key = 'AIzaSyCz9DqNjZr_2P3G0YBBFIN6rIUOAr7SrhE';


	mongoDBModule.findRestaurantById(id)
		.then((data) => {
			let url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=photo' +
			'&input=' + data.restaurant.name + '&inputtype=textquery' +
			'&locationbias=circle%3A2000%40' + data.restaurant.address.coord[1] + '%2C' + data.restaurant.address.coord[0] + '&key=' + api_key;
		fetch(url)
			.then((response) => response.json())
			.then((detail) => {
				if(detail.candidates[0].photos) {
					let photoRef = detail.candidates[0].photos[0].photo_reference;
					let photoUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=150&photo_reference=' + photoRef + '&key=' + api_key;
					return fetch(photoUrl)
						.then((response) => response)
						.then((response)=>res.send(response.url))
				} else {
					res.send('pas de photo');
				}
			})
			.catch(function (err) {
				console.log(err);
			});
});
});

// Creation d'un restaurant par envoi d'un formulaire
// On fera l'insert par un POST, c'est le standard REST
app.post('/api/restaurants', multerData.fields([]), (req, res) => {
	// On supposera qu'on ajoutera un restaurant en 
	// donnant son nom et sa cuisine. On va donc 
	// recuperer les données du formulaire d'envoi
	// les params sont dans req.body même si le formulaire
	// est envoyé en multipar

	mongoDBModule.createRestaurant(req.body)
		.then(data => {
			res.send(JSON.stringify(data));
		});
});

// Modification d'un restaurant, on fera l'update par
// une requête http PUT, c'est le standard REST
app.put('/api/restaurants/:id', multerData.fields([]), (req, res) => {
	var id = req.params.id;

	mongoDBModule.updateRestaurant(id, req.body)
		.then(data => {
			res.send(JSON.stringify(data));
		});
});

// Suppression d'un restaurant
// On fera la suppression par une requête http DELETE
// c'est le standard REST
app.delete('/api/restaurants/:id', (req, res) => {
	var id = req.params.id;

	mongoDBModule.deleteRestaurant(id)
		.then(data => {
			res.send(JSON.stringify(data));
		});
})

