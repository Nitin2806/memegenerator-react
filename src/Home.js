import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Home = () => {
  const [topText, settoptext] = useState();
  const [bottomText, setbottomtext] = useState();
  const [memeimage, setmemeimage] = useState("http://i.imgflip.com/1bij.jpg");
  const [allmeme, setallmeme] = useState([]);
  const [randomImage, setrandomImage] = useState();

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        setallmeme(memes);
      });
  });

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

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="topText"
          placeholder="Top Text"
          value={topText}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
          value={bottomText}
          onChange={handleChange}
        />
        <Button>Generate</Button>
      </Form>
      <Meme>
        <h2>{topText}</h2>

        <img alt="meme" src={memeimage} />
        <h2>{bottomText}</h2>
      </Meme>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  padding: 20px;

  background-color: rgba(0, 0, 0, 0.3);
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
  color: white;
  width: 567px;
  align-items: center;
  text-align: center;
  background-color: black;
`;
