import React, { useEffect, useState, useRef } from "react";
import Sidenav from "../Sidenav";
import { Outlet } from "react-router-dom";
import { RootLayoutStyle } from "./rootLayout/rootLayoutStyle";
import { withStyles } from "@material-ui/core/styles";
import routes from "../../pages/domainRoutes";
import Mapir from "mapir-react-component";
import { Map } from "../map/Map";
import LocToAddress from "../map/LocToAddress";
import { makeStyles } from "@mui/styles";

// import { connect } from "react-redux";
import NeshanMap from "react-neshan-map-leaflet";

import Reservation from "../reservation/Reservation";

import Axios from "axios";
import polylineEncode from "../../utility/polylineEncode";
// import polyline from "google-polyline";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import "leaflet-control-geocoder/dist/Control.Geocoder.css";
// import "leaflet-control-geocoder/dist/Control.Geocoder.js";
// import L from "leaflet";
// import LeafletGeocoder from "./LeafletGeocoder";
// import LeafletRoutingMachine from "./LeafletRoutingMachine";
// import {
//   MapContainer,
//   LayersControl,
//   Circle,
//   TileLayer,
//   FeatureGroup,
//   Popup,
//   Marker,
// } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  root: {
    direction: "rtl",
    display: "flex",

    position: "relative",
    " & .muirtl-vs1m4u-MuiDrawer-docked .MuiDrawer-paper": {
      margin: 0,
      borderRadius: 0,
      height: "100%",
      position: "unset",
    },
    " & .muirtl-vs1m4u-MuiDrawer-docked": {
      width: "unset",
    },
  },
  fillScreen: { width: "100%", height: "100%" },
}));

const BookingLayout = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let originTrip = useSelector((state) => state.trip.origin);
  let destinationTrip = useSelector((state) => state.trip.destination);
  let trip = useSelector((state) => state.trip);
  const myMap = useSelector((state) => state.map.mapComponent);
  const L = useSelector((state) => state.map.leafletLibrary);
  const map = useSelector((state) => state.map);
  let mapMethod = useSelector((state) => state.map.step);

  const [originMap, setOriginMap] = useState("");
  const [destinationMap, setDestinationMap] = useState("");
  const [markerList, setMarkerList] = useState([]);
  const [polylines, setPolylines] = useState([]);
  const [flag, setFlag] = useState(false);

  const onchangeLocation = (L, myMap) => {
    console.log("alan oomad onchange location");
    myMap.flyTo([35.718400095673054, 51.450164792838095], 14);
  };
  const handleRoute = (L, myMap) => {
    let origin =
      markerList[0].getLatLng().lat + "," + markerList[0].getLatLng().lng;
    let destination =
      markerList[1].getLatLng().lat + "," + markerList[1].getLatLng().lng;
    let polylines = [];
    console.log("origin inhandle route", origin);
    // return new Promise((resolve, reject) => {
    let url = `https://api.neshan.org/v3/direction?type=car&origin=${origin}&destination=${destination}`;

    console.log(url);
    //urlencode the url
    url = encodeURI(url);

    //sending get request

    Axios({
      method: "GET",
      url,
      headers: {
        "Api-Key": "service.5fbb4455b2864353b59793b49e1e9dc1",
      },
    })
      .then((data) => {
        console.log(data);
        //drawing the polylines
        for (var k = 0; k < Object.keys(data.data.routes).length; k++) {
          var color = "red";
          for (
            var i = 0;
            i < Object.keys(data.data.routes[0].legs).length;
            i++
          ) {
            for (
              var j = 0;
              j < Object.keys(data.data.routes[0].legs[i].steps).length;
              j++
            ) {
              var stepPolyLine = data.data.routes[0].legs[i].steps[j].polyline;
              //drawing the polyline of each step
              polylines[polylines.length] = L.Polyline.fromEncoded(
                stepPolyLine,
                {
                  color: color,
                }
              ).addTo(myMap);
              // resolve(stepPolyLine);
              // return ;
            }
          }
        }
      })
      .catch((err) => {
        console.log("error = " + err);
        // reject(err);
        // log.textContent = "Nothing found";
      });
    // });
  };

  return (
    <div className={classes.root}>
      <Sidenav
        color={"info"}
        miniSidenav={true}
        brandName="پارسه گشت"
        routes={routes}
        isCustomMiniSidenav={true}
      />
      <Reservation />
      <Box className={classes.fillScreen}>
        <div id="weathermap"></div>
        {console.log("alan ghable neshan hastam--->",map.center)}
        <NeshanMap
          options={{
            key: "web.21ceac4cf6ae4a2aa01f304bcacfb60f",
            center: map.center,
            zoom: 11,
          }}
          id="neshanTest"
          onInit={(L, myMap) => {
            console.log("alan oninit hastam--->", L);

            onchangeLocation(L, myMap);
            // dispatch({
            //   type: "Update_Leaflet",
            //   payload: L,
            // });
            
            dispatch({
              type: "Update_Map",
              payload: myMap,
            });
            polylineEncode(L);
            let blueIcon = new L.Icon({
              iconUrl:
                "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
              shadowUrl:
                "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41],
            });

            let redIcon = new L.Icon({
              iconUrl:
                "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
              shadowUrl:
                "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41],
            });

            if (markerList.length == 0) {
              let items = markerList;

              setMarkerList(items);
            } else if (markerList.length == 1) {
              let items = markerList;

              setMarkerList(items);
            }

            // let marker = L.marker([35.997, 51.338])
            //   .addTo(myMap)
            //   .bindPopup("I am a popup.");
            // myMap.flyTo([35.997, 51.338], 14);
            setFlag(true);

            myMap.on("click", function (e) {
              console.log("e on click map-->", e);
              setFlag(true);
              // myMap.flyTo(e.latlng, 14);
              // marker.setLatLng(e.latlng);
              if (markerList.length == 0) {
                let items = markerList;
                items.push(
                  L.marker(e.latlng, {
                    title: "origin",
                    icon: blueIcon,
                  }).addTo(myMap)
                );
                setMarkerList(items);
                dispatch({
                  type: "Update_Center_Info",
                  payload: [e.latlng.lat, e.latlng.lng],
                });
              } else if (markerList.length == 1) {
                let items = markerList;
                items.push(
                  L.marker(e.latlng, {
                    title: "destination",
                    icon: redIcon,
                  }).addTo(myMap)
                );
                setMarkerList(items);
                dispatch({
                  type: "Update_Center_Info",
                  payload: [e.latlng.lat, e.latlng.lng],
                });
              }

              //sending get request
              handleRoute(L, myMap);
            });

            myMap.setMapType("dreamy");
          }}
        />
      </Box>
    </div>
  );
};

export default BookingLayout;
