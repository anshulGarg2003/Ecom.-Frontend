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
import { ToastContainer, toast } from "react-toastify";
import { NEW_URL, makeRequestWithToken } from "../requestMethos";

const Container = styled.div`
  align-items: center;
  justify-content: center;
  z-index: 100;
  background-color: #f9f9f9e3;
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
  font-size: 25px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 10px;
  padding: 5px;

  &:hover {
    scale: 1.2;
    transition: scale 0.5s ease-in-out;
  }
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  // console.log(cart);
  const userId = user.userId;
  const history = useHistory();
  const onlogout = async () => {
    if (!user.isAdmin) {
      const token = user.token;
      const myCartProducts = cart.products;
      const myCartAmount = cart.amount;
      var CartId = "";
      if (cart.CartId !== "") {
        if (Object.keys(cart.products).length !== 0) {
          const updateCart = async () => {
            try {
              const res = await makeRequestWithToken(
                `carts/update/${cart.CartId}`,
                user.token,
                false,
                "post",
                { userId, myCartProducts, myCartAmount }
              );

              return res.data._id;
            } catch (err) {
              console.log(err);
            }
          };
          try {
            CartId = await updateCart();
          } catch (err) {
            console.error("Failed to update cart:", err);
            CartId = null;
          }
        } else {
          const deleteCart = async () => {
            try {
              const res = await makeRequestWithToken(
                `carts/delete/${cart.CartId}`,
                user.token,
                false,
                "delete",
                { userId }
              );
              return res.data;
            } catch (err) {
              console.log(err);
            }
          };
          if (await deleteCart()) {
            CartId = "";
          }
        }
      } else {
        if (Object.keys(cart.products).length !== 0) {
          CartId = await dispatch(
            addToCart({ userId, token, myCartProducts, myCartAmount })
          );
        }
      }
      console.log(CartId);
      await dispatch(addToUserCart({ CartId, userId }));
      await dispatch(checkout());
    }
    await dispatch(logout());
    history.push("/");
    alert("Thank You!! Please Come Again");
  };
  const handleCartClick = () => {
    user.firstname === null
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
          {user.firstname === null ? (
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuItem>Register</MenuItem>
            </Link>
          ) : (
            <MenuItem onClick={onlogout}>
              <Logout sx={{ fontSize: 40 }} />
              {/* <ToastContainer /> */}
            </MenuItem>
          )}

          {user.firstname === null ? (
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuItem>SignIn</MenuItem>
            </Link>
          ) : (
            <Link
              to={user.isAdmin === true ? `/admin` : `/user/${user.userId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuItem>
                {user.ImgUrl === "" ? (
                  <AccountCircle sx={{ fontSize: 40 }} />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      justifyContent: "center",
                      transition: "transform 0.5s ease-in-out",
                      ":hover": {
                        transform: "scale(1.2)",
                      },
                    }}
                  >
                    <img
                      src={`${NEW_URL}/${user.ImgUrl}`}
                      alt="Profile"
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        ":hover": {
                          transform: "scale(1.2)",
                        },
                      }}
                    />
                  </div>
                )}
              </MenuItem>
            </Link>
          )}

          {user.isAdmin === false && (
            <MenuItem onClick={handleCartClick}>
              <Badge badgeContent={cart.quantity} color="primary">
                <ShoppingCartOutlined sx={{ fontSize: 40 }} />
              </Badge>
            </MenuItem>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
