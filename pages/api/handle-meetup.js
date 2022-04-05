const url =
  "https://nextjs-meetup-tut-default-rtdb.asia-southeast1.firebasedatabase.app/meetups";

async function handler(req, res) {
  console.log(">>>>>>>>>>>>>>>>>>" + req.method);
  if (req.method === "GET") {
    console.warn("GET METHOD CALLED");
    try {
      const response = await fetch(url + ".json", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      const data = await response.json();

      res.status(200).json(data);
    } catch (e) {
      console.log(e);
    }
  } else if (req.method === "POST") {
    try {
      const response = await fetch(url + ".json", {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(await response.json());
      res.status(201).json({ message: "meetup added idolods" });
    } catch (e) {
      console.log(e);
    }
  } else if (req.method === "PUT") {
    const { id, meetupEdit, descriptionEdit, imgURLEdit } = req.body;
    console.warn(">>>>>>>>>>>PUT Method Called");
    try {
      const response = await fetch(url + `/${id}.json`, {
        method: "PUT",
        body: JSON.stringify({
          meetup: meetupEdit,
          description: descriptionEdit,
          imgURL: imgURLEdit,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(await response.json());
      res.status(204).json({ message: "Meetup Updated Successfuly" });
    } catch (e) {
      console.log(e);
    }
  }
}

export default handler;
