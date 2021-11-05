

class restaurantService {
    tabRestaurants = [];
    pageNumber = 0;
    pageSize = 16;
    restaurantNameQuery = '';

    getTabRestaurants(){
        this.getRestaurantsFromServer();
        return this.tabRestaurants;
    }
    setRestaurantNameQuery(query){
        this.restaurantNameQuery = query;
    }
    setPageNumber(pagenumber){
        this.pageNumber = pagenumber;
    }
    setPageSize(pageSize){
        this.pageSize = pageSize;
    }
    deleteRestaurant(index) {
        let url = 'http://localhost:8080/api/restaurants/'+index;
        fetch(url, {
            method: 'DELETE',
        }).then((response) => response.json())
            .then((res)=>console.log(res))
            .catch(function (err) {
                console.log(err);
            });
    }

    getRestaurantFromId(index){
        let url = 'http://localhost:8080/api/restaurants/'+index;
        return fetch(url)
            .then((response)=>response.json())
            .catch(function (err) {
                console.log(err);
            });
    }

    addRestaurant() {
        let url = "http://localhost:8080/api/restaurants";
        fetch(url, {
            method: "POST",
            body: 'formData'
        })
            .then((response) => response.json())
            .then((res) => console.log(res))
            .catch(function (err) {
                console.log(err);
            });
    }

    getRestaurantsFromServer(){
        this.tabRestaurants = [];
        let url = 'http://localhost:8080/api/restaurants?'+'page='+this.pageNumber+'&pagesize='+this.pageSize+'&name='+this.restaurantNameQuery
        fetch(url)
            .then((response) => response.json())
            .then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                            this.tabRestaurants.push(
                                {
                                    nom: res.data[i].name,
                                    cuisine: res.data[i].cuisine,
                                    location: res.data[i].borough,
                                    id: res.data[i]._id,
                                    coord: res.data[i].address.coord
                                })
                        }
                })
                
            .catch(function (err) {
                console.log(err);
            });
    }
}

export default new restaurantService();