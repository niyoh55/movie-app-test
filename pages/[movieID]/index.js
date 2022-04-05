import { useRouter } from "next/dist/client/router";
import { Button, Card, Image, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import { MongoClient } from "mongodb";
import urlForApi from "../../url";

const Movie = (props) => {
  const { Title, Plot, Images } = props.movie;
  const router = useRouter();

  return (
    <div className="py-0">
      {/* <div className="bg-pink-400 py-5">
          <h1 className=" text-5xl ">Movie Details</h1>
        </div> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          shadow="sm"
          p="lg"
          component="a"
          target="_blank"
          style={{ width: "900px" }}
        >
          <Card.Section>
            <Image src={Images[0]} alt="No way!" />
          </Card.Section>

          <Text weight={500} className="text-orange-800 text-6xl mb-5" mt={20}>
            {Title}
          </Text>

          <Text style={{ fontSize: "34px" }}>{Plot}</Text>
        </Card>
      </div>
    </div>
  );
};

export async function getStaticPaths(req, res) {
  const client = await MongoClient.connect(
    "mongodb+srv://niyoh55:niyoh55@cluster0.3elva.mongodb.net/movies?retryWrites=true&w=majority"
  );

  const db = client.db();

  const moviesCollection = db.collection("movies");

  const result = await moviesCollection.find().toArray();

  const nice = result.map((movie) => ({ params: { movieID: movie.imdbID } }));

  client.close();

  return {
    fallback: false,
    paths: nice,
  };
}

export async function getStaticProps(context) {
  try {
    const res = await fetch(`${urlForApi}/api/${context.params.movieID}`, {
      method: "GET",
    });
    const data = await res.json();

    return {
      props: {
        movie: data.movie,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        movie: [],
      },
    };
  }
}

export default Movie;
