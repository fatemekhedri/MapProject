
//init the map
var myMap = new L.Map('map', {
    key: 'web.21ceac4cf6ae4a2aa01f304bcacfb60f',
    maptype: 'dreamy',
    poi: true,
    traffic: true,
    center: [35.699739, 51.338097],
    zoom: 14
});

//marker icons 
var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var goldIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
//marker layers
var markers = [];
//polyline layers
var polylines = [];
var flag = false;
//adding on map click listner
myMap.on('click', function (e) {
    //is start button is clicked
   
        if (markers.length == 0) {
            markers[0] = L.marker(e.latlng, {
                title: "origin",
                icon: greenIcon
            }).addTo(myMap);
            document.getElementById("origin").textContent += " : " + e.latlng;
            document.getElementById("help").textContent = "لطفا مقصد را انتخاب کنید";


        } else if (markers.length == 1) {
            markers[1] = L.marker(e.latlng, {
                title: "destination",
                icon: redIcon
            }).addTo(myMap);
            document.getElementById("destination").textContent += " : " + e.latlng;
            document.getElementById("help").textContent = "لطفا نقاط میانی را انتخاب کنید و سپس گزینه navigate را فشار دهید.";

        } else {
            markers[markers.length] = L.marker(e.latlng, {
                title: "waypoint",
                icon: goldIcon
            }).addTo(myMap);
            document.getElementById("waypoints").textContent += "\n - " + e.latlng;
        }
   
});
//restarting the layers
// function direction() {
//     flag = true;
//     document.getElementById("help").textContent = "لطفا مبدا را انتخاب کنید";
//     document.getElementById("start").textContent = "restart";
//     document.getElementById("origin").textContent = "origin";
//     document.getElementById("destination").textContent = "destination";
//     document.getElementById("waypoints").textContent = "waypoints";
//     for (var i = 0; i < markers.length; i++) {
//         myMap.removeLayer(markers[i]);
//     }
//     markers = [];
//     for (var i = 0; i < polylines.length; i++) {
//         myMap.removeLayer(polylines[i]);
//     }
//     polylines = [];
//     document.getElementById("origin").textContent = "origin";


// }
//send http get request to routing api
function navigation() {
    // document.getElementById("help").textContent = "برای انتخاب مسیر جدید گزینه restart را فشار دهید.";
    for (var i = 0; i < polylines.length; i++) {
        myMap.removeLayer(polylines[i]);
    }
    polylines = [];
    flag = false;
    //making the url
    var origin = markers[0].getLatLng().lat + "," + markers[0].getLatLng().lng;
    var destination = markers[1].getLatLng().lat + "," + markers[1].getLatLng().lng;
    var waypoints = "";
    for (var i = 2; i < markers.length; i++) {
        waypoints += markers[i].getLatLng().lat + "," + markers[i].getLatLng().lng + "|";
    }
    waypoints = waypoints.substring(0, waypoints.length - 1);
    var url = `https://api.neshan.org/vv3/direction?type=car&&origin=${origin}&destination=${destination}`;
    console.log(markers.length);
    if (markers.length > 2) {
        url += "&waypoints=" + waypoints;
    }
    // if (!(document.getElementById("avoidTrafficZone").checked)) {
    //     url += "&avoidTrafficZone=false";
    // }
    // if (!(document.getElementById("avoidOddEvenZone").checked)) {
    //     url += "&avoidOddEvenZone=false";
    // }
    // if (document.getElementById("alternative").checked) {
    //     url += "&alternative=true";
    // }
    console.log(url);
    //urlencode the url
    url = encodeURI(url);
    var params = {
        headers: {
            'Api-Key': 'service.5fbb4455b2864353b59793b49e1e9dc1'
        },

    };
    //sending get request
    axios.get(url, params)
        .then(data => {
            console.log(data);
            //drawing the polylines
            for (var k = 0; k < Object.keys(data.data.routes).length; k++) {
                var color = generateRandomColor();
                for (var i = 0; i < Object.keys(data.data.routes[0].legs).length; i++) {
                    for (var j = 0; j < Object.keys(data.data.routes[0].legs[i].steps).length; j++) {
                        var stepPolyLine = data.data.routes[0].legs[i].steps[j].polyline;
                        //drawing the polyline of each step
                        polylines[polylines.length] = L.Polyline.fromEncoded(stepPolyLine, {
                            color: color
                        }).addTo(myMap);
                    }
                }
            }
        }).catch(err => {
            console.log("error = " + err);
            log.textContent = "Nothing found";

        });
}
//random color generator :))
function generateRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
