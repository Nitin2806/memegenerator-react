import React, { useEffect, useState } from "react";
import styled from "styled-components";
import html2canvas from "html2canvas";

const Home = () => {
  const [topText, settoptext] = useState("");
  const [bottomText, setbottomtext] = useState("");
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
    if (event.target.name === "topText") {
      settoptext(event.target.value);
    } else if (event.target.name === "bottomText") {
      setbottomtext(event.target.value);
    }
  };
  let handleSubmit = (event) => {
    event.preventDefault();
    const randNum = Math.floor(Math.random() * allmeme.length);
    const randMemeImg = allmeme[randNum].url;
    setrandomImage(randMemeImg);
  };
  const TestButton = () => {
    html2canvas(document.getElementById("meme"), {
      allowTaint: false,
      useCORS: true,
    }).then(function (canvas) {
      var link = document.createElement("a");
      link.download = "meme.png";
      link.href = document.body.appendChild(canvas).toDataURL();
      link.click();
      document.body.removeChild(canvas);
    });
  };

  return (
    <Container>
      <Header>
        <Form onSubmit={handleSubmit}>
          <Label>Top Text</Label>
          <Input
            type="text"
            name="topText"
            placeholder="Top Text"
            value={topText}
            onChange={handleChange}
          />
          <Label> Bottom Text</Label>
          <Input
            type="text"
            name="bottomText"
            placeholder="Bottom Text"
            value={bottomText}
            onChange={handleChange}
          />
          <Button>Generate New Image</Button>
        </Form>
        <Download onClick={TestButton}>Download image</Download>
      </Header>

      <LowerBody>
        {" "}
        <Meme id="meme">
          <Memetext>{topText}</Memetext>
          <Image alt="meme" src={randomImage} crossorigin />
          <Memetext>{bottomText}</Memetext>
        </Meme>
      </LowerBody>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  background-color: #121212;
  color: white;
  height: 100vh;
`;

const Header = styled.div`
  height: 10vh;
  background-color: #150050;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  @media (max-width: 724px) {
    flex-direction: column;
    height: 30vh;
  }
`;

const Form = styled.form`
  text-align: center;
  margin-top: 10px;
  @media (max-width: 724px) {
    display: flex;
    flex-direction: column;
  }
`;

const Label = styled.label`
  font-weight: 600;
  color: white;
  font-size: 20px;
  @media (max-width: 724px) {
    font-size: 15px;
  }
`;

const Input = styled.input`
  border: none;
  padding: 8px;
  margin: 10px 10px 0 10px;
  text-align: center;
  border-radius: 10px;
  align-items: center;
  @media (max-width: 724px) {
    padding: 5px;
    margin: 10px 10px 0 10px;
  }
`;

const LowerBody = styled.div`
  @media (max-width: 724px) {
  }
`;
const Button = styled.button`
  padding: 10px;
  border: none;
  font-weight: 600;
  color: white;
  background-color: #610094;
  border-radius: 10px;
  cursor: pointer;
  @media (max-width: 724px) {
  }
`;
const Download = styled.button`
  border: none;
  font-weight: 600;
  color: white;
  height: 50px;
  margin-top: 10px;
  margin-left: 10px;
  background-color: #610094;
  border-radius: 10px;
  cursor: pointer;
  @media (max-width: 724px) {
  }
`;
const Meme = styled.div`
  margin-top: 70px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
  color: white;
  max-width: 567px;
  align-items: center;
  text-align: center;
  background-color: black;
  @media (max-width: 724px) {
  }
`;

const Image = styled.img`
  background-repeat: no-repeat;
  width: 567px;
  height: 500px;
  @media (max-width: 724px) {
    width: 300px;
    height: 300px;
  }
`;

const Memetext = styled.h2``;
