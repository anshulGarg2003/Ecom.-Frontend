import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Successbox = styled.div`
  background-color: #00a35f;
  width: 40%;
  border-radius: 10px;
  height: 10%;
  color:white;
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 20px;
  align-items: center;
`;

const Message = styled.p`
  margin: 10px;
`;

const Success = () => {
  const location=useLocation();
  const OrderId = location.state?.OrderId || null;
  return (
    <>
      <Navbar />
      <Announcement />
      <Container>
        <Successbox>
          SuccessFull
        </Successbox>
        <Message>Thank You for Shopping with us...</Message>
        <Message>Your OrderId Is:</Message>
        <Message>{OrderId}</Message>
      </Container>
      <NewsLetter />
      <Footer />
    </>
  );
};

export default Success;
