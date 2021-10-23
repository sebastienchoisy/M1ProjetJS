export default class googleMapsService {

    getRestaurantDetails(id){
        let url = 'http://localhost:8080/api/restaurants/details/'+id
        fetch(url)
            .then((response) => response.json())
            .catch(function (err) {
                console.log(err);
            });
    }

     async getRestaurantPhoto(id){
        let url = 'http://localhost:8080/api/restaurants/photo/'+id;
        let photoURL;
        await fetch(url)
            .then((response) =>{return response.json();})
            .then((photo) => {photoURL = photo})
            .catch(function (err) {
                console.log(err);
            });
        return photoURL;
    }
}