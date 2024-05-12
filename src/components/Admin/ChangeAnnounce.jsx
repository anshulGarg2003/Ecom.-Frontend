import React from "react";
import styled from "styled-components";
import { TfiAnnouncement } from "react-icons/tfi";

const Container = styled.div`
  width: 45%;
  height:45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid black;
  box-shadow: 2px 2px 0 0 gray;
  font-size: x-large;
  margin: 5px 5px;
  &:hover {
    transform: scale(1.5); /* Increase size on hover */
    cursor: pointer; /* Change cursor to pointer on hover */
    border-color: #00d9ff; /* Change border color on hover */
    box-shadow: 4px 4px 0 0 gray; /* Change box shadow on hover */
  }
  
`;

const ChangeAnnounce = () => {
  return (
    <>
      <Container>
        <TfiAnnouncement size={30} />
        Edit Announcement
      </Container>
    </>
  );
};

export default ChangeAnnounce;
