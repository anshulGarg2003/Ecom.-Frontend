import {
  FavoriteBorderOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../redux/apiCall";
import { NEW_URL } from "../requestMethos";

const Info = styled.div`
  opacity: 0;
  /* margin: 5px; */
  width: 100%;
  height: 70vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 2; /* Increase z-index to appear on top of the container */
  transition: all 0.3s ease-in;
  background-color: #c7c7c7; /* Apply background color directly here */
`;

const IconBox = styled.div`
  opacity: 0;
  position: absolute; /* Position the icon box absolute to overlap */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3; /* Increase z-index to appear on top of Info box */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  margin: 5px;
  margin-top: 0px;
  min-width: 253px;
  height: 70vh;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden; /* Add overflow: hidden to prevent the Info box from overflowing */
  &:hover ${Info} {
    opacity: 0.5; /* Increase opacity on hover */
  }
  &:hover ${IconBox} {
    opacity: 1; /* Increase opacity on hover */
  }
`;

const Img = styled.img`
  min-height: 200px;
  height: 95%;
  max-width: 300px;
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
  z-index: 100;
  opacity: 1;
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
    <>
      <Container>
        <Info />
        <Img src={`${NEW_URL}/${item.img}`} />
        <IconBox>
          <Icons>
            <Link
              to={`/product/${item._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <VisibilityOutlined />
            </Link>
          </Icons>
          {user.isAdmin == false && (
            <Icons onClick={handleClick}>
              <FavoriteBorderOutlined />
            </Icons>
          )}
        </IconBox>
      </Container>
    </>
  );
};

export default Product;
