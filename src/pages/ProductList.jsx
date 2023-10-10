import { styled } from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { mobile } from "../responsive";

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({ margin: "10px",textAlign:"center" })}
`;
const FilterText = styled.span`
  font-size: 25px;
  font-weight: 600;
  margin-right: 10px;
  ${mobile({ fontSize: "15px" })}
`;

const Select = styled.select`
  border: none;
  margin: 0px 20px;
  padding: 10px;
  font-size: 15px;
  text-align: center;
  &:custom-select {
    line-height: 3;
  }
`;
const Option = styled.option`
  border: none;
  padding: 10%;
  line-height: 2;
`;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  // console.log(cat);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleChange = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  // console.log(filters);

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="colour" onChange={handleChange}>
            <Option disabled>Colour</Option>
            <Option value="white">White</Option>
            <Option value="balck">Black</Option>
            <Option value="red">Red</Option>
            <Option value="blue">Blue</Option>
            <Option value="yellow">Yellow</Option>
            <Option value="green">Green</Option>
          </Select>
          <Select name="size" onChange={handleChange}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="aesc">Price(Low To High)</Option>
            <Option value="desc">Price(High To Low)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default ProductList;
