import Axios from "axios";

// export default function LocToAddress(e) {
//   console.log("param in local to address", e);
//   return new Promise((resolve, reject) => {
//     let test =
//       "https://api.neshan.org/v5/reverse?lat=29.669667200000003&lng=52.4531836";
//     var url = `https://api.neshan.org/v5/reverse?lat=${e[0]}&lng=${e[1]}`;
//     fetch(test, {
//       headers: {
//         "Content-Type": "application/json",
//         "Api-Key": "service.f34892aed71b4e30a3f96b39d18016ae", //Mapir access token
//       },
//     })
//       .then((response) => {
//         console.log("response in local to address", response);

//         response.json();
//       })
//       .then((data) => {
//         resolve(data);
//       });
//   });
// }
const LocToAddress = (params) => {
  return new Promise((resolve, reject) => {
    let headers = {
      "Content-Type": "application/json",
      "Api-Key": "service.f34892aed71b4e30a3f96b39d18016ae",
    };
    Axios({
      method: "GET",
      url: `https://api.neshan.org/v5/reverse?lat=${params[0]}&lng=${params[1]}`,
      headers,
    })
      .then((response) => {
        // console.log("response in local", response);
        resolve(response.data ? response.data : response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export default LocToAddress;
