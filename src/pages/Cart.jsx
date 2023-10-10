import { styled } from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { CloseSharp } from "@mui/icons-material";
import { useState,} from "react";
import { useSelector } from "react-redux";
// import { publicRequest } from "../requestMethos";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { mobile } from "../responsive";
import { checkout, removeProduct } from "../redux/newCartRedux";
import { Link } from "react-router-dom";
import { addToCart, addToOrder } from "../redux/apiCall";
const Container = styled.div`
  position: relative;
  background-color: #fff;
`;

const Close = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  z-index: 2;
  border: none;
  cursor: pointer;
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
  margin: 0 30px;
  ${mobile({ flexDirection: "column", justifyContent: "flex-start" })}
`;

const Product = styled.div`
  position: relative;
  display: flex;
  /* width: 100vw; */
  justify-content: center;
  align-items: center;
  height: 45vh;
  ${mobile({ height: "30vh" })}
  box-shadow: 10px 10px 25px;
  margin: 30px 0;
`;

const Info = styled.div`
  flex: 5;
  margin-right: 10px;
  padding-right: 10px;
`;

const Empty = styled.div`
  display: flex;
  height: 50vh;
  text-align: center;
  margin: 10px;
  justify-content: center;
  align-items: center;
`;

const ProductImg = styled.div`
  flex: 1;
  height: 90%;
  /* ${mobile({ height: "52%" })} */
  margin: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  height: 100%;
  ${mobile({ height: "90%", width: "100%" })}
`;

const ProductInfo = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProductName = styled.h1`
  margin: 0 10px;
  margin-top: 10px;
  ${mobile({ fontSize: "20px" })}
`;

const Desc = styled.p`
  font-size: 16px;
  margin: 7px 10px;
  ${mobile({ display: "none" })}
`;

const Price = styled.p`
  font-size: 20px;
  margin: 0 10px;
  ${mobile({ fontSize: "15px", margin: "10px", marginLeft: "20px" })}
`;

const Parameters = styled.div`
  display: flex;
`;

const Colour = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const FilterText = styled.span`
  margin: 10px;
  font-size: 20px;
  font-weight: 500;
  ${mobile({ fontSize: "15px", margin: "0", marginLeft: "20px" })}
`;

const FilterColour = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) => props.colour};
  margin: 0px 5px;
  &:hover {
    transform: scale(1.2);
    transition: all 0.5s ease-out;
    transition: all 0.5s ease-in;
    cursor: pointer;
  }
`;

const Size = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SizeText = styled.span`
  margin: 10px;
  font-size: 20px;
  font-weight: 500;
  ${mobile({ fontSize: "15px", margin: "0", marginLeft: "20px" })}
`;
const SizeValue = styled.span`
  margin: 10px;
  font-size: 20px;
  font-weight: 500;
  ${mobile({ fontSize: "15px", margin: "0", marginLeft: "20px" })}
`;

const LastRow = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-around; */
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;
const QuantityText = styled.span`
  font-size: 20px;
  font-weight: 500;
  margin: 0 10px;
  ${mobile({ fontSize: "15px", margin: "0", marginLeft: "20px" })}
`;

const Quantity = styled.span`
  font-size: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  margin-left: 15px;
  ${mobile({ fontSize: "15px", margin: "0" })}
`;

const Amount = styled.span`
  flex: 1;
  font-size: 20px;
  ${mobile({ fontSize: "15px", margin: "0", marginLeft: "20px" })}
`;

const Summary = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  border: 1px solid;
  margin: 30px 10px;
  height: 60vh;
  background-color: white;
  border-radius: 10px;
`;

const SummaryTitle = styled.h1`
  margin: 10px;
  margin-top: 15px;
  text-align: center;
`;

const SummaryItem = styled.div`
  margin: 13px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-size: ${(props) => props.type === "total" && "30px"};
  font-weight: ${(props) => props.type === "total" && "600"};
`;

const SummaryText = styled.span``;

const SummaryPrice = styled.span``;

const Button = styled.button`
  margin: 15px;
  align-items: center;
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

const Cart = () => {
  // const location = useLocation();
  // const userId = location.pathname.split("/")[2];
  const cart = useSelector((state) => state.cart);
  // console.log(cart.products)
  // const {selectProduct, productColour,productSize,productQuantity}=cart.products;
  // console.log(selectProduct, productColour,productSizeproductQuantity);
  const user = useSelector((state) => state.user);
  const userId = user.userId;
  const wishlist = useSelector((state) => state.user.wishlist);
  const [ setStripeToken] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  // console.log(cart);
  const itsCheckout = async () => {
    const token = user.token;
    const myCartProducts = cart.products;
    const myCartAmount = cart.amount;
    const CartId = await dispatch(
      addToCart({ userId, myCartProducts, token, myCartAmount })
    );
    // console.log(CartId);
    const OrderId = await dispatch(
      addToOrder({ myUserId: userId, myCartId: CartId })
    );
    // console.log(OrderId);
    dispatch(checkout());
    history.push("/success", { OrderId });
  };

  const handleCloseClick=async(product)=>{
    dispatch(removeProduct(product));
  }

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
      <Announcement />
      <Navbar />
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
              to={`/wishlist/${userId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <TopText>Your Wishlist({wishlist && wishlist.length})</TopText>
            </Link>
          </TopTexts>
          <TopButton type="filled">Checkout Now</TopButton>
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
          <Bottom>
            <Info>
              {cart.products.map((product) => (
                <Product>
                  <Close>
                    <CloseSharp onClick={()=>handleCloseClick(product)}/>
                  </Close>
                  <ProductImg>
                    <Img src={product.product.img} />
                  </ProductImg>
                  <ProductInfo>
                    <ProductName>{product.product.title}</ProductName>
                    <Desc>
                      <i>{product.product.about}</i>
                    </Desc>
                    <Price>${product.product.price}</Price>

                    <Parameters>
                      <Colour>
                        <FilterText>Colour:</FilterText>
                        <FilterColour colour={product.colour} />
                      </Colour>

                      <Size>
                        <SizeText>Size:</SizeText>
                        <SizeValue>{product.size}</SizeValue>
                      </Size>
                    </Parameters>

                    <LastRow>
                      <QuantityContainer>
                        <QuantityText>Quantity:</QuantityText>
                        <Quantity>{product.quantity}</Quantity>
                      </QuantityContainer>

                      <Amount>
                        ${product.quantity * product.product.price}
                      </Amount>
                    </LastRow>
                  </ProductInfo>
                </Product>
              ))}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryText>SubTotal</SummaryText>
                <SummaryPrice>${cart.amount}</SummaryPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryText>Shipping Charge</SummaryText>
                <SummaryPrice>$4.5</SummaryPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryText>Shipping Discount</SummaryText>
                <SummaryPrice>-$4.5</SummaryPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryText>Total</SummaryText>
                <SummaryPrice>${cart.amount}</SummaryPrice>
              </SummaryItem>
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
              <Button onClick={itsCheckout}>CHECKOUT</Button>
              {/* </StripeCheckOut> */}
            </Summary>
          </Bottom>
        )}
      </Wrapper>
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default Cart;
