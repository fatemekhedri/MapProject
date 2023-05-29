import Axios from "axios";

// export const searchAddress = (params) => {
//   // console.log("params in search address on map---->", params);
//   return fetch(`https://map.ir/search/v2/`, {
//     method: "POST",
//     headers: {
//       "x-api-key":
//         "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQ4YzFjYzE1ZmYwYjQ3ZjA4MjM0NGRjN2FhMWNkZjk4ODdiOWMyZjU5NTA0ZjYyNTYwOGZhM2FiY2RhZjE3ZmZhZmFmYjZlNTg5ODFhODIzIn0.eyJhdWQiOiIxNTMyNyIsImp0aSI6ImQ4YzFjYzE1ZmYwYjQ3ZjA4MjM0NGRjN2FhMWNkZjk4ODdiOWMyZjU5NTA0ZjYyNTYwOGZhM2FiY2RhZjE3ZmZhZmFmYjZlNTg5ODFhODIzIiwiaWF0IjoxNjMwNDYxNjg5LCJuYmYiOjE2MzA0NjE2ODksImV4cCI6MTYzMzE0MzY4OSwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.PQnzXJod1OenTv6z60cG1KXUpkAvz39cvRuN5k-IzCgpREB8HlbQkcqhl3YnmcUnuKsaAbvbzIZXMyvOFgaR52zJGsrVdT1_FS0I2RwuWe-Xf4aOUUTNeAw4exwTc9ngsu_8f0aOD-IcLTmDesHBcQyiLwT42K40ZExcvkqpi7XSvnOWg2_v8zyDVSUtXmQb6ZdDBdj8VkL9O9AVCFX8t3Vsds44JhxVL7o3FtOMP1Bv0S1HSym_5XefozSES3Y_pZgrs6xGma6FWM4FjDk0rq0UlAgGK9LUHT1fhX0RF_IzuWzmXSObcYkMU0LAvluuf0jRzvjEfJZdPN4JvVHRZQ", //Mapir access token
//       "Mapir-SDK": "reactjs",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(params),
//   });
// };

export const searchAddress = (params) => {
  console.log("params chiee k mifrestii", params);
  return new Promise((resolve, reject) => {
    let headers = {
      "Content-Type": "application/json",
      "Api-Key": "service.f34892aed71b4e30a3f96b39d18016ae",
    };
    // console.log(
    //   "url chiee",
    //   `https://api.neshan.org/v4/geocoding?address=فاطمی فرد`
    // );
    // console.log(
    //   "url chiee",
    //   `https://api.neshan.org/v4/geocoding?address=${params}`
    // );
    Axios({
      method: "GET",
      url: `https://api.neshan.org/v1/search?term=${params}&lat=35.699695013996866&lng=51.33807063102723`,
      headers,
    })
      .then((response) => {
        console.log("response search address ", response);
        resolve(response?.data?.items || []);
        // if (response.location) {
        //   const { location } = response;
        //   Axios({
        //     method: "GET",
        //     url: `https://api.neshan.org/v1/search?term=${params}&lat=${location.x}&lng=${location.y}`,
        //     headers,
        //   })
        //     .then((response) => {
        //       console.log("response in search nahaeiii", response);

        //       // console.log("response in local", response);
        //       resolve(response);
        //     })
        //     .catch((error) => {
        //       reject(error);
        //     });
        // }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
