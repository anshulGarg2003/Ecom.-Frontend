import React from "react";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import styled from "styled-components";
import { TfiFaceSad } from "react-icons/tfi";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 50px;
  flex-direction: column;
`;

const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <Container>
        <p>Page Not found!!</p>
        <TfiFaceSad size={50} />
      </Container>
      <NewsLetter />
      <Footer />
    </>
  );
};

export default ErrorPage;
