import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { styled } from "styled-components";

const Title = styled.h1`
  margin: 20px;
`;

function Home() {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Title>Our Caterories</Title>
      <Categories />
      <Title>Our Products</Title>
      <Products />
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default Home;
