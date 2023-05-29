import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
  Stack,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
} from "@mui/material";

import LuggageIcon from "@mui/icons-material/Luggage";

import MonetizationOn from "@mui/icons-material/MonetizationOn";
import AddCardIcon from "@mui/icons-material/AddCard";
import DriveIcon from "@mui/icons-material/DriveEta";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

import theme from "../../assets/theme";
const { spacing } = theme;

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

const ColorlibStepIcon = (props) => {
  const { active, completed, className } = props;
  const icons = {
    1: <MonetizationOn />,
    2: <AddCardIcon />,
    3: <DriveIcon />,
    4: <LuggageIcon />,
    5: <CardTravelIcon />,
    6: <CreditScoreIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
};

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

//Steps titles
const steps = [
  "رزرو شده و منتظر پیش پرداخت",
  "تایید دریافت پیش پرداخت",
  "اختصاص راننده به سفر",
  "پایان سفر",
  "ریکاوری",
  "مالی",
  "آرشیو",
];

const BookingSteps = (props) => {
  return (
    <Stack sx={{ width: "100%", marginTop: spacing(3) }} spacing={4}>
      <Stepper
        alternativeLabel
        //شماره اندیس آرایه - در واقع شماره اندیس مرحله ای که فعال است
        activeStep={props.activeStep - 1}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};
export default BookingSteps;
BookingSteps.propTypes = {
  activeStep: PropTypes.bool,
};
