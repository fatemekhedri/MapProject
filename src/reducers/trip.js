const trip = {
  commuter: {
    id: "",
    firstName: "",
    lastName: "",
    codeMelli: "",
    email: "",
    gender: "",
    phone: "",
    mobile: "",
    address: "",
  },
  origin: {
    address: "",
    city: null,
    county: "",
    district: null,
    fclass: "",
    geom: {
      coordinates: [],
      length: 0,
      type: "Point",
    },
    neighborhood: null,
    province: "",
    region: null,
    title: "",
    type: "",
  },
  destination: {
    address: "",
    city: null,
    county: "",
    district: null,
    fclass: "",
    geom: {
      coordinates: [],
      length: 0,
      type: "Point",
    },
    neighborhood: null,
    province: "",
    region: null,
    title: "",
    type: "line",
  },
  details: {
    tripDays: 0,
    tripCarStatus: null,
    carAtDisposalHours: null,
    tripCarType: "",
    passengerCount: 0,
    driverFood: 0,
    hasComeback: 0,
    tripStartDate: "",
    luggageCount: 0,
    tripPet: 0,
    tripDisability: 0,
  },
  prices: [],
};

const tripReducer = (state = trip, action) => {
  switch (action.type) {
    case "Update_Commuter_Info":
      const updatedCommuterInfo = { ...state };
      updatedCommuterInfo.commuter = { ...action.payload };
      return updatedCommuterInfo;
    case "Update_Origin_Info":
      const updatedOriginInfo = { ...state };
      updatedOriginInfo.origin = { ...action.payload };
      return updatedOriginInfo;
    case "Update_Destination_Info":
      const updatedDestinationInfo = { ...state };
      updatedDestinationInfo.destination = { ...action.payload };
      return updatedDestinationInfo;
    case "Update_Details":
      const updatedDetails = { ...state };
      updatedDetails.details = { ...action.payload };
      return updatedDetails;
    case "Update_Prices":
      const updatedPrices = { ...state };
      updatedPrices.prices = action.payload;
      return updatedPrices;
    case "Clear_Trip":
      return trip;
    case "Update_Trip":
      let updatedTrip = { ...state };
      updatedTrip = { ...action.payload };
      return updatedTrip;
 
    default:
      return state;
  }
};

export default tripReducer;
