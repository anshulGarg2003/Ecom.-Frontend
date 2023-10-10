import { styled } from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { Add, Remove, ShoppingCartOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethos";
import { addProduct } from "../redux/newCartRedux";
import { useDispatch, useSelector } from "react-redux";
import { mobile } from "../responsive";
import { addToWishlist } from "../redux/apiCall";
import { useHistory } from "react-router-dom";
import { addSelectProduct } from "../redux/productRedux";

const Container = styled.div``;
const Wrapper = styled.div`
  /* width: 100vw ;  */
  display: flex;
  padding: 20px;
  background-color: #e0e9eb;
  ${mobile({ flexDirection: "column" })}
`;
const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ display: "flex", justifyContent: "center" })}
`;
const Img = styled.img`
  width: 80%;
  object-fit: cover;
`;
const InfoContainer = styled.div`
  flex: 1;
  margin: 20px;
  padding: 20px 0;
  ${mobile({ padding: "0" })}
`;
const Title = styled.h1`
  font-size: 50px;
  font-weight: 600;
  margin: 10px;
  ${mobile({ fontSize: "25px" })}
`;
const Desc = styled.p`
  font-style: italic;
  font-size: 20px;
  margin: 10px;
  ${mobile({ fontSize: "17px" })}
`;
const Price = styled.span`
  font-size: 30px;
  font-weight: 600;
  ${mobile({ fontSize: "25px" })}
`;

const FilterContainer = styled.div`
  width: 70%;
  display: flex;
  /* justify-content: space-between; */
  margin: 20px;
  ${mobile({ flexDirection: "column", margin: "10px 0" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ margin: "5px", justifyContent: "flex-start" })}
`;
const FilterText = styled.h2`
  /* font-size: 15px; */
`;
const FilterColour = styled.div`
  width: 20px;
  height: 20px;
  ${mobile({ width: "25px" })}
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
const FilterSize = styled.select`
  padding: 5px;
  width: 60px;
  text-align: center;
`;
const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Description = styled.p`
  font-size: 18px;
  font-weight: 400;
  ${mobile({ fontSize: "15px" })}
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  ${mobile({
    fontSize: "20px",
    marginBottom: "10px",
  })}/* justify-content: center; */
`;
const QuantityText = styled.h2`
  margin: 10px;
  ${mobile({ fontSize: "20px", margin: "0" })}
`;

const Operation = styled.div`
  cursor: pointer;
`;

const Quantity = styled.span`
  font-size: 25px;
  width: 30px;
  height: 30px;
  /* border: 1px solid #32d69c; */
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
`;

const ButtonText = styled.p`
  margin: 0 2px;
`;
const Icon = styled.div`
  display: none;
`;

const Button = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;
  padding: 10px 10px;
  font-size: 20px;
  border-radius: 10px;
  font-weight: 400;
  border: 1px solid teal;
  background-color: transparent;
  &:hover {
    background-color: #ffcc00;
    transition: all 0.5s ease;
  }
  &:hover ${Icon} {
    transition: all 0.5s ease;
    display: inline;
    ${mobile({ fontSize: "15px" })}
  }
  ${mobile({ fontSize: "15px" })}
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [colour, setColour] = useState("");
  const [size, setSize] = useState("");
  const [isClick, setIsClick] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  // const cart = useSelector((state) => state.cart);
  const myselectproduct = useSelector((state) => state.selectProduct);
  // console.log(myselectproduct)
  // console.log(myselectproduct)
  // console.log(user)
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleClick = () => {
    if (colour !== "" && size !== "") {
      const price = product.price;
      dispatch(addSelectProduct({ product, quantity, colour, size, price }));
      setIsClick(true);
    } else {
      alert("Select Size and Colour");
    }
  };
  useEffect(() => {
    isClick && dispatch(addProduct({ myselectproduct }));
  }, [isClick]);

  const handleWishlist = async () => {
    const userId = user.userId;
    // console.log(product);
    addToWishlist(dispatch, { userId, product });
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <ImageContainer>
          <Img src={product.img} />
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.about}</Desc>
          <Price>${product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterText>Colour:</FilterText>
              {product.colour &&
                product.colour.map((c) => (
                  <FilterColour
                    colour={c}
                    key={c}
                    onClick={() => setColour(c)}
                  />
                ))}
            </Filter>

            <Filter>
              <FilterText>Size:</FilterText>
              {product.size && (
                <FilterSize onChange={(e) => setSize(e.target.value)}>
                  {product.size.map((s) => (
                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                  ))}
                </FilterSize>
              )}
            </Filter>
          </FilterContainer>

          <Description>{product.desc}</Description>
          <br />
          <Description>{product.desc}</Description>

          <AddContainer>
            <QuantityContainer>
              <QuantityText>Select Quantity:</QuantityText>
              <Operation>
                <Remove
                  onClick={() => {
                    quantity > 1 && setQuantity(quantity - 1);
                  }}
                />
              </Operation>
              <Quantity>{quantity}</Quantity>
              <Operation>
                <Add
                  onClick={() => {
                    setQuantity(quantity + 1);
                  }}
                />
              </Operation>
            </QuantityContainer>
            {user.currentUser === null ? (
              <Button onClick={() => history.push("/login")}>
                <ButtonText>Log In </ButtonText>
              </Button>
            ) : (
              <ButtonContainer>
                <Button onClick={() => handleClick()}>
                  <ButtonText>Add To Cart</ButtonText>
                  <Icon>
                    <ShoppingCartOutlined />
                  </Icon>
                </Button>
                <Button onClick={() => handleWishlist()}>
                  <ButtonText>Add To Wishlist</ButtonText>
                </Button>
              </ButtonContainer>
            )}
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default Product;
