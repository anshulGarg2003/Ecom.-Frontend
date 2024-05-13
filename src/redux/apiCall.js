import { makeRequestWithToken, publicRequest } from "../requestMethos";
import {
  loginSuccess,
  loginStart,
  addToWishlistSuccess,
  removeFromWishlistSuccess,
} from "./userRedux";
import { addCart } from "./newCartRedux";

export const login = async (dispatch, formdata) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", formdata);
    // console.log(res.data);

    await dispatch(loginSuccess(res.data));
    console.log(res.data.pendingcartId);
    if (!res.data.isAdmin) {
      if (res.data.pendingcartId) {
        await dispatch(findingCart(res.data.pendingcartId));
      }
    }
    return true;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};
export const register = async (dispatch, formdata) => {
  try {
    const res = await makeRequestWithToken(
      `auth/register`,
      "",
      false,
      "post",
      formdata
    );
    return res.data.message;
    // alert(res.data.message);
  } catch (err) {
    return err.response.data;
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
  // console.log(myCartProducts, token, myCartAmount);
  try {
    const res = await makeRequestWithToken(
      "carts/",
      user.token,
      false,
      "post",
      user
    );
    console.log(res.data);

    // const myCartId = res.data._id;
    // const myUserId = user.userId;
    // const OrderId = await dispatch(addToOrder({ myUserId, myCartId }));
    // console.log(OrderId);
    // await dispatch(addToUserOrder({ myUserId, OrderId: res.data._id }));
    return res.data._id;
  } catch (error) {
    console.error(error);
  }
};

// export const addToOrder = (user) => async (dispatch) => {
//   // console.log(user);
//   const { myUserId } = user;
//   try {
//     const response = await publicRequest.post("/orders/", user);

//     console.log(response.data);
//     const OrderId = response.data._id;
//     return OrderId;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const addToUserOrder = (user) => async (dispatch) => {
  // console.log(OrderId);
  try {
    await publicRequest.post("/users/toorder", { user });
    // console.log(response);
    // console.log(OrderId)
    // await dispatch(addOrderId(OrderId));
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
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const findingCart = (userId) => async (dispatch) => {
  console.log(userId);
  try {
    const response = await publicRequest.get(`/carts/find/${userId}`);

    const Cart = response.data;
    console.log(Cart);

    await dispatch(addCart(Cart));
    return;
  } catch (error) {
    console.error(error);
  }
};
