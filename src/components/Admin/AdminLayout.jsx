import React from "react";
import AddProduct from "../Admin/AddProduct";
import SliderData from "../Admin/SliderData";
import AdminAdd from "../Admin/AdminAdd";
import Header from "../Admin/Header";
import CatogeryCard from "../Admin/CatogeryCard";

const AdminLayout = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          // flex: "3",
          justifyContent:"space-around",
          padding: "5px",
          height:"60%",
        }}
      >
        <AdminAdd />
        <AddProduct />
        <CatogeryCard />
        <SliderData />
      </div>
    </>
  );
};

export default AdminLayout;
