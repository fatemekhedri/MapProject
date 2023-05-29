import React, { useState, useEffect } from "react";
import { Controls } from "../controls/Controls";
import Typography from "../controls/MDTypography";
import Avatar from "../controls/MDAvatar";
// import Team1 from "../../assets/images/team-4.jpg";
import { Stack, Grid, Skeleton } from "@mui/material";
import { stringAvatar } from "../../utility";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import Icon from "@mui/material/Icon";
import { Box } from "@mui/system";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useForm, Controller } from "react-hook-form";
const initalValues = {
  codeMelli: "",
  mobile: "",
};
const initialCommuterValue = {
  id: "",
  firstName: "",
  lastName: "",
  codeMelli: "",
  gender: "",
  phone: "",
  mobile: "",
  address: "",
  email: "",
};
export default function StepOne() {
  const trip = useSelector((state) => state.trip.commuter);
  const dispatch = useDispatch();
  const [tripCommuter, setTripCommuter] = useState(trip);
  const [values, setValues] = useState(initalValues);
  const [passenger, setPassenger] = useState({});
  const [isPreviousPassenger, setIsPreviousPassenger] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  //در صورت تغییر در جزییات سفر، آن را در ریداکس آپدیت می کند
  useEffect(() => {
    dispatch({
      type: "Update_Commuter_Info",
      payload: { ...tripCommuter },
    });
  }, [tripCommuter]);
  useEffect(() => {
    if (Object.values(tripCommuter)?.length > 0) {
      setPassenger(tripCommuter);
      let tempValues = {
        codeMelli: tripCommuter.codeMelli,
        mobile: tripCommuter.mobile,
      };
      setValues({ ...tempValues });
    }
  }, []);

  // //نام و مقدار فیلد جزیبات سفر را گرفته و جایگزاری می کند
  // const updateCommuter = (propertyName, value) => {
  //   setTripCommuter({ ...tripCommuter, [propertyName]: value });
  //   // trip.tripCarStatus == null ? updateDetails("carAtDisposalHours", null) : "";
  // };
  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    let tempValues = { ...values };
    tempValues[name] = value;
    // console.log("temp values--->", tempValues);
    setValues({ ...tempValues });
    setIsLoading(true);

 
  };

 
  const NotPreviousPassenger = () => {
    return (
      <Grid
        container
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
        <Typography variant="h6" size="sm" fontWeight="bold" color="error">
          مسافر انتخابی در لیست مسافران قبلی موجود نمیباشد{" "}
        </Typography>
      </Grid>
    );
  };
  const PassengerTrips = () => {
    return (
      <Grid
        container
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
        <Grid item>
          {/* <Avatar
            variant="rounded"
            alt="Remy Sharp"
            src={Team1}
            sx={({ boxShadows: { lg } }) => ({
              boxShadow: lg,
              width: 60,
              height: 60,
            })}
          /> */}
          {passenger.image ? (
            <Avatar
              src={passenger.image}
              name={passenger.firstName}
              size="sm"
            />
          ) : (
            <Avatar {...stringAvatar(passenger.firstName || "")} />
          )}
        </Grid>
        <Grid
          // py={2}
          // px={1}
          item
          display={"Flex"}
          flexDirection="column"
          flexGrow={1}
          ml={1}
        >
          <Typography variant="h6" size="sm" fontWeight="bold" color="#344767">
            {passenger.displayName}
          </Typography>
          <Typography py={0.5} size="xs" color="grey" variant="caption">
            {passenger.email}
          </Typography>
          <Typography color="grey" variant="caption">
            {passenger.codeMelli}
          </Typography>
        </Grid>
        <Grid px={1}>
          <Tooltip title={passenger.mobile} placement="top">
            <Icon
              fontSize="small"
              color="secondary"
              // sx={{ marginRight: "0.25rem", color: white.main }}
            >
              call
              {/* stay_current_portrait */}
            </Icon>
          </Tooltip>
          <Tooltip title={passenger.address} placement="top">
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

  return (
    <Stack direction="column" spacing={2}>
      {" "}
      <Controls.Input
        label="کد ملی"
        name="codeMelli"
        value={values.codeMelli}
        onChange={handleInputChange}
      />
      <Controls.Input
        label="موبایل"
        name="mobile"
        value={values.mobile}
        onChange={handleInputChange}
      />
      {isLoading ? (
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
          {/* <Skeleton variant="text" sx={{ fontSize: "1rem" }} /> */}
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
      ) : isPreviousPassenger ? (
        Object.values(passenger)?.join("")?.length > 0 && <PassengerTrips />
      ) : (
        <NotPreviousPassenger />
      )}
    </Stack>
  );
}
