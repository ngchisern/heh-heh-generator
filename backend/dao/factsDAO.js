import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let facts;

class FactsDAO {
  static async injectDB(conn) {
    if (facts) {
      return;
    }

    try {
      facts = await conn.db(process.env.RESTREVIEWS_NS).collection("facts");
    } catch (e) {
      console.error("Unable to establish a connection");
    }
  }

  static async getFacts({ religious = true, racist = true, explicit = true }) {
    let query = {};

    if (!religious) {
      query["flags.religious"] = { $eq: religious };
    }

    if (!racist) {
      query["flags.racist"] = { $eq: racist };
    }

    if (!explicit) {
      query["flags.explicit"] = { $eq: explicit };
    }

    let cursor;

    try {
      cursor = await facts.aggregate([
        { $match: query },
        { $sample: { size: 1 } },
      ]);
    } catch (e) {
      console.error(`Unable to issue find command ${e}`);
      return { factsList: [], totalNumFacts: 0 };
    }

    try {
      const factsList = await cursor.toArray();
      const totalNumFacts = await facts.countDocuments(query);

      return { factsList, totalNumFacts };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { factsList: [], totalNumFacts: 0 };
    }
  }
}

export default FactsDAO;
