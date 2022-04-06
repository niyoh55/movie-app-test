import React from "react";
import { Card, Grid, Text, Image, Center, Button } from "@mantine/core";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const CardComponent = (props) => {
  const router = useRouter();

  const { imdbID, Images, Title, Plot } = props.movies;

  const [imgCounter, setImgCounter] = useState(0);

  const enterMouse = () => {
    let val = Math.floor(Math.random() * Images.length);

    setImgCounter(val === 0 ? val + 1 : val);
  };

  return (
    <Card
      onMouseEnter={enterMouse}
      onMouseLeave={() => setImgCounter(0)}
      onClick={() => router.push(`/` + imdbID.toString())}
      className="bg-gray-100 h-[35rem] rounded-xl"
    >
      <Card.Section>
        <Image
          src={Images.length === 1 ? Images[0] : Images[imgCounter]}
          height={400}
          fit="cover"
        />
      </Card.Section>
      <p className="text-4xl my-10 font-bold tracking-tight">{Title}</p>
      {/* <p className="text-base">{Plot}</p> */}
    </Card>
  );
};

export default CardComponent;
