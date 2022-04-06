import { useRouter } from "next/dist/client/router";
import { Button, Card, Image, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import { MongoClient } from "mongodb";
import urlForApi from "../../url";
import { data } from "autoprefixer";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Movie = (props) => {
  const { Title, Plot, Images } = props.movie;
  const router = useRouter();

  return (
    <div className="px-10 py-5 mx-8 mt-20 rounded-xl overflow-auto max-w-screen grid grid-cols-1 lg:grid-cols-2 font-serif text-black shadow-2xl bg-gray-100">
      <div className="h-full">
        <Carousel className="">
          {Images.map((x, index) => (
            <div key={index}>
              <img src={x} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex-none text-left px-10 py-10 ">
          <h1 className="text-8xl">{Title}</h1>
        </div>

        <div className=" w-full flex-1 ">
          <p className="text-left py-10 px-16 text-4xl">
            <span className="font-bold">Plot:</span> <br></br>
            {Plot}
          </p>
          <p className="text-left py-10 px-16 text-4xl">
            <span className="font-bold">Cast:</span> <br></br>
            Wala pa lods
          </p>
        </div>
      </div>
      {/* <div className=" w-full col-span-2 bg-red-400	">
        <p>dapat solo lang to</p>
      </div> */}
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

export async function getStaticProps({ params }) {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://niyoh55:niyoh55@cluster0.3elva.mongodb.net/movies?retryWrites=true&w=majority"
    );

    const db = client.db();

    const moviesCollection = db.collection("movies");

    const movie = await moviesCollection.findOne({
      imdbID: params.movieID,
    });

    return {
      props: {
        movie: { Images: movie.Images, Title: movie.Title, Plot: movie.Plot },
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        movie: {
          Images: null,
          Title: "Title placeholder",
          Plot: "Plot placeholder",
        },
      },
    };
  }

  // try {
  //   const res = await fetch(`${urlForApi}/api/${context.params.movieID}`, {
  //     method: "GET",
  //   });
  //   const data = await res.json();

  //   return {
  //     props: {
  //       movie: data.movie,
  //     },
  //   };
  // } catch (e) {
  //   console.log(e);
  //   return {
  //     props: {
  //       movie: [],
  //     },
  //   };
  // }
}

export default Movie;
