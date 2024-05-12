import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CategorySlider from "../components/CategorySlider";

const Title = styled.h1`
  margin: 20px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 10%;
`;

function Home() {
  const history = useHistory();
  return (
    <div>
      <Navbar />
      <Announcement />
      <Slider />
      <Title>Categories</Title>
      <Categories />
      <Title>
        <p>Products</p>{" "}
        <Button onClick={() => history.push("/products/")}>More...</Button>
      </Title>
      <Products />
      <Title>Trending Products</Title>
      <Products sort={"newest"} />
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default Home;
