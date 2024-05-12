import { styled } from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { mobile } from "../responsive";
import { checkout } from "../redux/newCartRedux";
import { Link } from "react-router-dom";
import { TbChecklist } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import { BsCashCoin } from "react-icons/bs";
import {
  addToCart,
  addToOrder,
  addToUserCart,
  addToUserOrder,
} from "../redux/apiCall";
import { publicRequest } from "../requestMethos";
import Address from "../components/Address";
import OrderSummary from "../components/OrderSummary";
import CartSummary from "../components/CartSummary";
import Payment from "../components/Payment";
const Container = styled.div`
  position: relative;
  background-color: #fff;
`;

const Wrapper = styled.div``;
const Title = styled.h1`
  text-align: center;
  margin: 10px;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 500;
  cursor: pointer;
  /* align-items: center; */
  border: 1px solid;
  border: ${(props) => props.type == "filled" && "none"};
  background-color: ${(props) =>
    props.type == "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  font-size: 15px;
  margin: 10px;
  &:hover {
    transition: ${(props) => props.type === "filled" && "all 0.3s ease-in-out"};
    color: ${(props) => props.type === "filled" && "black"};
    background-color: ${(props) => props.type === "filled" && "#ffcc00"};
  }
`;
const TopTexts = styled.div`
  display: flex;
  justify-content: space-around;
  text-decoration: underline;
  cursor: pointer;
`;
const TopText = styled.span`
  margin: 0 5px;
`;

const Bottom = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 0 30px;
  ${mobile({ flexDirection: "column", justifyContent: "flex-start" })}
`;

const Empty = styled.div`
  display: flex;
  height: 50vh;
  text-align: center;
  margin: 10px;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  margin: 15px;
  align-items: center;
  width: 100%;
  padding: 10px;
  font-size: 20px;
  background-color: black;
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;

  &:hover {
    transition: all 0.3s ease-in-out;
    color: black;
    background-color: #ffcc00;
  }
`;

const UpperButton = styled.button`
  padding: 5px 35px;
  font-size: 15px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid black;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 45px;
  padding: 10px;
  background-color: ${(props) =>
    props.filled == true ? "#e1c984" : "inherit"};
`;

const MidwayLine = styled.div`
  width: 100px;
  height: 10px;
  background-color: ${(props) =>
    props.filled === true ? "#e1c984" : "inherit"};
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const user = useSelector((state) => state.user);
  const userId = user.userId;
  const wishlist = useSelector((state) => state.user.wishlist);
  const history = useHistory();
  const dispatch = useDispatch();
  const [on, setOn] = useState(false);
  const [steps, setSteps] = useState(1);
  console.log(cart);

  useEffect(() => {
    if (Object.keys(cart.products).length !== 0) {
      setOn(true);
    } else {
      setOn(false);
    }
  }, [cart]);

  const itsCheckout = async () => {
    const myCartProducts = cart.products;
    const myCartAmount = cart.amount;
    const myaddress = cart.address;
    if (myaddress === "") {
      alert("Please Select address ");
      return;
    }
    const mymode = cart.mode;
    if (mymode === "") {
      alert("Please select payment mode");
      return;
    }
    var CartId = "";
    if (cart.CartId === "") {
      const token = user.token;
      CartId = await dispatch(
        addToCart({
          myCartProducts,
          token,
          myCartAmount,
          myaddress,
          mymode,
        })
      );
    } else {
      CartId = cart.CartId;
    }
    console.log(CartId);
    await dispatch(addToUserOrder({ myUserId: userId, OrderId: CartId }));

    try {
      const res = await publicRequest.put("/products/updatestock", {
        myCartProducts,
      });
    } catch (err) {
      console.log(err);
    }
    history.push("/success", { OrderId: CartId });
    dispatch(checkout());
  };

  // console.log(stripeToken);
  // useEffect(() => {
  //   const makeRequest = async () => {
  //     try {
  //       const res = await publicRequest.post("/checkout/payment", {
  //         tokenId: stripeToken.id,
  //         amount: cart.amount,
  //       });
  //       console.log("hello");
  //       dispatch(checkout());
  //     } catch (err){
  //       console.log("Error:", err.message);
  //       // Display an error message to the user
  //     }
  //   };
  //   stripeToken && cart.amount > 1 && makeRequest();
  // }, [stripeToken, cart.amount, history]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your Shopping Bag</Title>
        <Top>
          <Link to="/">
            <TopButton> Continue Shopping</TopButton>
          </Link>
          <TopTexts>
            <Link
              to={`/cart/${userId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <TopText>
                Shopping Bag({cart.products && cart.products.length})
              </TopText>
            </Link>
            <Link
              to={`/user/${userId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <TopText>Your Wishlist({wishlist && wishlist.length})</TopText>
            </Link>
          </TopTexts>
          <TopButton
            type="filled"
            style={{
              pointerEvents: on === false ? "none" : "auto",
              opacity: on === false ? 0.5 : 1,
            }}
          >
            Checkout Now
          </TopButton>
        </Top>

        {cart.products && cart.products.length === 0 ? (
          <>
            <Empty>
              Your Cart is Empty!!
              <br />
              Shop Now!!
            </Empty>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconBox filled={steps >= 1}>
                <TbChecklist size={60} />
              </IconBox>
              <MidwayLine filled={steps >= 2} />
              <IconBox filled={steps >= 2}>
                <IoHomeOutline size={60} />
              </IconBox>
              <MidwayLine filled={steps >= 3} />
              <IconBox filled={steps >= 3}>
                <BsCashCoin size={60} />
              </IconBox>
            </div>
            <Bottom>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    margin: "5px",
                    justifyContent: "space-between",
                    width: "95%",
                    padding: "10px",
                    marginRight: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <UpperButton
                    onClick={() => setSteps(steps >= 2 ? steps - 1 : steps)}
                  >
                    Back
                  </UpperButton>
                  <UpperButton
                    onClick={() =>
                      setSteps(steps >= 1 && steps < 3 ? steps + 1 : steps)
                    }
                  >
                    Next
                  </UpperButton>
                </div>
                <div>
                  {steps === 1 ? (
                    <CartSummary cart={cart} />
                  ) : steps === 2 ? (
                    <Address adds={user.addresses} />
                  ) : (
                    <Payment />
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <OrderSummary cart={cart} />
                <Button onClick={itsCheckout}>CHECKOUT</Button>
              </div>
              {/* <StripeCheckOut
                name="Scarlet Sage Shop"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLDxrNKARCeY2GLpFjDdkvFsMUHWjjHs6cZoj2yXhwRhY8LSlFSYSpDE62q3KrgmxNEmQ&usqp=CAU"
                billingAddress
                shippingAddress
                description={`Your Total amount is $${cart.amount}`}
                amount={cart.amount * 100}
                token={onToken}
                stripeKey={KEY}
              > */}
              {/* </StripeCheckOut> */}
            </Bottom>
          </>
        )}
      </Wrapper>
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default Cart;
