import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";
import { NEW_URL } from "../requestMethos";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  /* height: 60vh; */
  width: 18vw;
  margin-bottom: 6px;
  position: relative;
  ${mobile({ justifyContent: "center", display: "flex" })}
`;

const Img = styled.img`
  width: 250px;
  min-height: 350px;
  max-height: 350px;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
  overflow-wrap: break-word;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  color: grey;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    transform: scale(1.3);
    transition: all 0.5s ease;
  }
`;

const CategoryItem = ({ item }) => {
  // console.log(item);
  return (
    <Container>
      <Img src={`${NEW_URL}/${item.img}`}></Img>
      <Info>
        <Title>{item.title}</Title>
        <Link to={`/products/${item.cat}`}>
          <Button>Shop Now</Button>
        </Link>
      </Info>
    </Container>
  );
};

export default CategoryItem;
