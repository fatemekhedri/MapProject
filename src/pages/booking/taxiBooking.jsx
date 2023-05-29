import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Controls } from "../../components/controls/Controls";
import { useSelector, useDispatch } from "react-redux";
import StepOne from "../../components/reservation/firstStep";
import StepTwo from "../../components/reservation/secondStep";
import StepThree from "../../components/reservation/thirdStep";
import StepFour from "../../components/reservation/fourthStep";
import StepFive from "../../components/reservation/fifthStep";

//Steps titles
const steps = [
  {
    label: "ثبت مشخصات مسافر",
    component: <StepOne />,
  },
  {
    label: "ثبت مبداٌ",
    component: <StepTwo />,
  },
  {
    label: "ثبت مقصد",
    component: <StepThree />,
  },
  {
    label: "جزئیات سفر",
    component: <StepFour />,
  },
  {
    label: "انتخاب ماشین",
    component: <StepFive />,
  },
  {
    label: "تاییدیه سفر",
    description: `Try out different ad text to see what brings in the most customers,
    and learn how to enhance your ads using features like ad extensions.
    If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function Reservation() {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(1);

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
      case 2:
        dispatch({
          type: "Update_Step_Status",
          payload: "destination",
        });
        break;
      case 3:
        dispatch({
          type: "Update_Step_Status",
          payload: "tripDetails",
        });
        break;
      case 4:
        dispatch({
          type: "Update_Step_Status",
          payload: "carSelection",
        });
        break;
    }
  }, [activeStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Paper
      style={{ margin: "16px 8px", padding: 8, width: "100%" }}
      variant="outlined"
    >
      <Box sx={{ maxWidth: 400, direction: "ltr" }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 5 ? (
                    <Typography variant="caption">مرحله پایانی</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                {step.component}
                <Box sx={{ mb: 2, direction: "rtl" }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "ثبت" : "بعدی"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      قبلی
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </Paper>
  );
}
