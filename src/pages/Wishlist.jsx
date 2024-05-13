import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import SumProduct from "../components/SumProduct";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Container = styled.div`
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
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
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
  display: flex;
  justify-content: space-between;
  margin: 0 30px;
  ${mobile({ flexDirection: "column", justifyContent: "flex-start" })}
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

const Wishlist = () => {
  const user = useSelector((state) => state.user);
  const wishlist = user.wishlist;
  const cart = useSelector((state) => state.cart);
  const history = useHistory();

  return (
    <Container>
      <Wrapper>
        <Title>{user.firstname}'s Wishlist</Title>
        <Top>
          {/* <Link to="/">
            <TopButton> Continue Shopping</TopButton>
          </Link> */}
          <TopTexts>
            <Link
              to={`/cart/${user.userId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <TopText>
                Shopping Bag({cart.products && cart.products.length})
              </TopText>
            </Link>
            {/* <TopText>Your Wishlist({wishlist && wishlist.length})</TopText> */}
          </TopTexts>
          <TopButton
            type="filled"
            onClick={() => history.push(`/cart/${user.userId}`)}
            style={{
              pointerEvents: cart.quantity === 0 ? "none" : "auto",
              opacity: cart.quantity === 0 ? 0.5 : 1,
            }}
          >
            Checkout
          </TopButton>
        </Top>

        {wishlist && wishlist.length === 0 ? (
          <>
            <Empty>
              Your Wishlist is Empty!!
              <br />
              Explore Now!!
            </Empty>
          </>
        ) : (
          <Bottom>
            <Info>
              {wishlist &&
                wishlist.map((element) => <SumProduct product={element} />)}
            </Info>
          </Bottom>
        )}
      </Wrapper>
    </Container>
  );
};

export default Wishlist;
