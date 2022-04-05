import { MongoClient } from "mongodb";

const handleCall = async (req, res) => {
  const client = await MongoClient.connect(
    "mongodb+srv://niyoh55:niyoh55@cluster0.3elva.mongodb.net/movies?retryWrites=true&w=majority"
  );

  const db = client.db();

  const moviesCollection = db.collection("movies");

  if (req.method === "POST") {
    const data = req.body;
    const result = await moviesCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "Movie Added" });
  } else if (req.method === "GET") {
    const result = await moviesCollection.find().toArray();

    client.close();

    res.status(200).json({ message: "Movies Fetched", movies: result });
  }
};

export default handleCall;
