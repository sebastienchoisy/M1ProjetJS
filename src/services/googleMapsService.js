export default class googleMapsService {
    API_Key = 'AIzaSyCz9DqNjZr_2P3G0YBBFIN6rIUOAr7SrhE';

    getRestaurantDetails(id){
        let url = 'http://localhost:8080/api/restaurants/details/'+id
        fetch(url)
            .then((response) => response.json())
            .catch(function (err) {
                console.log(err);
            });
    }
}