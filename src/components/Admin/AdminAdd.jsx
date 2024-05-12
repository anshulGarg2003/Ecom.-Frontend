import React from "react";
import { IoIosContacts } from "react-icons/io";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import styled from "styled-components";

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

const AdminAdd = () => {
  const history = useHistory();

  const handleClick = () => {
    // console.log("Hello");
    history.push("/admin/addadmin");
  };

  return (
    <>
      <Container onClick={handleClick}>
        <IoIosContacts size={30} />
        Add Admin
      </Container>
    </>
  );
};

export default AdminAdd;
