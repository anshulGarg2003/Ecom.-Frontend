import {
  FavoriteBorderOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../redux/apiCall";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  margin: 5px;
  min-width: 253px;
  height: 60vh;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Img = styled.img`
  min-height: 200px;
  height: 95%;
  max-width: 253px;
  min-width: 253px;
  object-fit: cover;
  z-index: 1;
`;

const Icons = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  margin: 10px;
  z-index: 3;
  background-color: #fff8ab;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  &:hover {
    background-color: #daecd1;
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const Product = ({ item }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (user !== null) {
      const userId = user.userId;
      const product = item;
      addToWishlist(dispatch, { userId, product });
    } else {
      alert("Login First");
    }
  };
  return (
    <Container>
      <Img src={item.img} />
      <Info>
        <Icons>
          <Link
            to={`/product/${item._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <VisibilityOutlined />
          </Link>
        </Icons>
        <Icons onClick={handleClick}>
          <FavoriteBorderOutlined />
        </Icons>
      </Info>
    </Container>
  );
};

export default Product;
