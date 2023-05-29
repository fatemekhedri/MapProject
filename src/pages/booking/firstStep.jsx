import React, { useEffect, useState, useRef } from "react";
import { Card } from "@mui/material";
import Box from "../../components/controls/Box";
import Input from "../../components/controls/MDInput";
import Typography from "../../components/controls/MDTypography";
// import L from "leaflet";

// import { Controls } from "../controls/Controls";
import {
  Autocomplete,
  Button,
  Grid,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";

import { searchAddress } from "../../components/map/search";
import { useSelector, useDispatch } from "react-redux";

const FirstStep = () => {
  const trip = useSelector((state) => state.trip);
  const myMap = useSelector((state) => state.map.mapComponent);
  // const L = useSelector((state) => state.map.leafletLibrary);
  const dispatch = useDispatch();

  const handleUpdateCenter = (option, type = "map") => {
    console.log("handle update center-->", option);
    let tempLocation = [option?.location?.y, option?.location?.x];
    switch (type) {
      case "origin":
        dispatch({
          type: "Update_Origin_Info",
          payload: option,
        });
        dispatch({
          type: "Update_Center_Info",
          payload: tempLocation,
        });
        dispatch({
          type: "Update_Step_Status",
          payload: "destination",
        });
        break;
      case "destination":
        dispatch({
          type: "Update_Destination_Info",
          payload: option,
        });
        dispatch({
          type: "Update_Center_Info",
          payload: tempLocation,
        });
        dispatch({
          type: "Update_Step_Status",
          payload: "origin",
        });
        break;

      default:
        dispatch({
          type: "Update_Center_Info",
          payload: tempLocation,
        });
        break;
    }
  };

  const [originValue, setOriginValue] = useState("");
  const [destinationValue, setDestinationValue] = useState("");
  const [originResult, setOriginResult] = useState([]);
  const [destinationResult, setDestinationResult] = useState([]);
  // useEffect(() => {
  //   console.log(
  //     "get element by id",
  //     document.getElementsByClassName("leaflet-container ")
  //   );
  // }, []);
  useEffect(() => {
    if (destinationValue.length > 1) {
      // const params = {};
      // const options = { text: destinationValue };
      // for (let key in options) {
      //   if (options[key] !== null && options[key] !== "") {
      //     params[key] = options[key];
      //   }
      // }
      searchAddress(destinationValue)
        // .then((data) => data.json())
        .then((data) => {
          // if (data["odata.count"] > 0) {
          if (data.length > 0) {
            setDestinationResult(data);
          } else {
            setDestinationResult([{ notFound: true }]);
          }
        });
    } else if (destinationValue.length === 0) {
      setDestinationResult([]);
    }
  }, [destinationValue]);

  useEffect(() => {
    if (originValue.length > 1) {
      const params = {};
      const options = { text: originValue };
      // for (let key in options) {
      //   if (options[key] !== null && options[key] !== "") {
      //     params[key] = options[key];
      //   }
      // }
      console.log("originValue", params);
      // myMap.flyTo([52.47818319269498, 36.67457389559326], 14);
      // myMap.remove()
      searchAddress(originValue)
        // .then((data) => data.json())
        .then((data) => {
          // if (data["odata.count"] > 0) {
          if (data.length > 0) {
            setOriginResult(data);
          } else {
            setOriginResult([{ notFound: true }]);
          }
        });
    } else if (originValue.length === 0) {
      setOriginResult([]);
    }
  }, [originValue]);

  return (
    <Grid container flexDirection={"column"} spacing={3} py={2}>
      <Grid item container flexDirection={"column"} spacing={3}>
        <Grid pt="10px" pl="24px">
          
          <Autocomplete
            id="َorigin_search_autoComplete"
            getOptionLabel={(option) => (option.address ? option.address : "")}
            sx={{ width: "100%" }}
            // value={originValue}
            options={originResult}
            autoHighlight
            renderOption={(props, option) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                }}
                onClick={() => {
                  handleUpdateCenter(option, "origin");
                  const { location } = option;
                  // function buildMap(lat, lon) {
                  //   document.getElementById("weathermap").innerHTML =
                  //     "<div id='map' style='width: 100%; height: 100%;'></div>";
                  //   var osmUrl =
                  //       "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                  //     osmAttribution =
                  //       'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
                  //       ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
                  //     osmLayer = new L.TileLayer(osmUrl, {
                  //       maxZoom: 18,
                  //       attribution: osmAttribution,
                  //     });
                  //   var map = new L.Map("map");
                  //   map.setView(new L.LatLng(lat, lon), 9);
                  //   map.addLayer(osmLayer);
                  //   var validatorsLayer = new OsmJs.Weather.LeafletLayer({
                  //     lang: "en",
                  //   });
                  //   map.addLayer(validatorsLayer);
                  // }
                  // var map = L.map('myMap');
                  // myMap.off();
                  // myMap.remove();
                  // myMap.setView([51.505, -0.09], 13);
                  // myMap.on("click", function (e) {
                  //   myMap.flyTo([location?.x, location?.y], 14);
                  //   console.log("e on click map-->", e);
                  // });
                  console.log("alan too onckilicamm ", option);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") console.log(option.address);
                }}
              >
                <Box
                  display="flex"
                  justifyContent="start"
                  key={option.key}
                  component="li"
                  {...props}
                >
                  <Typography size="xs">{option.address}</Typography>
                </Box>
              </div>
            )}
            renderInput={(params) => (
              <Input
                {...params}
                variant="outlined"
                value={originValue}
                label="مبداّ"
                onChange={(e) => {
                  setOriginValue(e.target.value);
                }}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "off",
                }}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Typography size="sm">آدرس:</Typography>
          <Typography size="sm" textAlign="justify">
            {trip.origin.formatted_address || trip.origin.address ? (
              trip.origin.formatted_address || trip.origin.address
            ) : (
              <Stack spacing={1}>
                <Skeleton animation="wave" variant="rounded" height={15} />
                <Skeleton animation="wave" variant="rounded" height={15} />
              </Stack>
            )}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container flexDirection={"column"} spacing={3}>
        <Grid item>
          <Autocomplete
            id="country-select-demo"
            getOptionLabel={(option) => (option.address ? option.address : "")}
            sx={{ width: "100%" }}
            options={destinationResult}
            // value={destinationValue}
            autoHighlight
            renderOption={(props, option) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                }}
                onClick={() => {
                  handleUpdateCenter(option, "destination");
                }}
              >
                <Box key={option.key} component="li" {...props}>
                  <Typography size="xs">{option.address}</Typography>
                </Box>
              </div>
            )}
            renderInput={(params) => (
              <Input
                {...params}
                value={destinationValue}
                label="  مقصد"
                onChange={(e) => {
                  setDestinationValue(e.target.value);
                  console.log(
                    "get element by id in des------",
                    document.getElementsByClassName("leaflet-container ")
                  );
                }}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "off",
                }}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Typography size="sm">آدرس:</Typography>
          <Typography size="sm" textAlign="justify">
            {" "}
            {trip.destination.formatted_address || trip.destination.address ? (
              trip.destination.formatted_address || trip.destination.address
            ) : (
              <Stack spacing={1}>
                <Skeleton animation="wave" variant="rounded" height={15} />
                <Skeleton animation="wave" variant="rounded" height={15} />
              </Stack>
            )}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default FirstStep;

function mapStateToProps(state) {
  const { name: language, messages } = state.language;
  return { language, messages };
}
