// import React from "react";
// import { Box, Grid } from "@mui/material";
// import { Controls } from "../controls/Controls";

// function thirdStep() {
//   return (
//     <Box sx={{ direction: "rtl" }} paddingY={3}>
//       <Grid>
//         <Grid item></Grid>
//       </Grid>
//     </Box>
//   );
// }

// export default thirdStep;

import React, { useEffect, useState, useRef } from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import Box from "@mui/material/Box";
import {
  Autocomplete,
  Button,
  Grid,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { searchAddress } from "../map/search";
import { useSelector, useDispatch } from "react-redux";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
export default function ThirdStep() {
  const trip = useSelector((state) => state.trip);
  const dispatch = useDispatch();

  const handleUpdateCenter = (option) => {
    dispatch({
      type: "Update_Center_Info",
      payload: option.geom.coordinates,
    });
    dispatch({
      type: "Update_Destination_Info",
      payload: option,
    });
    setDestination(option);
  };

  const [text, setText] = useState("");
  const [destination, setDestination] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (text.length > 1) {
      const params = {};
      const options = { text };
      for (let key in options) {
        if (options[key] !== null && options[key] !== "") {
          params[key] = options[key];
        }
      }
      searchAddress(params)
        .then((data) => data.json())
        .then((data) => {
          if (data["odata.count"] > 0) {
            setResults(data.value);
          } else {
            setResults([{ notFound: true }]);
          }
        });
    } else if (text.length === 0) {
      setResults([]);
    }
  }, [text]);

  return (
    <Box  paddingY={3}>
      <Grid>
        <Grid item>
          <CacheProvider value={cacheRtl}>
            <Autocomplete
              id="country-select-demo"
              getOptionLabel={(option) =>
                option.address ? option.address : ""
              }
              sx={{ width: "100%" }}
              options={results}
              // value={text}
              autoHighlight
              renderOption={(props, option) => (
                <div
                  style={{
                    textAlign: "right",
                    display: "flex",
                    justifyContent: "right",
                  }}
                  onClick={() => {
                    handleUpdateCenter(option);
                  }}
                >
                  <Box key={option.key} component="li" {...props}>
                    <Typography>{option.address}</Typography>
                  </Box>
                </div>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  // value={text}
                  label="جستجوی آدرس مقصد"
                  onChange={(e) => setText(e.target.value)}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "off",
                  }}
                />
              )}
            />
          </CacheProvider>
        </Grid>
        <Grid item>
          <Typography mt={1}>آدرس:</Typography>
          <Typography mt={1} textAlign="justify">
            {" "}
            {trip.destination.address ? (
              trip.destination.address
            ) : (
              <Stack spacing={1}>
                <Skeleton animation="wave" variant="rounded" height={15} />
                <Skeleton animation="wave" variant="rounded" height={15} />
              </Stack>
            )}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
function mapStateToProps(state) {
  const { name: language, messages } = state.language;
  return { language, messages };
}
