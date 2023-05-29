export const updateCommuterInfo = () => {
  return {
    type: "Update_Commuter_Info",
  };
};

export const UpdateOriginInfo = (origin) => {
  return {
    type: "Update_Origin_Info",
    payload: origin,
  };
};

export const UpdateDestinationInfo = (destination) => {
  return {
    type: "Update_Destination_Info",
    payload: destination,
  };
};

export const UpdateTripDetails = (details) => {
  return {
    type: "Update_Trip_Details",
    payload: details,
  };
};
export const clearTrip = () => {
  return {
    type: "Clear_Trip",
  };
};
export const updateTrip = (tripInfo) => {
  return {
    type: "Update_Trip",
    payload: tripInfo,
  };
};
