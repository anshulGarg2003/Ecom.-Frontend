import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Products from "../components/Products";
import ViewCart from "../components/ViewCart";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { publicRequest } from "../requestMethos";

const Container = styled.div`
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Successbox = styled.div`
  background-color: #00a35f;
  width: 40%;
  border-radius: 10px;
  height: 20%;
  color: white;
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 20px;
  align-items: center;
`;
const Title = styled.h1`
  margin: 20px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 10%;
`;
const Message = styled.p`
  margin: 10px;
`;

const Success = () => {
  const location = useLocation();
  const OrderId = location.state?.OrderId || null;
  const [cartData, setCartData] = useState({});
  const history = useHistory();
  console.log(OrderId);
  useEffect(() => {
    const getCarts = async () => {
      try {
        const res = await publicRequest.get(`/carts/find/${OrderId}`);
        console.log(res.data);
        setCartData(res.data);
      } catch (err) {
        console.error("Error fetching carts:", err);
      }
    };
    getCarts();
  }, [OrderId]);
  console.log(cartData);

  return (
    <>
      <Navbar />
      <Announcement />
      <Container>
        <Successbox>SuccessFull</Successbox>
        <Message>Thank You for Shopping with us...</Message>
        <Message>Your OrderId Is:</Message>
        <Message>{OrderId}</Message>
      </Container>
      {Object.keys(cartData).length !== 0 && <ViewCart cart={cartData} />}

      <Title>
        <p>Trending Products</p>{" "}
        <Button onClick={() => history.push("/products/")}>More...</Button>
      </Title>
      <Products />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default Success;
