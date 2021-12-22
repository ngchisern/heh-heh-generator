import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let jokes;

class JokesDAO {
  static async injectDB(conn) {
    if (jokes) {
      return;
    }

    try {
      jokes = await conn.db(process.env.RESTREVIEWS_NS).collection("jokes");
    } catch (e) {
      console.error("Unable to establish a connection");
    }
  }

  static async getJokes({ language = "English" }) {
    let query;

    query = { language: { $eq: language } };

    let cursor;

    try {
      cursor = await jokes.aggregate([
        { $match: query },
        { $sample: { size: 1 } },
      ]);
    } catch (e) {
      console.error(`Unable to issue find command ${e}`);
      return { jokesList: [], totalNumJokes: 0 };
    }

    try {
      const jokesList = await cursor.toArray();
      const totalNumJokes = await jokes.countDocuments(query);

      return { jokesList, totalNumJokes };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { jokesList: [], totalNumFacts: 0 };
    }
  }
}

export default JokesDAO;
