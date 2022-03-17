import React, { useEffect, useState } from "react";
import styled from "styled-components";
import html2canvas from "html2canvas";

const Home = () => {
  const [topText, settoptext] = useState();
  const [bottomText, setbottomtext] = useState();
  const [allmeme, setallmeme] = useState([]);
  const [randomImage, setrandomImage] = useState(
    "http://i.imgflip.com/1bij.jpg"
  );

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        setallmeme(memes);
      });
  }, []);

  let handleChange = (event) => {
    console.log("Working change");
    if (event.target.name === "topText") {
      settoptext(event.target.value);
    } else if (event.target.name === "bottomText") {
      setbottomtext(event.target.value);
    }
  };
  let handleSubmit = (event) => {
    console.log("Working");
    event.preventDefault();
    const randNum = Math.floor(Math.random() * allmeme.length);
    const randMemeImg = allmeme[randNum].url;
    setrandomImage(randMemeImg);
  };
  const TestButton = () => {
    html2canvas(document.getElementById("meme")).then(function (canvas) {
      console.log(document.body.appendChild(canvas));
      var link = document.createElement("a");
      link.download = "filename.png";
      link.href = document.body.appendChild(canvas).toDataURL();
      link.click();
    });
    console.log("here");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        Top Text
        <Input
          type="text"
          name="topText"
          placeholder="Top Text"
          value={topText}
          onChange={handleChange}
        />
        Bottom Text
        <Input
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
          value={bottomText}
          onChange={handleChange}
        />
        <Button>Generate New Image</Button>
      </Form>
      <Button onClick={TestButton}>Download</Button>
      <Meme className="meme">
        <Memetext>{topText}</Memetext>

        <Image alt="meme" src={randomImage} />
        <Memetext>{bottomText}</Memetext>
      </Meme>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  background-color: rgba(1, 1, 1, 0.4);
  height: 100%;
  width: 100%;
  padding: 30px;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  margin: 10px;
  border-radius: 10px;
  align-items: center;
`;
const Form = styled.form``;

const Button = styled.button`
  padding: 10px;
  background-color: blueviolet;
  border-radius: 10px;
`;
const Meme = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  color: white;
  max-width: 567px;
  align-items: center;
  text-align: center;
  background-color: black;
`;
const Image = styled.img`
  width: 567px;
  height: 500px;
`;

const Memetext = styled.h2``;
