import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
// const dotenv = require("dotenv");
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Success from "./pages/Success";
import { useEffect } from "react";
import Wishlist from "./pages/Wishlist";
// dotenv.config();

function App() {
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/products/:category">
          <ProductList />
        </Route>
        <Route exact path="/product/:id">
          <Product />
        </Route>
        <Route path="/login">
        {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route exact path="/register">
        {user ? <Redirect to="/" /> : <Register />} 
        </Route>
        <Route exact path={"/cart/:id"}>
          <Cart />
        </Route>
        <Route exact path="/success">
          <Success />
        </Route>
        <Route exact path="/wishlist/:id">
          <Wishlist />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
