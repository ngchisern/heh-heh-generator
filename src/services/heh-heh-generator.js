import http from "../http-common";

class HehHehGeneratorDataService {
  getFact({ religious, racist, explicit }) {
    let condition = `?`;
    if (religious) {
      condition += `religious=true&`;
    }
    if (racist) {
      condition += `racist=true&`;
    }
    if (explicit) {
      condition += `explicit=true`;
    }
    return http.get(`facts${condition}`);
  }

  getPickUpLines({ religious, racist, explicit }) {
    let condition = `?`;
    if (religious) {
      condition += `religious=true&`;
    }
    if (racist) {
      condition += `racist=true&`;
    }
    if (explicit) {
      condition += `explicit=true`;
    }
    return http.get(`pick-up-lines${condition}`);
  }
}

export default new HehHehGeneratorDataService();
