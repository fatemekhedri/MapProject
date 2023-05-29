import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Typography, Icon } from "@mui/material";
import DataTable from "../Tables/DataTable";
import Box from "./Box";
import colors from "../../assets/theme/base/colors";
import borders from "../../assets/theme/base/borders";

const { white, badgeColors } = colors;
const { borderRadius, borderWidth } = borders;
function GridView({ columns, title, rowData, icon, headerButton }) {
  //  console.log("gridView :", rows, columns);
  return (
    <Box pt={6} pb={3}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card sx={{ borderRadius: borderRadius.xxxl }}>
            <Box
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              // bgColor={badgeColors.info.background}
              bgColor="info"
              borderRadius={borderRadius.lg}
              coloredShadow="info"
              sx={{ display: "flex" }}
            >
              <Grid container>
                <Icon
                  fontSize="medium"
                  sx={{ marginRight: "0.25rem", color: white.main }}
                >
                  {icon}
                </Icon>
                <Typography variant="h6" color={white.main}>
                  {title}
                </Typography>
              </Grid>
              {headerButton}
            </Box>
            <Box pt={3}>
              <DataTable
                table={{ columns, rowData }}
                isSorted={true}
                entriesPerPage={true}
                showTotalEntries={true}
                canSearch={true}
                noEndBorder
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GridView;
