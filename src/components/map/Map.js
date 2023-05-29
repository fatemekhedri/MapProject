import Mapir from "mapir-react-component";

export const Map = Mapir.setToken({
  hash: true,
  logoPosition: "top-left",
  maxZoom: [16],
  transformRequest: (url) => {
    return {
      url: url,
      headers: {
        "x-api-key":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQ4YzFjYzE1ZmYwYjQ3ZjA4MjM0NGRjN2FhMWNkZjk4ODdiOWMyZjU5NTA0ZjYyNTYwOGZhM2FiY2RhZjE3ZmZhZmFmYjZlNTg5ODFhODIzIn0.eyJhdWQiOiIxNTMyNyIsImp0aSI6ImQ4YzFjYzE1ZmYwYjQ3ZjA4MjM0NGRjN2FhMWNkZjk4ODdiOWMyZjU5NTA0ZjYyNTYwOGZhM2FiY2RhZjE3ZmZhZmFmYjZlNTg5ODFhODIzIiwiaWF0IjoxNjMwNDYxNjg5LCJuYmYiOjE2MzA0NjE2ODksImV4cCI6MTYzMzE0MzY4OSwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.PQnzXJod1OenTv6z60cG1KXUpkAvz39cvRuN5k-IzCgpREB8HlbQkcqhl3YnmcUnuKsaAbvbzIZXMyvOFgaR52zJGsrVdT1_FS0I2RwuWe-Xf4aOUUTNeAw4exwTc9ngsu_8f0aOD-IcLTmDesHBcQyiLwT42K40ZExcvkqpi7XSvnOWg2_v8zyDVSUtXmQb6ZdDBdj8VkL9O9AVCFX8t3Vsds44JhxVL7o3FtOMP1Bv0S1HSym_5XefozSES3Y_pZgrs6xGma6FWM4FjDk0rq0UlAgGK9LUHT1fhX0RF_IzuWzmXSObcYkMU0LAvluuf0jRzvjEfJZdPN4JvVHRZQ", //Mapir access token
        "Mapir-SDK": "reactjs",
      },
    };
  },
});

<Mapir Map={Map} />;
