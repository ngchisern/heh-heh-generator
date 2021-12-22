import JokesDAO from "../dao/jokesDAO.js";

class JokesController {
  static async apiGetJokes(req, res, next) {
    const jokesPerPage = req.query.jokesPerPage
      ? parseInt(req.query.jokesPerPage, 10)
      : 20;

    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.language) {
      filters.language = req.query.language;
    }

    const { jokesList, totalNumJokes } = await JokesDAO.getJokes(filters);

    let response = {
      jokes: jokesList,
      language: filters.language || "English",
    };

    res.json(response);
  }
}

export default JokesController;
