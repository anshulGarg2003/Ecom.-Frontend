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
import Admin from "./pages/Admin";
import UserPage from "./pages/UserPage";
// dotenv.config();
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./pages/ProtectedRoute";


function App() {
  const user = useSelector((state) => state.user.firstname);

  return (
    <Router>
      <Switch>
        <Route exact path="/admin">
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        </Route>
        <Route exact path="/">
          <Home />
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
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        </Route>
        <Route exact path={"/user/:id"}>
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        </Route>
        <Route exact path="/success">
          <ProtectedRoute>
            <Success />
          </ProtectedRoute>
        </Route>
        <Route exact path="/admin/addcategory">
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        </Route>
        <Route exact path="/admin/addadmin">
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        </Route>
        <Route exact path="/admin/addproduct">
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        </Route>
        <Route exact path="/admin/editproduct">
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        </Route>
        <Route exact path="/admin/slideredit">
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        </Route>
        <Route exact path="/admin/editabt">
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        </Route>
        <Route exact path="/admin/editpdt">
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        </Route>
        <Route exact path="/admin/editprof">
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        </Route>
        <Route exact path="/admin/editannounce">
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        </Route>
        <Route exact path="/admin/setting">
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        </Route>
        <Route exact path="/admin/post">
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        </Route>
        <Route exact path="/admin/media">
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        </Route>
        <Route exact path="/admin/contact">
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        </Route>
        <Route exact path="/*">
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
