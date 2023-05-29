export const updateCenterInfo = (location) => {
  return {
    type: "Update_Center_Info",
    payload: location,
  };
};
export const updateStepStatus = (status) => {
  return {
    type: "Update_Step_Status",
    payload: status,
  };
};
export const updateMap = (map) => {
  return {
    type: "Update_Map",
    payload: map,
  };
};
export const updateLeaflet = (leaflet) => {
  return {
    type: "Update_Leaflet",
    payload: leaflet,
  };
};
