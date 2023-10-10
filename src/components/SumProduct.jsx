import { styled } from "styled-components";
import { mobile } from "../responsive";
import { CloseSharp } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { removeToWishlist } from "../redux/apiCall";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  position: relative;
  background-color: #fff;
`;

const Product = styled.div`
  display: flex;
  /* width: 100vw; */
  justify-content: center;
  align-items: center;
  height: 45vh;
  ${mobile({ height: "30vh" })}
  box-shadow: 10px 10px 25px;
  margin: 30px 0;
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

const SumProduct = (product) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleClick = () => {
    const userId = user.userId;
    const productId = product.product._id;
    removeToWishlist(dispatch, { userId, productId });
  };

  return (
    <Container>
      <Close onClick={handleClick}>
        <CloseSharp />
      </Close>
      <Link
        to={`/product/${product.product._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Product>
          <ProductImg>
            <Img src={product.product.img} />
          </ProductImg>
          <ProductInfo>
            <ProductName>{product.product.title}</ProductName>
            <Desc>
              <i>{product.product.about}</i>
            </Desc>
            <Price>${product.product.price}</Price>

            {/* <Parameters>
            <Colour>
              <FilterText>Colour:</FilterText>
              <FilterColour colour={product.product.colour} />
            </Colour>

            <Size>
              <SizeText>Size:</SizeText>
              <SizeValue>{product.product.size}</SizeValue>
            </Size>
          </Parameters>

          <LastRow>
            <QuantityContainer>
              <QuantityText>Quantity:</QuantityText>
              <Quantity>{product.product.quantity}</Quantity>
            </QuantityContainer>

            <Amount>${product.product.quantity * product.product.price}</Amount>
          </LastRow> */}
          </ProductInfo>
        </Product>
      </Link>
    </Container>
  );
};

export default SumProduct;
