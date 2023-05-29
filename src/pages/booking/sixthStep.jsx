import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { stringAvatar } from "../../utility";
import { Stack, Grid, Icon, Tooltip, Skeleton } from "@mui/material";
import Box from "../../components/controls/Box";
import Typography from "../../components/controls/MDTypography";
import Avatar from "../../components/controls/MDAvatar";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Divider from "@mui/material/Divider";

// import TripOriginIcon from "@mui/icons-material/TripOrigin";
// import PinDropIcon from "@mui/icons-material/PinDrop";
// import PlaceIcon from "@mui/icons-material/Place";
// import FmdGoodIcon from "@mui/icons-material/FmdGood";
const carTypes = [
  { type: 1, name: "خودرو سواری داخلی", pic: "carType1" },
  { type: 2, name: "خودرو سواری ویژه", pic: "carType2" },
  { type: 3, name: "VIP خودرو سواری", pic: "carType3" },
  { type: 4, name: "خودرو ون", pic: "carType4" },
  { type: 5, name: "VIP خودرو ون", pic: "carType5" },
];
// const initialSelectedCar = { type: 1, name: "", pic: "carType1" };
const SixthStep = () => {
  const trip = useSelector((state) => state.trip);
  //   const dispatch = useDispatch();
  // const [selectedCar, setSelectedCar] = useState({});

  // useEffect(() => {
  //   const {
  //     details: { tripCarType = 1 },
  //   } = trip;
  //   let selectedCar = carTypes.filter((x) => x.type == tripCarType)[0] || {};
  //   setSelectedCar(selectedCar);
  // }, []);
  const TripRoute = () => {
    const { origin, destination } = trip;
    return (
      <Grid display="flex" height={"max-content"}>
        <Box
        //  pt={0.7} 
         display="flex" flexDirection="column" alignItems="start">
          <Icon
            // fontSize="small"
            color="secondary"
            sx={{ fontSize: "0.75rem !important" }}
          >
            fiber_manual_record
          </Icon>
          <Divider
            sx={{
              height: "60% !important",
              opacity: "1",
              margign: "0px",
              marginLeft: "5px",
              borderWidth: "2px",
            }}
            backgroundColor="#0c0b0b"
            orientation="vertical"
          />
          <Icon
            // fontSize="small"
            color="secondary"
            sx={{ fontSize: "0.75rem !important" }}
          >
            fiber_manual_record
          </Icon>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography  color="grey" px={1} variant="caption">
            {origin?.address || ""}
            {/* شیراز */}
          </Typography>

          <Typography
           pt="16%" 
           px={1} color="grey" variant="caption">
            {destination?.address || ""}
            {/* تهران */}
          </Typography>
        </Box>
      </Grid>
    );
  };
  const PassengerTrips = () => {
    const { commuter: passenger } = trip;
    return (
      <Grid display="flex" alignItems="center" width="100%">
        <Grid item>
          {passenger.image ? (
            <Avatar
              src={passenger.image}
              name={passenger.firstName}
              size="sm"
            />
          ) : (
            <Avatar size="sm" {...stringAvatar(passenger?.firstName || "B")} />
          )}
        </Grid>
        <Grid item display={"Flex"} flexDirection="column" flexGrow={1} ml={1}>
          <Typography variant="h6" size="xs" fontWeight="bold" color="#344767">
            {passenger?.displayName || ""}
            {/* مهتاب کرامتی */}
          </Typography>
          <Typography py={0.5} color="grey" variant="caption">
            {/* test@gmail.com */}
            {passenger?.email || ""}
          </Typography>
        </Grid>
        <Grid px={1}>
          <Tooltip title={passenger?.mobile || ""} placement="top">
            <Icon fontSize="small" color="secondary">
              call
            </Icon>
          </Tooltip>
          <Tooltip title={passenger?.address || ""} placement="top">
            <Icon
              fontSize="small"
              sx={{ marginRight: "0.25rem" }}
              color="secondary"
            >
              location_on
            </Icon>
          </Tooltip>
        </Grid>
      </Grid>
    );
  };
  const CarTrip = () => {
    const {
      details: { tripCarType = 1 },
      prices,
    } = trip;
    return (
      <Grid
        width={"100%"}
        display={"flex"}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="column">
          <Typography color="grey" size="xxxs" variant="caption">
            {prices[tripCarType - 1]?.distance || ""} کیلومتر
          </Typography>
          <Typography
            py={0.8}
            variant="caption"
            size="xs"
            fontWeight="bold"
            color="#344767"
          >
            {/* {selectedCar?.name || ""} */}
            {carTypes[tripCarType - 1]?.name || ""}
            {/* خودرو سواری داخلی */}
          </Typography>
          <Typography color="grey" size="xxxs" variant="caption">
            {prices[tripCarType - 1]?.duration || ""} ساعت
          </Typography>
        </Box>
        <Box>
          <img
            style={{ width: "65px" }}
            alt={"car"}
            src={require(`../../assets/images/carType${
              tripCarType || "1"
            }.png`)}
          />
        </Box>
      </Grid>
    );
  };
  const LoadingSkeleton = () => {
    return (
      <Stack
        sx={({
          boxShadows: { xl },
          borders: { borderRadius, borderWidth, borderColor },
        }) => ({
          borderRadius: borderRadius.md,
          borderWidth: borderWidth[1],
          borderColor: borderColor,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        })}
        border={1}
        // px={2}
        // py={1}
        p={1}
      >
        <Skeleton variant="circular" mr={2} width={40} height={40} />
        <Box width="98%" ml={1}>
          <Skeleton
            animation="wave"
            height={15}
            width="100%"
            m={2}
            style={{ marginBottom: 6 }}
          />
          <Skeleton
            animation="wave"
            height={15}
            width="100%"
            m={2}
            style={{ marginBottom: 6 }}
          />
          <Skeleton
            animation="wave"
            height={15}
            width="100%"
            m={2}
            style={{ marginBottom: 6 }}
          />
        </Box>
      </Stack>
    );
  };
  return (
    <>
      {trip.prices ? (
        <Grid
          container
          sx={({
            boxShadows: { xl },
            borders: { borderRadius, borderWidth, borderColor },
          }) => ({
            borderRadius: borderRadius.md,
            borderWidth: borderWidth[1],
            borderColor: borderColor,
            // display: "flex",
            // flexDirection: "column",
            // alignItems: "center",
          })}
          border={1}
          p={1.5}
          width={"100%"}
        >
          <CarTrip />

          <Divider width="100%" />

          <TripRoute />

          <Divider width="100%" />

          <PassengerTrips />
        </Grid>
      ) : (
        <LoadingSkeleton />
      )}
    </>
  );
};
export default SixthStep;
