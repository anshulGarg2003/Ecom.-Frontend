import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { styled } from "styled-components";
import Sidebar from "../components/Admin/Sidebar";
import AdminLayout from "../components/Admin/AdminLayout";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import CategoryPage from "./Admin/CategoryPage";
import ProductAdd from "./Admin/ProductAdd";
import ProductEdit from "./Admin/ProductEdit";
import SliderDataEdit from "./Admin/SliderDataEdit";
import EditAdminDetails from "./Admin/EditAdminDetail";
import AddAnnouncements from "./Admin/AddAnnouncements";
import { useEffect, useState } from "react";
import AdminAdd from "./Admin/AdminAdd";

const Title = styled.h1`
  margin: 20px;
`;

const Admin = () => {
  const location = useLocation();
  const [tag, setTag] = useState("");

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    setTag(pathSegments[2]);
  }, [location]);
  // console.log(tag);

  return (
    <>
      <Navbar />
      <div
        style={{
          paddingTop: "5px",
          display: "flex",
          width: "100%",
          height: "150vh",
        }}
      >
        <div style={{ display: "flex", flex: "2" }}>
          <Sidebar />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            // flex: "6",
            width: "75%",
            padding: "5px",
            backgroundColor: "whitesmoke",
          }}
        >
          {tag === "addcategory" ? (
            <CategoryPage />
          ) : tag === "addproduct" ? (
            <ProductAdd />
          ) : tag === "editpdt" ? (
            <ProductEdit />
          ) : tag === "editabt" ? (
            <ProductEdit />
          ) : tag === "editprof" ? (
            <EditAdminDetails />
          ) : tag === "editannounce" ? (
            <AddAnnouncements />
          ) : tag === "addadmin" ? (
            <AdminAdd />
          ) : tag === "slideredit" ? (
            <SliderDataEdit />
          ) : tag === "setting" ? (
            <SliderDataEdit />
          ) : tag === "post" ? (
            <SliderDataEdit />
          ) : tag === "media" ? (
            <SliderDataEdit />
          ) : tag === "contact" ? (
            <SliderDataEdit />
          ) : (
            <AdminLayout />
          )}
        </div>
      </div>
      {/* <Title>Admin</Title> */}
      {/* <Categories /> */}
      {/* <Title>Admin</Title> */}
      {/* <Products /> */}
      <NewsLetter />
      <Footer />
    </>
  );
};

export default Admin;
