


import NotFound from "./notFound/notFound";

// @mui icons

import Icon from "@mui/material/Icon";

const routes = [

  {
    type: "collapse",
    name: "خطا",
    key: "dashboard/booking",
    icon: <Icon fontSize="small">route</Icon>,
    route: "/dashboard/booking",
    component: <NotFound />,
  },
  
];

export default routes;
