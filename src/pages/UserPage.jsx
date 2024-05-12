import React, { useState } from "react";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { CgProfile } from "react-icons/cg";
import { FaHeartPulse } from "react-icons/fa6";
import { FaCartFlatbedSuitcase } from "react-icons/fa6";
import EditUserDetails from "./EditUserDetails";
import Wishlist from "./Wishlist";
import { MdShoppingBag } from "react-icons/md";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import OrderList from "../components/OrderList";
import Products from "../components/Products";
const Title = styled.h1`
  margin: 20px;
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  height: 300px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  border-radius: 5px;
  justify-content: center;
`;

const LowerNav = styled.div`
  height: 60px;
  background-color: #13c7f9;
  display: flex;
  font-size: 30px;
  justify-content: space-between;
  /* padding-left: 10px; */
  /* padding-top: 5px; */
  /* gap: 15px; */
`;

const Option = styled.div`
  display: flex;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  align-items: center;
  gap: 3px;
  &:hover {
    cursor: pointer;
    background-color: #15bbe9;
  }
`;
const Button = styled.button`
  width: 10%;
`;

const UserPage = () => {
  // const [image, setImage] = useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [tag, setTag] = useState("profile");
  const history = useHistory();

  return (
    <>
      <Navbar />
      <Announcement />
      <hr />
      <LowerNav>
        <div style={{ display: "flex" }}>
          <Option
            style={{
              backgroundColor: tag === "profile" ? "#15bbe9" : "inherit",
            }}
            onClick={() => setTag("profile")}
          >
            Profile
            <CgProfile />
          </Option>
          <Option
            style={{
              backgroundColor: tag === "wishlist" ? "#15bbe9" : "inherit",
            }}
            onClick={() => setTag("wishlist")}
          >
            Wishlist <FaHeartPulse />
          </Option>
          <Option
            style={{
              backgroundColor: tag === "orders" ? "#00b0e1" : "inherit",
            }}
            onClick={() => setTag("orders")}
          >
            Orders <FaCartFlatbedSuitcase />
          </Option>
        </div>
        <div style={{ display: "flex" }}>
          <Option onClick={() => history.push("/")}>
            Continue Shopping <MdShoppingBag />
          </Option>
        </div>
      </LowerNav>
      {tag === "profile" ? (
        <EditUserDetails />
      ) : tag === "wishlist" ? (
        <Wishlist />
      ) : (
        <OrderList />
      )}
      <Title>
        <p>Trending Products</p>{" "}
        <Button onClick={() => history.push("/products/")}>More...</Button>
      </Title>
      <Products sort={"newest"} />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default UserPage;
