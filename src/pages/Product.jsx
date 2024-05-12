import { styled } from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { Add, Remove, ShoppingCartOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NEW_URL, publicRequest } from "../requestMethos";
import { addProduct } from "../redux/newCartRedux";
import { useDispatch, useSelector } from "react-redux";
import { mobile } from "../responsive";
import { addToWishlist } from "../redux/apiCall";
import { useHistory } from "react-router-dom";
import { addSelectProduct } from "../redux/productRedux";
import Products from "../components/Products";

const Container = styled.div``;
const Wrapper = styled.div`
  /* width: 100vw ;  */
  display: flex;
  padding: 20px;
  margin-bottom: 10px;
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
  margin: 10px;
  margin-left: 0px;
  gap: 10px;
  ${mobile({ flexDirection: "column", margin: "10px 0" })};
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
  ${mobile({ margin: "2px" })}
  &:hover {
    transform: scale(1.2);
    transition: all 0.5s ease-out;
    transition: all 0.5s ease-in;
    cursor: pointer;
  }
`;
const ColourOuterBox = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  ${mobile({ width: "25px" })}
  border-radius: 50%;
  /* background-color:red; */
  background-color: ${(props) => (props.selected === true ? "#111110ddd" : "")};
  margin: 0px 5px;
  ${mobile({ margin: "2px" })}
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
  /* ${mobile({
    fontSize: "20px",
    marginBottom: "10px",
  })} */
`;
const QuantityText = styled.h2`
  margin: 10px;
  /* ${mobile({ fontSize: "20px", margin: "0" })} */
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

const Loader = styled.div`
  height: 50vh;
  font-size: 30px;
  display: block;
  align-items: center;
  text-align: center;
`;

const ImgLoader = styled.img`
  margin: 5px 5px;
  width: 40%;
  object-fit: cover;
`;

const Stock = styled.div`
  display: flex;
  font-weight: 300;
  color: red;
  font-size: medium;
`;

const Product = () => {
  const [loading, setLoading] = useState(true);
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
  const cart = useSelector((state) => state.cart);
  const myselectproduct = useSelector((state) => state.selectProduct);
  // console.log(myselectproduct)
  // console.log(loading);
  // console.log(user)
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
        console.log(res.data);
        setLoading(false);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleClick = () => {
    if (colour !== "" && size !== "") {
      // Check if the product with the same ID, color, and size already exists in the cart
      const productExists = cart.products.some(
        (item) => item.product._id === product._id
      );

      if (quantity > product.inStock) {
        alert("We are running sort of stocks...");
        setQuantity(product.inStock);
      }

      if (!productExists) {
        const price = product.price;
        dispatch(addSelectProduct({ product, quantity, colour, size, price }));
        setIsClick(true);
      } else {
        alert("This product is already in your cart");
      }
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
      <Navbar />
      <Announcement />
      <Wrapper>
        {loading === true ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader>
              <p>Please wait while we are fetching...</p>
              <ImgLoader src="https://media.tenor.com/DPEfCqnChk0AAAAi/loading-slow-net.gif" />
            </Loader>
          </div>
        ) : (
          <>
            <ImageContainer>
              <Img src={`${NEW_URL}/${product.img}`} />
            </ImageContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Desc>{product.about}</Desc>
              <Price>
                ${product.price}
                {product.inStock <= 5 ? (
                  <Stock>Hurray Up!!! Only {product.inStock} left 😯</Stock>
                ) : (
                  product.inStock === 0 && (
                    <Stock>Sorr😞y We are out of stock</Stock>
                  )
                )}
              </Price>
              <FilterContainer>
                <Filter>
                  <FilterText>Colour:</FilterText>
                  {product.colour &&
                    product.colour.map((c) => (
                      <ColourOuterBox selected={colour === c}>
                        {console.log(colour === c, c)}
                        <FilterColour
                          colour={c}
                          key={c}
                          onClick={() => setColour(c)}
                        />
                      </ColourOuterBox>
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
                {user.firstname === null ? (
                  <Button onClick={() => history.push("/login")}>
                    <ButtonText>Log In </ButtonText>
                  </Button>
                ) : (
                  user.isAdmin == false && (
                    <ButtonContainer>
                      {product.inStock !== 0 && (
                        <Button onClick={() => handleClick()}>
                          <ButtonText>Add To Cart</ButtonText>
                          <Icon>
                            <ShoppingCartOutlined />
                          </Icon>
                        </Button>
                      )}
                      <Button onClick={() => handleWishlist()}>
                        <ButtonText>Add To Wishlist</ButtonText>
                      </Button>
                    </ButtonContainer>
                  )
                )}
              </AddContainer>
            </InfoContainer>
          </>
        )}
      </Wrapper>
      {product.categories && <Title>More of {product.categories[0]}...</Title>}
      {console.log(product.categories)}
      {product.categories && <Products cat={product.categories[0]} />}
      <Title>Trending Products</Title>
      <Products sort={"newest"} />
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default Product;
