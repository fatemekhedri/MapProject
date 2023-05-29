import React from "react";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "../controls/MDTypography";
import {
  Box,
  Button,
  FormControlLabel,
  Skeleton,
  Stack,
  styled,
  Tooltip,
} from "@mui/material";

import carType1 from "../../assets/images/carType1.png";
import carType2 from "../../assets/images/carType2.png";
import carType3 from "../../assets/images/carType3.png";
import carType4 from "../../assets/images/carType4.png";
import carType5 from "../../assets/images/carType5.png";
import makeStyles from "@mui/styles/makeStyles";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import RadioGroup from "../../components/controls/RadioGroups";

const fifthStepStyle = makeStyles((theme) => ({
  root: {
    "& .makeStyles-carContainer-14:hover": { backgroundColor: "red" },
    // "& .css-1solz92": { justifyContent: "space-between" },
  },
  carPicStyle: { width: "65px", cursor: "pointer" },
  carContainer: {
    display: "flex !important",
    alignItems: "end !important",
    border: "1px solid",
    borderColor: "#EAE7B1",
    borderRadius: theme.spacing(3),
  },
  PriceDetailStyle: {
    textAlign: "right",
  },
}));

const carTypes = [
  { type: 1, name: "خودرو سواری داخلی", pic: carType1 },
  { type: 2, name: "خودرو سواری ویژه", pic: carType2 },
  { type: 3, name: "VIP خودرو سواری", pic: carType3 },
  { type: 4, name: "خودرو ون", pic: carType4 },
  { type: 5, name: "VIP خودرو ون", pic: carType5 },
];

function commafy(num) {
  if (num) {
    var str = num.toString().split(".");
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, "$1 ");
    }
    return str.join(".");
  }
}
export default function FifthStep() {
  let moment = require("moment-jalaali");
  const trip = useSelector((state) => state.trip);
  const dispatch = useDispatch();
  const [tripCarType, setTripCarType] = useState(
    trip.details.tripCarType || "1"
  );
  const [prices, setPrices] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const classes = fifthStepStyle();

  useEffect(() => {
    dispatch({
      type: "Update_Details",
      payload: { ...trip.details, tripCarType },
    });
  }, [tripCarType]);

  // const handleChange = (e) => {
  //   setTripCarType(e.target.value);
  // };
  return (
    <FormControl>
      <RadioGroup
        overlay
        value={tripCarType}
        name="tripCarType"
        row
        sx={{ gap: 2, mt: 1 }}
        onChange={(e) => setTripCarType(e.target.value)}
      >
        {carTypes.map((item, index) => (
          <Box
            className={classes.carContainer}
            component="label"
            key={item.type}
            variant="outlined"
            sx={{
              p: 2,
              pt: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              boxShadow: "sm",
              borderRadius: "md",
              justifyContent: "space-between",
              width: "100%",
              // bgcolor: "background.body",
              gap: 1.5,
            }}
          >
            <FormControlLabel
              value={item.type}
              control={<Radio />}
              // label={item.name}
              label={
                <Box display={"flex"} flexDirection="column">
                  <Typography size="sm">{item.name}</Typography>
                  {!isLoading && (
                    <Typography
                      color="gray"
                      // size="xs"
                      sx={{
                        fontSize: "0.7rem",
                      }}
                    >
                      {`${trip?.prices[index]?.distance} کیلومتر (${trip?.prices[index]?.duration})`}
                    </Typography>
                  )}
                </Box>
              }
              labelPlacement="start"
              sx={{
                fontSize: "13px",
                width: "100%",
                paddingTop: 0,
                marginLeft: 0,
                marginRight: 0,
              }}
            />
            {/* <Tooltip
              title={`طول سفر ${trip.prices[index].duration} دقیقه `}
              enterDelay={500}
              leaveDelay={200}
            > */}

            {/* <Typography
              sx={{
                textAlign: "start",
              }}
              size="sm"
            >{`${trip?.prices[index]?.distance} کیلومتر (${trip?.prices[index]?.duration})`}</Typography> */}
            <Box
              width="100%"
              display={"flex"}
              justifyContent="space-between"
              alignItems={"center"}
            >
              <Box>
                <img
                  className={classes.carPicStyle}
                  alt={item.name}
                  src={item.pic}
                />
              </Box>
              {/* </Tooltip> */}
              <div className={classes.PriceDetailStyle}>
                <Box
                  display={"flex"}
                  alignItems="center"
                  justifyContent={"space-between"}
                  // width="40%"
                >
                  <Typography
                    pr={1}
                    sx={{
                      // color: "#205295",
                      fontSize: "12px",
                      // textShadow: "-5px 2px 15px #A6BB8D",
                    }}
                  >
                    پیش پرداخت
                  </Typography>
                  <Typography
                    sx={{
                      color: "#579BB1",
                      fontSize: "12px",
                    }}
                  >
                    {isLoading ? (
                      <Stack>
                        <Skeleton
                          animation="wave"
                          variant="rounded"
                          width={60}
                          height="4px"
                          mt="2"
                        />
                      </Stack>
                    ) : (
                      commafy(trip?.prices[index]?.prePayment)
                    )}
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  alignItems="center"
                  justifyContent={"space-between"}
                >
                  <Typography
                    pr={1}
                    sx={{
                      // color: "#205295",
                      fontSize: "12px",
                      // textShadow: "-5px 2px 15px #A6BB8D",
                    }}
                  >
                    هزینه سفر
                  </Typography>
                  <Typography
                    sx={{
                      color: "#579BB1",
                      fontSize: "12px",
                    }}
                  >
                    {isLoading ? (
                      <Stack>
                        <Skeleton
                          animation="wave"
                          variant="rounded"
                          width={60}
                          height="4px"
                          mt="2"
                        />
                      </Stack>
                    ) : (
                      commafy(trip?.prices[index]?.totalPrice)
                    )}
                  </Typography>
                </Box>
              </div>
            </Box>
          </Box>
        ))}
      </RadioGroup>
    </FormControl>
  );
}
