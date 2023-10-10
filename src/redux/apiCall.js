import { publicRequest } from "../requestMethos";
import {
  loginSuccess,
  loginFailure,
  loginStart,
  addToWishlistSuccess,
  removeFromWishlistSuccess,
} from "./userRedux";
import { addCart, addOrderId } from "./newCartRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    // console.log(res);
    dispatch(loginSuccess(res.data));
    // console.log(res.data.pendingcartId);
    dispatch(findingCart(res.data.pendingcartId));
  } catch (err) {
    dispatch(loginFailure(err.response.data));
  }
};
export const register = async (dispatch, user) => {
  try {
    await publicRequest.post("/auth/register", user);
    login(dispatch, user);
  } catch (err) {
    dispatch(loginFailure(err.response.data));
  }
};

export const addToWishlist = async (dispatch, user) => {
  try {
    const response = await publicRequest.post("/users/add-to-wishlist", user);
    dispatch(addToWishlistSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const removeToWishlist = async (dispatch, user) => {
  try {
    const response = await publicRequest.post(
      "/users/remove-from-wishlist",
      user
    );
    dispatch(removeFromWishlistSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = (user) => async (dispatch) => {
  const { userId, myCartProducts, token, myCartAmount } = user;
  // console.log(myCartProducts, token, myCartAmount);
  try {
    const response = await publicRequest.post(
      "/carts/",
      { myCartProducts, myCartAmount },
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );

    const Cart = response.data;
    // console.log(Cart);

    // console.log(OrderId);
    return Cart._id;
  } catch (error) {
    console.error(error);
  }
};

export const addToOrder = (user) => async (dispatch) => {
  const { myUserId, myCartId } = user;
  try {
    const response = await publicRequest.post("/orders/", {
      myUserId,
      myCartId,
    });

    const OrderId = response.data._id;
    // console.log(response.data);
    await dispatch(addToUserOrder({ myUserId, OrderId }));
    return OrderId;
  } catch (error) {
    console.error(error);
  }
};

export const addToUserOrder = (user) => async (dispatch) => {
  const { myUserId, OrderId } = user;
  // console.log(OrderId);
  try {
    await publicRequest.post("/users/toorder", { user });
    // console.log(response);
    // console.log(OrderId)
    await dispatch(addOrderId(OrderId));
  } catch (error) {
    console.log(error);
  }
};

export const addToUserCart = (user) => async (dispatch) => {
  // const { CartId, userId } = user;
  // console.log(user);
  try {
    await publicRequest.post("/users/tocart", { user });
    // console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const findingCart = (user) => async (dispatch) => {
  // console.log(user);
  try {
    const response = await publicRequest.get(`/carts/find?user=${user}`);

    const Cart = response.data;
    // console.log(Cart);

    dispatch(addCart(Cart));
  } catch (error) {
    console.error(error);
  }
};
