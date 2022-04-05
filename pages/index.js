import { Card, Grid, Text, Image, Center, Button } from "@mantine/core";
import { MongoClient } from "mongodb";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CardComponent from "../components/CardComponent";

const HomePage = (props) => {
  const [movies, setMovies] = useState(props.movies);
  const [isClicked, setIsClicked] = useState(false);

  const router = useRouter();

  const displayMeetups = () => {
    return movies.map((x) => (
      <Grid.Col
        key={x._id.toString()}
        xs={12}
        sm={6}
        md={4}
        lg={3}
        className="hover:scale-[120%] hover:z-20 duration-200 	"
      >
        <div className="flex-row justify-center items-center hover:shadow-2xl">
          <CardComponent
            movies={{
              imdbID: x.imdbID,
              Title: x.Title,
              Images: x.Images,
              Plot: x.Plot,
              ID: x._id,
            }}
          />
        </div>
      </Grid.Col>
    ));
  };

  console.log(process.env.DB_HOST);

  return (
    <div className="px-5 overflow-hidden">
      <Grid gutter="xl" style={{ marginTop: "20px" }}>
        {displayMeetups()}
      </Grid>
    </div>
  );
};

// export async function getStaticProps(context) {
//   try {
//     const res = await fetch("http://localhost:3000/api/handle-meetupv2", {
//       method: "GET",
//     });

//     const data = await res.json();

//     return {
//       props: { movies: data.movies, errMsg: "none" },
//     };
//   } catch (e) {
//     console.log(e);
//     return {
//       props: { meetups: [], errMsg: e.message },
//     };
//   }
// }

export async function getStaticProps(context) {
  const client = await MongoClient.connect(
    "mongodb+srv://niyoh55:niyoh55@cluster0.3elva.mongodb.net/movies?retryWrites=true&w=majority"
  );

  const db = client.db();

  const moviesCollection = db.collection("movies");

  const result = await moviesCollection.find().toArray();

  const nice = result.map((movie) => ({
    Title: movie.Title,
    Plot: movie.Plot,
    imdbID: movie.imdbID,
    Images: movie.Images,
    _id: movie._id.toString(),
  }));

  client.close();

  return {
    props: {
      movies: nice,
    },
  };
}

export default HomePage;
