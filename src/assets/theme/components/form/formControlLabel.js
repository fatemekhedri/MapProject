// Material Dashboard 2 React base styles
import colors from "../../base/colors";
import typography from "../../base/typography";

// Material Dashboard 2 React helper functions
import pxToRem from "../../functions/pxToRem";

const { dark,grey } = colors;
const { size, fontWeightBold } = typography;

const formControlLabel = {
  styleOverrides: {
    root: {
      display: "block",
      minHeight: pxToRem(24),
      marginBottom: pxToRem(2),
    },

    label: {
      display: "inline-block",
      fontSize: size.xs,
      //fontWeight: fontWeightBold,
      color: dark.main,
      //   lineHeight: 1,
      transform: `translateY(${pxToRem(1)})`,
      //marginLeft: pxToRem(4),

      "&.Mui-disabled": {
        color: grey[50],
      },
    },
  },
};

export default formControlLabel;
