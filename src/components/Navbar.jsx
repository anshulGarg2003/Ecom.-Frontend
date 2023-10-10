import {
  AccountCircle,
  Logout,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import Badge from "@mui/material-next/Badge";
import React from "react";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { mobile } from "../responsive";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { addToCart, addToUserCart } from "../redux/apiCall";
import { checkout } from "../redux/newCartRedux";

const Container = styled.div`
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  height: 100px;
  padding: 1px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ flexDirection: "column", height: "35vh" })}
`;

const Left = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Center = styled.div`
  flex: 1;
  align-items: center;
  text-align: center;
`;
const Logo = styled.h1`
  font-weight: bold;
  font-size: 40px;
`;

const LogoContainer = styled.div`
  display: flex;
  border-radius: 50%;
  align-items: center;
  padding: 1px;
  margin-left: 10px;
  cursor: pointer;
`;

const LogoImg = styled.img`
  width: 100px;
  height: 100px;
  justify-content: last baseline;
`;

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 15px;
  flex: 1;
`;

const MenuItem = styled.span`
  margin: 10px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  // console.log(cart)
  const userId = user.userId;
  const history = useHistory();
  const onlogout = async () => {
    const token = user.token;
    const myCartProducts = cart.products;
    const myCartAmount = cart.amount;
    const CartId = await dispatch(
      addToCart({ userId, myCartProducts, token, myCartAmount })
    );
    // await console.log(CartId, userId);
    await dispatch(addToUserCart({ CartId, userId }));
    dispatch(logout());
    dispatch(checkout());
    history.push("/");
  };
  const handleCartClick = () => {
    user.currentUser === null
      ? alert("Login First")
      : history.push(`/cart/${user.userId}`);
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <LogoContainer onClick={() => history.push("/")}>
            <LogoImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLDxrNKARCeY2GLpFjDdkvFsMUHWjjHs6cZoj2yXhwRhY8LSlFSYSpDE62q3KrgmxNEmQ&usqp=CAU" />
          </LogoContainer>
        </Left>
        <Center>
          <Logo>Scarlet Sage Shop</Logo>
        </Center>
        <Right>
          {user.currentUser === null ? (
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuItem>Register</MenuItem>
            </Link>
          ) : (
            <MenuItem onClick={onlogout}>
              <Logout />
            </MenuItem>
          )}

          {user.currentUser === null ? (
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuItem>SignIn</MenuItem>
            </Link>
          ) : (
            <Link
              to={`/wishlist/${user.userId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuItem>
                <AccountCircle />
              </MenuItem>
            </Link>
          )}

          <MenuItem onClick={handleCartClick}>
            <Badge badgeContent={cart.quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
