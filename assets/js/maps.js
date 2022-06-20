
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), { //an object containing some default information for when the map is rendered
        zoom: 3, //initial zoom level, which is quite high
        center: {
            lat: 51.408873, //latitude coordinate
            lng: -0.739840 //longitude coordinate
            //the coordinates of home
        }
    })

    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' // provides labels for each marker

    var locations = [ //provides markers on the map. An array of objects
        { lat: 50.715635, lng: -1.537656}, //a random coordinate, happens to be in The Solent, between the Isle of Wight and Southampton
        { lat: 48.896315, lng: -3.784159},// a random coordinate, happens to be off the coast of Brest
        { lat: 30.875691, lng: -10.856249} // a random coordinate, happens to be off the coast of Morroco
    ]

    var markers = locations.map(function(location, i) { //map is a built-in method provided by the API
        return new google.maps.Marker({ //returns a Marker object
            position: location,
            label: labels[i % labels.length] //the % modulo operator allows us to work with more than 26 locations. If there are > 26 locations, the function will loop back over the labels string
        })
    })

    const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
    //This approach is a hybrid of code taken from the Google Maps API documentation and from the tutorial video
    //It does, however, still work, though the labels, locations and markers variables are in the documentation as well
    //Markers that are close together are clustered under uber-markers, that the map will move to and zoom in on
}