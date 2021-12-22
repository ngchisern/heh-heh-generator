import PickUpLinesDAO from "../dao/pickUpLinesDAO.js";

class PickUpLinesController {
  static async apiGetPickUpLines(req, res, next) {
    let filters = {};
    if (req.query.religious) {
      filters.religious = false;
    }

    if (req.query.racist) {
      filters.racist = false;
    }

    if (req.query.explicit) {
      filters.explicit = false;
    }

    const { pickUpLinesList, totalNumPickUpLines } =
      await PickUpLinesDAO.getPickUpLines(filters);

    let response = pickUpLinesList[0]
      ? {
          ...pickUpLinesList[0],
          lang: "en",
        }
      : { error: "No available data" };

    res.json(response);
  }
}

export default PickUpLinesController;
