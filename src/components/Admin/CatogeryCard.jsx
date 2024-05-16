import React from "react";
import styled from "styled-components";
import { MdCategory } from "react-icons/md";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Container = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid black;
  box-shadow: 2px 2px 0 0 gray;
  font-size: x-large;
  margin: 5px 5px;
  transition: transform 0.3s ease-in-out;
  /* margin-bottom: 10px; */
  &:hover {
    transform: scale(1.1); /* Increase size on hover */
    cursor: pointer; /* Change cursor to pointer on hover */
    background-color: aliceblue;
    box-shadow: 4px 4px 0 0 gray; /* Change box shadow on hover */
  }
`;

const CatogeryCard = () => {
  const history = useHistory();

  // Define a function to handle the click event
  const handleClick = () => {
    // Use history.push inside a function to navigate to a different route
    // console.log("Hello");
    history.push("/admin/addcategory");
  };

  return (
    <>
      <Container onClick={handleClick}>
        <MdCategory size={30} />
        Change Category
      </Container>
    </>
  );
};

export default CatogeryCard;
