import { React, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import Button from "../controls/MDButton";
import { useTheme } from "@mui/material/styles";

const AdvancedDialog = (props) => {
  const { content, title, disAgree, agree, flag, returnFlag, agreeClick } =
    props;
  const [open, setOpen] = useState(flag);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
    returnFlag(false);
  };

  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
      <Dialog
        fullWidth="fullWidth"
        maxWidth="md"
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText py={2} px={3}>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions display="flex" justifyContent="center">
          <Button
            fullWidth
            variant="gradient"
            color="error"
            onClick={handleClose}
            // m={2}
            // label={disAgree}
            sx={{ marginLeft: "10px" }}
          >
            {disAgree}
          </Button>
          <Button
            fullWidth
            variant="gradient"
            color="info"
            onClick={agreeClick}
            m={2}
            // label={agree}
          >
            {agree}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default AdvancedDialog;
