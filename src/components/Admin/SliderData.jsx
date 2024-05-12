import React from "react";
import { MdCategory } from "react-icons/md";
import styled from "styled-components";
import { BsSliders } from "react-icons/bs";
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

const SliderData = () => {

  const history = useHistory();
  

  const handleClick = () => {
    history.push("/admin/slideredit");
  };

  return (
    <>
      <Container onClick={handleClick}>
        <BsSliders size={30} />
        Change Slider
      </Container>
    </>
  );
};

export default SliderData;
