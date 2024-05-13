import React from "react";
import styled from "styled-components";
import { FaEdit, FaUserEdit } from "react-icons/fa";
import { TbShoppingBagEdit } from "react-icons/tb";
import { TbSettingsCog } from "react-icons/tb";
import { SiApostrophe } from "react-icons/si";
import { TiContacts } from "react-icons/ti";
import { MdOutlinePermMedia } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import { TfiAnnouncement } from "react-icons/tfi";
import { MdAddBusiness } from "react-icons/md";
import { IoIosContacts } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import { BsSliders } from "react-icons/bs";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  background-color: #00eaffe1;
  /* border: 1px solid black; */
  box-shadow: 5px 5px 0 0 light;
  font-size: x-large;
  padding: 0px;
  margin: 0px 0px;
`;

const List = styled.ul`
  width: 100%;
  margin: 0px;
  list-style-type: none;
  display: flex;
  flex-direction: column;
`;
const Item = styled.li`
  display: flex;
  width: 100%;
  border-bottom: 1px solid white;
  margin: 10px;
  padding: 2px;
  align-items: center;
  transition: transform 0.5s ease-out;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;
const Title = styled.h1`
  width: 97%;
  background-color: #00fffb;
  padding: 5px;
  font-size: 35px;
`;

const Sidebar = () => {
  const history = useHistory();
  return (
    <>
      <Container>
        <Title>
          <IoIosContact size={30} />
          Dashboard
        </Title>
        <List>
          <Item
            onClick={() => {
              history.push("/admin/editpdt");
            }}
          >
            <TbShoppingBagEdit size={30} />
            Edit Product Details
          </Item>
          <Item
            onClick={() => {
              history.push("/admin/editprof");
            }}
          >
            <FaUserEdit size={30} />
            Change Profile Details
          </Item>
          <Item
            onClick={() => {
              history.push("/admin/editannounce");
            }}
          >
            <TfiAnnouncement size={30} />
            Edit Announcements
          </Item>
          <Item
            onClick={() => {
              history.push("/admin/addproduct");
            }}
          >
            <MdAddBusiness size={30} />
            Add Product
          </Item>
          <Item
            onClick={() => {
              history.push("/admin/slideredit");
            }}
          >
            <BsSliders size={30} />
            Change Slider
          </Item>
          <Item
            onClick={() => {
              history.push("/admin/addcategory");
            }}
          >
            <MdCategory size={30} />
            Change Category
          </Item>
          <Item
            onClick={() => {
              history.push("/admin/addadmin");
            }}
          >
            <IoIosContacts size={30} />
            Add Admin
          </Item>
          <Item
            onClick={() => {
              history.push("/admin/editabt");
            }}
          >
            <FaEdit size={30} />
            Change About
          </Item>
          <Item
            onClick={() => {
              history.push("/admin/setting");
            }}
          >
            <TbSettingsCog size={30} />
            Setting
          </Item>
          <Item
            onClick={() => {
              history.push("/admin/post");
            }}
          >
            <SiApostrophe size={30} />
            Posts
          </Item>
          <Item
            onClick={() => {
              history.push("/admin/media");
            }}
          >
            <MdOutlinePermMedia size={30} />
            Media
          </Item>
          <Item
            onClick={() => {
              history.push("/admin/contact");
            }}
          >
            <TiContacts size={30} />
            Contact Us
          </Item>
        </List>
      </Container>
    </>
  );
};

export default Sidebar;
