import { MongoClient } from "mongodb";

const handleCall = async (req, res) => {
  const client = await MongoClient.connect(
    "mongodb+srv://niyoh55:niyoh55@cluster0.3elva.mongodb.net/movies?retryWrites=true&w=majority"
  );

  const db = client.db();

  const moviesCollection = db.collection("movies");

  if (req.method === "GET") {
    try {
      console.log("GET_ONE MOVIE CALLED");

      const result = await moviesCollection.findOne({
        imdbID: req.query.movieID,
      });

      await client.close();
      res.status(200).json({ message: "Movies Fetched", movie: result });
    } catch (e) {
      console.log(e);
    }
  }
};

export default handleCall;
