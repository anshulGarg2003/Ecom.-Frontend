import React from "react";
import { IoMdHappy } from "react-icons/io";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  flex-direction: column;
`;

const StayTune = () => {
  return (
    <Container>
      <p>StayTune...</p> <IoMdHappy size={50} />
    </Container>
  );
};

export default StayTune;
