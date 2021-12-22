import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let pickUpLines;

class PickUpLinesDAO {
  static async injectDB(conn) {
    if (pickUpLines) {
      return;
    }

    try {
      pickUpLines = await conn
        .db(process.env.RESTREVIEWS_NS)
        .collection("pick-up-lines");
    } catch (e) {
      console.error("Unable to establish a connection");
    }
  }

  static async getPickUpLines({
    religious = true,
    racist = true,
    explicit = true,
  }) {
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
      cursor = await pickUpLines.aggregate([
        { $match: query },
        { $sample: { size: 1 } },
      ]);
    } catch (e) {
      console.error(`Unable to issue find command ${e}`);
      return { pickUpLinesList: [], totalNumPickUpLines: 0 };
    }

    try {
      const pickUpLinesList = await cursor.toArray();
      const totalNumPickUpLines = await pickUpLines.countDocuments(query);

      return { pickUpLinesList, totalNumPickUpLines };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { pickUpLinesList: [], totalNumPickUpLines: 0 };
    }
  }
}

export default PickUpLinesDAO;
