import { TextInput, Button } from "@mantine/core";
import { useState } from "react";

import { useRouter } from "next/dist/client/router";

const AddMovie = (props) => {
  const router = useRouter();
  const [meetup, setMeetup] = useState("");
  const [description, setDesc] = useState("");
  const [imbdID, setImbdID] = useState("");

  const [imgURL, setImgURL] = useState("");
  const [imgURL2, setImgURL2] = useState("");

  const [imgURL3, setImgURL3] = useState("");

  const [imgURL4, setImgURL4] = useState("");

  const handleChange = (e, currState) => {
    currState(e.target.value);
  };

  const submitHandler = async () => {
    const arr = [imgURL, imgURL2, imgURL3, imgURL4];
    const filteredArr = arr.filter((x) => x !== "");
    try {
      const res = await fetch("/api/handle-meetupv2", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Title: meetup,
          Plot: description,
          imdbID: imbdID,
          Images: filteredArr,
        }),
      });

      console.log(await res.json());
    } catch (e) {
      console.log(e);
    } finally {
      router.push("/");
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="w-1/2 pt-20">
        <div className="mb-10">
          <h2 className="text-white text-3xl mb-5 text-left">Movie Title</h2>
          <TextInput
            value={meetup}
            onChange={(e) => handleChange(e, setMeetup)}
            placeholder="No Country for Old Men"
            required
          />
        </div>

        <div className="mb-10">
          <h2 className="text-white text-3xl mb-5 text-left">Movie Plot</h2>
          <TextInput
            onChange={(e) => handleChange(e, setDesc)}
            placeholder="While out hunting, Llewelyn Moss (Josh Brolin) finds the grisly aftermath of a drug deal. Though he knows better, he cannot resist the cash left behind and takes it with him. The hunter becomes the hunted when a merciless killer named Chigurh (Javier Bardem) picks up his trail."
            value={description}
            required
          />
        </div>

        <div className="mb-10">
          <h2 className="text-white text-3xl mb-5 text-left">IMBD ID</h2>
          <TextInput
            onChange={(e) => handleChange(e, setImbdID)}
            placeholder="tt12345"
            value={imbdID}
            required
          />
        </div>

        <div className="mb-10">
          <h2 className="text-white text-3xl mb-5 text-left">
            Movie Images URL (up to 4 images)
          </h2>
          <TextInput
            className="mt-5"
            onChange={(e) => handleChange(e, setImgURL)}
            placeholder=""
            value={imgURL}
            required
          />
          <TextInput
            className="mt-5"
            onChange={(e) => handleChange(e, setImgURL2)}
            placeholder=""
            value={imgURL2}
            required
          />
          <TextInput
            className="mt-5"
            onChange={(e) => handleChange(e, setImgURL3)}
            placeholder=""
            value={imgURL3}
            required
          />
          <TextInput
            className="mt-5"
            onChange={(e) => handleChange(e, setImgURL4)}
            placeholder=""
            value={imgURL4}
            required
          />
        </div>

        <Button
          onClick={submitHandler}
          variant="outline"
          color="pink"
          className="mt-20"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddMovie;
