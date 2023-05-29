import React, { useEffect, useState, useRef } from "react";
import { Controls } from "../controls/Controls";
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

export default function StepTwo() {
  const trip = useSelector((state) => state.trip);
  const dispatch = useDispatch();

  const handleUpdateCenter = (option) => {
    dispatch({
      type: "Update_Center_Info",
      payload: option.geom.coordinates,
    });
    dispatch({
      type: "Update_Origin_Info",
      payload: option,
    });
  };

  const [text, setText] = useState("");
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
      <Grid item>
        <Autocomplete
          id="َorigin_search_autoComplete"
          getOptionLabel={(option) => (option.address ? option.address : "")}
          sx={{ width: "100%" }}
          options={results}
          autoHighlight
          renderOption={(props, option) => (
            <div
              onClick={() => {
                handleUpdateCenter(option);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") console.log(option.address);
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
              value={text}
              label="جستجوی آدرس مبداّ"
              onChange={(e) => setText(e.target.value)}
              inputProps={{
                ...params.inputProps,
                autoComplete: "off",
              }}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Typography mt={1}>آدرس:</Typography>
        <Typography mt={1} textAlign="justify">
          {trip.origin.address ? (
            trip.origin.address
          ) : (
            <Stack spacing={1}>
              <Skeleton animation="wave" variant="rounded" height={15} />
              <Skeleton animation="wave" variant="rounded" height={15} />
            </Stack>
          )}
        </Typography>
      </Grid>
    </Box>
  );
}
function mapStateToProps(state) {
  const { name: language, messages } = state.language;
  return { language, messages };
}
