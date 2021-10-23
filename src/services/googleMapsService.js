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
        await fetch(url)
            .then((response) => response.text())
            .then((photo) => {return photo})
            .catch(function (err) {
                console.log(err);
            });
    }
}