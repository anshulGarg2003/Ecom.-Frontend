import { styled } from "styled-components";

import { useSelector } from "react-redux";
import { mobile } from "../responsive";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { makeRequestWithToken, publicRequest } from "../requestMethos";
import SingleCart from "./SingleCart";
import ViewCart from "./ViewCart";

const Bottom = styled.div`
  display: flex;
  margin: 0 30px;
  /* width: 100%; */
  flex-direction: column;
  ${mobile({ flexDirection: "column", justifyContent: "flex-start" })};
`;

const Info = styled.div`
  display: flex;
  width: 100%;
  margin-right: 10px;
  padding-right: 10px;
  overflow-x: scroll;
  scroll-behavior: smooth;
  scrollbar-width: 5px;
`;

const Empty = styled.div`
  display: flex;
  height: 50vh;
  text-align: center;
  margin: 10px;
  justify-content: center;
  align-items: center;
`;

const OrderList = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [orderList, setOrderList] = useState([]);
  const [carts, setCarts] = useState([]);
  const [selectedCart, setSelectedCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleViewCart = (cart) => {
    setSelectedCart(cart);
  };

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await makeRequestWithToken(
          `users/getorders/${user.userId}`,
          user.token,
          user.isAdmin,
          "get"
        );
        return res;
      } catch (err) {
        console.log(err);
        throw err; // Rethrow the error to be caught outside this function
      }
    };

    getOrder()
      .then((res) => {
        // Once the result is obtained, update the state
        setOrderList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        // Handle errors from getOrder function
        console.error("Error fetching order:", err);
      });
  }, [user.userId]);

  useEffect(() => {
    const getCarts = async () => {
      try {
        const cartsPromises = orderList.map(async (item) => {
          const res = await publicRequest.get(`/carts/find/${item}`);
          return res.data;
        });

        const cartsData = await Promise.all(cartsPromises);

        setCarts(cartsData);
      } catch (err) {
        console.error("Error fetching carts:", err);
      } finally {
        setLoading(false);
      }
    };

    getCarts();
  }, [orderList]);

  return (
    <>
      {carts && carts.length === 0 ? (
        <Empty>Please wait While we are fetching...</Empty>
      ) : loading === true ? (
        <>
          <Empty>
            You Haven't place any order!!
            <br />
            Explore Now!!
          </Empty>
        </>
      ) : (
        <Bottom>
          <Info>
            {carts &&
              carts.map((element) => (
                <SingleCart
                  key={element.id}
                  order={element}
                  onViewCart={handleViewCart}
                  isSelected={selectedCart && selectedCart._id === element._id}
                />
              ))}
          </Info>
          {selectedCart && <ViewCart cart={selectedCart} />}
        </Bottom>
      )}
    </>
  );
};

export default OrderList;
