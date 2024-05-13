import React from "react";
import { styled } from "styled-components";
import { mobile } from "../responsive";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { NEW_URL } from "../requestMethos";
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
  cursor: pointer;
  ${mobile({ height: "30vh" })}
  box-shadow: 10px 10px 25px;
  margin: 30px 0;
`;

const Info = styled.div`
  flex: 5;
  margin-right: 10px;
  padding-right: 10px;
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
  margin: 25px 10px;
  background-color: white;
  border-radius: 10px;
`;

const SummaryTitle = styled.h1`
  margin: 6px;
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
  gap: 60px;
`;

const SummaryText = styled.span`
  display: flex;
  justify-content: center;
`;

const SummaryPrice = styled.span``;

const ViewCart = ({ cart }) => {
  const history = useHistory();
  const formatDate = () => {
    const dateString = cart.updatedAt || cart.createdAt;
    const dateObject = new Date(dateString);

    // Format the date into a readable string with month name
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = dateObject.toLocaleDateString("en-US", options);

    return formattedDate;
  };

  const formatTime = () => {
    const dateString = cart?.updatedAt || cart?.createdAt;
    const dateObject = new Date(dateString);

    // Get the time string from the date
    const timeString = dateObject.toLocaleTimeString();

    return timeString;
  };
  console.log(cart);
  return (
    <>
      <Bottom>
        <Info>
          {cart.products.map((product) => (
            <Product
              onClick={() => history.push(`/product/${product?.product._id}`)}
            >
              <ProductImg>
                <Img src={`${NEW_URL}/${product?.product.img}`} />
              </ProductImg>
              <ProductInfo>
                <ProductName>{product?.product.title}</ProductName>
                <Desc>
                  <i>{product?.product.about}</i>
                </Desc>
                <Price>${product?.product.price}</Price>

                <Parameters>
                  <Colour>
                    <FilterText>Colour:</FilterText>
                    <FilterColour colour={product?.colour} />
                  </Colour>

                  <Size>
                    <SizeText>Size:</SizeText>
                    <SizeValue>{product?.size}</SizeValue>
                  </Size>
                </Parameters>

                <LastRow>
                  <QuantityContainer>
                    <QuantityText>Quantity:</QuantityText>
                    <Quantity>{product?.quantity}</Quantity>
                  </QuantityContainer>

                  <Amount>${product?.quantity * product?.product.price}</Amount>
                </LastRow>
              </ProductInfo>
            </Product>
          ))}
        </Info>
        <Summary>
          <SummaryTitle>ORDER Summary</SummaryTitle>
          <SummaryItem>
            <SummaryText>SubTotal</SummaryText>
            <SummaryPrice>${cart?.totalAmount}</SummaryPrice>
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
            <SummaryPrice>${cart?.totalAmount}</SummaryPrice>
          </SummaryItem>
          <SummaryTitle>ORDER Details</SummaryTitle>
          <SummaryItem>
            <SummaryText>Purchase Date</SummaryText>
            <SummaryPrice>{formatDate()}</SummaryPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryText>Purchase Time</SummaryText>
            <SummaryPrice>{formatTime()}</SummaryPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryText>Address</SummaryText>
            <SummaryPrice>{cart?.address}</SummaryPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryText>Payment Mode</SummaryText>
            <SummaryPrice>{cart?.mode}</SummaryPrice>
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
          {/* </StripeCheckOut> */}
        </Summary>
      </Bottom>
    </>
  );
};

export default ViewCart;
