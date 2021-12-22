import FactsDAO from "../dao/factsDAO.js";

class FactsController {
  static async apiGetFacts(req, res, next) {
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

    const { factsList, totalNumFacts } = await FactsDAO.getFacts(filters);

    let response = factsList[0]
      ? {
          ...factsList[0],
          lang: "en",
        }
      : { error: "No available data" };

    res.json(response);
  }
}

export default FactsController;
