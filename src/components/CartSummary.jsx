import React from "react";
import { styled } from "styled-components";
import { mobile } from "../responsive";
import { removeProduct } from "../redux/newCartRedux";
import { CloseSharp } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { NEW_URL } from "../requestMethos";

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

const Product = styled.div`
  position: relative;
  display: flex;
  width: 99%;
  justify-content: center;
  align-items: center;
  height: 45vh;
  background-color: white;
  z-index: 100;
  ${mobile({ height: "30vh" })}
  box-shadow: 10px 10px 25px;
  margin: 15px 0;
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

const Heading = styled.div`
  border: 1px solid;
  padding: 10px;
  width: 95%;
  font-size: xx-large;
  background: #13c7f9;
  font-weight: 600;
`;

const CartSummary = ({ cart }) => {
  const dispatch = useDispatch();
  const handleCloseClick = async (product) => {
    dispatch(removeProduct(product));
  };

  return (
    <div>
      <Heading>Order Summary</Heading>
      <Info>
        {cart.products.map((product) => (
          <Product>
            <Close>
              <CloseSharp onClick={() => handleCloseClick(product)} />
            </Close>
            <ProductImg>
              <Img src={`${NEW_URL}/${product.product.img}`} />
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

                <Amount>${product.quantity * product.product.price}</Amount>
              </LastRow>
            </ProductInfo>
          </Product>
        ))}
      </Info>
    </div>
  );
};

export default CartSummary;
