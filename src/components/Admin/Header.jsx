import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import TypingAnimation from "../TypingAnimation";

const Container = styled.div`
  font-size: 50px;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

const Header = () => {
  const user = useSelector((state) => state.user.firstname);
  // const user = "Anshul";
  return (
    <>
      <Container>
        <div style={{display:"flex"}}>
          <div style={{marginRight:"8px"}}>Welcome  </div>
          <TypingAnimation text={user} />
          <div>...</div>
        </div>

        <div>Today, What you want to do??</div>
      </Container>
    </>
  );
};

export default Header;
