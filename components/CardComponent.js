import React from "react";
import { Card, Grid, Text, Image, Center, Button } from "@mantine/core";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const CardComponent = (props) => {
  const router = useRouter();

  const { imdbID, Images, Title, Plot } = props.movies;
  const [isClicked, setIsClicked] = useState(false);

  const [imgCounter, setImgCounter] = useState(0);

  // const [imgCounter, setImgCounter] = useState(0);

  // let intervalID;

  // function changeImage() {
  //   if (imgCounter < Images.length - 1) {
  //     setImgCounter((imgCounter) => imgCounter + 1);
  //     console.log(imgCounter);
  //   } else if (imgCounter == Images.length - 1) {
  //     console.log(imgCounter + ": nice");
  //     setImgCounter(0);
  //   }
  // }

  // const hoverCard = () => {
  //   // check if already an interval has been set up
  //   intervalID = setInterval(changeImage, 1000);

  //   console.log("enter");
  // };

  // const exitHoverCard = () => {
  //   console.log("exit");
  //   return clearInterval(intervalID);
  // };

  const enterMouse = () => {
    let val = Math.floor(Math.random() * Images.length);

    setImgCounter(val === 0 ? val + 1 : val);
  };

  return (
    <Card
      onMouseEnter={enterMouse}
      onMouseLeave={() => setImgCounter(0)}
      radius={5}
      onClick={() => router.push(`/` + imdbID.toString())}
      className="bg-gray-400 h-[550px]"
    >
      <Card.Section>
        <Image src={Images[imgCounter]} height={400} fit="cover" />
      </Card.Section>

      <Text weight={500} size="lg" mt={20}>
        {Title}
      </Text>

      <Text size="sm">{Plot}</Text>
    </Card>
  );
};

export default CardComponent;
