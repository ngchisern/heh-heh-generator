import axios from "axios";

const http = axios.create({
  baseURL: "https://v2.jokeapi.dev/joke/",
  headers: {
    "Content-type": "application/json",
  },
});

class JokeDataService {
  getJoke({ religious, racist, explicit }) {
    const flags = `${religious ? "religious," : ""}${racist ? "racist," : ""}${
      explicit ? "explicit," : ""
    }`;

    return http.get(
      `Any` + (!!flags ? `?blacklistFlags=${flags.slice(0, -1)}` : "")
    );
  }
}

export default new JokeDataService();
