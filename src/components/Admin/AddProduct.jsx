import React from "react";
import styled from "styled-components";
import { MdAddBusiness } from "react-icons/md";
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
  &:hover {
    transform: scale(1.1); /* Increase size on hover */
    cursor: pointer; /* Change cursor to pointer on hover */
    background-color: aliceblue;
    box-shadow: 4px 4px 0 0 gray; /* Change box shadow on hover */
  }
`;
const AddProduct = () => {

  const history = useHistory();

  const handleClick = () => {
    // console.log("Hello");
    history.push("/admin/addproduct");
  };

  return (
    <>
      <Container onClick={handleClick}>
        <MdAddBusiness size={30} />
        Add Product
      </Container>
    </>
  );
};

export default AddProduct;
