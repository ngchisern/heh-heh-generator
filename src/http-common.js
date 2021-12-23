import axios from "axios";

export default axios.create({
  baseURL: "https://heh-heh-generator.herokuapp.com/api/v1/",
  headers: {
    "Content-type": "application/json",
  },
});
