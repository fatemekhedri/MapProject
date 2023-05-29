import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import Box from "../controls/Box";
import Typography from "../controls/MDTypography";
import Button from "../controls/MDButton";
import StepOne from "./firstStep";
import StepTwo from "../../pages/booking/firstStep";
import StepThree from "../../pages/booking/secondStep";
import StepFour from "./fifthStep";
import StepFive from "../../pages/booking/fifthStep";
import StepSix from "../../pages/booking/sixthStep";
import { Stack } from "@mui/system";
import { Snackbar, Alert } from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";
//Steps titles
const steps = [
  // {
  //   key: 1,
  //   label: "افزودن مسافر ",
  //   component: <StepOne />,
  // },
  {
    key: 1,
    label: "ثبت مبدا و مقصد",
    component: <StepTwo />,
  },
  {
    key: 2,
    label: "جزِئیات سفر",
    component: <StepThree />,
  },
  {
    key: 3,
    label: "انتخاب ماشین",
    component: <StepFour />,
  },
  {
    key: 4,
    label: "ثبت مسافر جدید",
    component: <StepFive />,
  },
  {
    key: 5,
    label: "بازبینی کلی",
    component: <StepSix />,
  },
];
const initialAlertInfo = {
  type: "success",
  content: "",
  isShow: false,
};

export default function Reservation() {
  const trip = useSelector((state) => state.trip);
  const [alertInfo, setAlertInfo] = useState(initialAlertInfo);
  // const [tripInfo, setTripInfo] = useState(trip);
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisableStep, setIsDisableStep] = useState(false);

  //every time activeStep changes, the step status will update to inform  MainMap to know where it should put the location in.
  useEffect(() => {
    //با هر بار تغییر قدم ، مقدار قدم جاری در ریداکس ثبت می شود تا نقشه بفهمد که لوکیسن جاری مربوط به مبدا است یا مقصد
    switch (activeStep) {
      case 0:
        dispatch({
          type: "Update_Step_Status",
          payload: "custommerInfo",
        });
        break;
      case 1:
        dispatch({
          type: "Update_Step_Status",
          payload: "origin",
        });
        break;
      // case 2:
      //   dispatch({
      //     type: "Update_Step_Status",
      //     payload: "destination",
      //   });
      //   break;
      case 2:
        dispatch({
          type: "Update_Step_Status",
          payload: "tripDetails",
        });
        break;
      case 3:
        dispatch({
          type: "Update_Step_Status",
          payload: "carSelection",
        });
      case 4:
        dispatch({
          type: "Update_Step_Status",
          payload: "registerCommuter",
        });

        break;
    }
  }, [activeStep]);

  const handleNext = () => {
    if (activeStep == steps.length - 3 && trip?.commuter?.id) {
      setActiveStep((prevActiveStep) => prevActiveStep + 2);
  
    } else if (activeStep == steps.length - 2 && !trip?.commuter?.id) {
      console.log("oomad k mosafer sab kone", activeStep, trip?.commuter?.id);
      const { id, firstName, lastName, codeMelli, email, phone, mobile } =
        trip?.commuter;
      setIsLoading(true);

    } else if (activeStep == steps.length - 1) {
   
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };



  const handleBack = () => {
    // setIsDisableStep(false);
    if (activeStep == steps.length - 1 && trip?.commuter?.id) {
      setActiveStep((prevActiveStep) => prevActiveStep - 2);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleDisableStep = () => {
    let isDisable = false;
    switch (activeStep) {
      case 1:
        if ((trip.origin.address && trip.destination.address)||(trip.origin.formatted_address && trip.destination.formatted_address)) {
          isDisable = false;
        } else {
          isDisable = true;
        }
        break;
      case 2:
        if (
          trip.details.tripStartDate &&
          trip.details.passengerCount &&
          trip.details.luggageCount
        ) {
          isDisable = false;
        } else {
          isDisable = true;
        }
        break;

      default:
        if (isLoading) {
          isDisable = true;
        } else {
          isDisable = false;
        }
        break;
    }

    // setIsDisableStep(isDisable);
    return isDisable;
  };
  return (
    <Box
      sx={{
        position: "absolute",
        background: "white",
        top: "1.5rem",
        left: "8rem",
        bottom: "1.5rem",
        overflowY: "auto",
        borderRadius: "0.5rem",
        zIndex:401
      }}
      p={3}
    >
      {/* {steps.map((step, index) => ( */}
      <Box
        width="18rem"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h6">
            {steps[activeStep]["label"] || ""}
          </Typography>
          <Box py={3}>{steps[activeStep]["component"] || ""}</Box>
        </Box>

        {/* Button step */}
        <Stack direction="row" justifyContent={"space-between"}>
          <Button
            variant="gradient"
            color="info"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            قبلی
          </Button>
          <Button
            // loading
            disabled={handleDisableStep()}
            variant="gradient"
            color="info"
            id="nextBtn"
            onClick={handleNext}
          >
            {/* {} */}

            {isLoading ? (
              <CircularProgress size={20} sx={{ color: "grey.500" }} />
            ) : activeStep === steps.length - 1 ? (
              " ثبت سفر"
            ) : activeStep === steps.length - 2 ? (
              " ثبت مسافر"
            ) : (
              "بعدی"
            )}
          </Button>
        </Stack>
      </Box>
      <Snackbar
        open={alertInfo.isShow}
        autoHideDuration={6000}
        onClose={() => setAlertInfo(initialAlertInfo)}
      >
        <Alert
          onClose={() => setAlertInfo(initialAlertInfo)}
          severity={alertInfo.type}
          sx={{ width: "100%", fontWeight: "bold" }}
        >
          {alertInfo.content}
        </Alert>
      </Snackbar>
      {/* ))} */}

      {/* {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )} */}
    </Box>
  );
}
