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
import { useEffect, useState } from "react";
import Admin from "./pages/Admin";
import UserPage from "./pages/UserPage";
// dotenv.config();
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

function App() {
  const [admin, setAdmin] = useState(false);
  const user = useSelector((state) => state.user.firstname);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
    setAdmin(isAdmin);
  }, [user, isAdmin, history]);

  return (
    <Router>
      <Switch>
        <Route exact path="/admin">
          <Admin />
        </Route>
        <Route exact path="/">
          {<Home />}
        </Route>

        <Route exact path="/products/:category">
          <ProductList />
        </Route>
        <Route exact path="/products/">
          <ProductList />
        </Route>
        <Route exact path="/product/:id">
          <Product />
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route exact path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route exact path={"/cart/:id"}>
          <Cart />
        </Route>
        <Route exact path={"/user/:id"}>
          <UserPage />
        </Route>
        <Route exact path="/success">
          <Success />
        </Route>
        <Route exact path="/admin/addcategory">
          <Admin />
        </Route>
        <Route exact path="/admin/addadmin">
          <Admin />
        </Route>
        <Route exact path="/admin/addproduct">
          <Admin />
        </Route>
        <Route exact path="/admin/editproduct">
          <Admin />
        </Route>
        <Route exact path="/admin/slideredit">
          <Admin />
        </Route>
        <Route exact path="/admin/editabt">
          <Admin />
        </Route>
        <Route exact path="/admin/editpdt">
          <Admin />
        </Route>
        <Route exact path="/admin/editprof">
          <Admin />
        </Route>
        <Route exact path="/admin/editannounce">
          <Admin />
        </Route>
        <Route exact path="/admin/setting">
          <Admin />
        </Route>
        <Route exact path="/admin/post">
          <Admin />
        </Route>
        <Route exact path="/admin/media">
          <Admin />
        </Route>
        <Route exact path="/admin/contact">
          <Admin />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
