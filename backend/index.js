import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import JokesDAO from "./dao/jokesDAO.js";
import PickUpLinesDAO from "./dao/pickUpLinesDAO.js";
import FactsDAO from "./dao/factsDAO.js";
dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await JokesDAO.injectDB(client);
    await PickUpLinesDAO.injectDB(client);
    await FactsDAO.injectDB(client);
    await app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
