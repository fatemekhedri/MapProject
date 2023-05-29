const mapProperties = {
  center: [35.699695013996866, 51.33807063102723],
  step: "origin",
  mapComponent:{},
  leafletLibrary:{}
};

const mapReducer = (state = mapProperties, action) => {
  switch (action.type) {
    case "Update_Center_Info":
      const updatedCenterInfo = { ...state };
      updatedCenterInfo.center = action.payload;
      return updatedCenterInfo;
    case "Update_Step_Status":
      const updateStepStatus = { ...state };
      updateStepStatus.step = action.payload;
      return updateStepStatus;
    case "Update_Map":
      let updatedMap = { ...state };
      updatedMap.mapComponent = { ...action.payload };
      return updatedMap;
    case "Update_Leaflet":
      let updatedLeaflet = { ...state };
      updatedLeaflet.leafletLibrary = { ...action.payload };
      return updatedLeaflet;
    default:
      return state;
  }
};

export default mapReducer;
