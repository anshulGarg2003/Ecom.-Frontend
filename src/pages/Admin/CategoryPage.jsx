import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useRef } from "react";
import {
  NEW_URL,
  makeRequestWithToken,
  publicRequest,
} from "../../requestMethos";
import { useSelector } from "react-redux";

const Title = styled.h1`
  margin: 5px;
  margin-left: 10px;
`;

const Container = styled.div`
  height: 100%;
  width: 99%;
  margin: 10px;
  display: flex;
  flex: 6;
  flex-direction: column;
  border-radius: 5px;
  justify-content: center;
  gap: 5px;
`;

const EditBox = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  border: 2px solid black;
`;

const Wrapper = styled.div`
  height: 60%;
  display: flex;
  display: inline-flex;
  justify-content: space-around;
  overflow-x: scroll;
  scroll-behavior: smooth;
  white-space: wrap;
  z-index: 100;
`;

const CategoryBox = styled.div`
  /* width: 300px; */
  height: 400px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  margin: 10px;
  padding: 5px;
  display: flex;
  gap: 10px;

  &:hover {
    scale: 1.1;
    cursor: pointer;
    transition: scale 0.5s ease-in;
  }
`;

const DetailsBox = styled.div`
  height: 80%;
  margin: 10px;
  margin-bottom: 5px;
  display: flex;
  border-radius: 5px;
`;

const ImgBox = styled.div`
  margin: 5px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 2;
  flex-direction: column;

  /* border: 1px solid black; */
`;

const Img = styled.div`
  height: 80%;
  margin: 3px;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
  gap: 5px;
  img {
    top: 0;
    left: 0;
    object-fit: cover;
  }
`;

const InfoBox = styled.div`
  margin: 3px;
  margin-left: 10px;
  display: flex;
  flex: 3;
  border: 1px solid black;
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2px;
  padding: 3px;
`;

const Input = styled.input`
  margin-left: 3px;
  width: 75%;
  height: 25px;
  border: 0px;
  background-color: inherit;
  border: 1px solid black;
  padding: 3px;
  padding-left: 5px;
  font-size: 15px;

  :focus {
    outline: none;
  }
`;

const Form = styled.div`
  margin: 3px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
const Button = styled.button`
  margin: 3px;
  width: 20%;
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 15px;

  &:hover {
    background-color: #28e75e;
    text-decoration-color: wheat;
    scale: (1.2);
    transition: scale 0.5s ease-in-out;
  }
`;

const CategoryPage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [cat, setCat] = useState("");
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState("");
  const admin = true;
  const fileInputRef = useRef(null);
  const user = useSelector((state) => state.user);
  // console.log(editId);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await publicRequest.get("/categorydata");
        console.log(res.data);
        setCategoryData(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [loading]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setImage(file);
  };

  const handleRemove = (e) => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setImageUrl(null);
    setImage(null);
  };

  const handleChooseData = (item) => {
    setEditId(item._id);
    setTitle(item.title);
    setCat(item.cat);
    setImageUrl(item.img);
    setImage(item.img);
  };

  const handleDelete = (item) => {
    setLoading(true);
    console.log(item);

    const getData = async () => {
      try {
        // console.log(item._id);
        const res = await makeRequestWithToken(
          `categorydata/delete/${item._id}`,
          user.token,
          user.isAdmin,
          "delete"
        );
        console.log(res.data);
        alert("Delete Successfully");
        // setCategoryData(res.data);
        setLoading(false);
      } catch (err) {
        alert(err.response.data.message || "Error occurred while editing");
        console.log(err);
      }
    };
    getData();
  };

  const handleAddNew = () => {
    handleAddCategory();
  };

  const handleAddCategory = async () => {
    setLoading(true);
    if (title === "" || cat === "") {
      alert("Fill Up Entries first");
      setLoading(false);
      return;
    }

    if (!image) {
      alert("Add the Image");
      setLoading(false);
      return;
    }

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("cat", cat);
    formdata.append("isAdmin", admin);
    formdata.append("image", image);

    if (editId === "") {
      try {
        const res = await makeRequestWithToken(
          "categorydata/add",
          user.token,
          user.isAdmin,
          "post",
          formdata
        );
        console.log(res);
        setLoading(false);
        alert(res.data.message);
      } catch (err) {
        console.log(err);
        setLoading(false);
        alert(err.response.data.message || "Error occurred while editing");
      }
    } else {
      try {
        formdata.append("id", editId);
        const res = await makeRequestWithToken(
          "categorydata/edit",
          user.token,
          user.isAdmin,
          "put",
          formdata
        );
        console.log(res);
        setLoading(false);
        alert(res.data.message);
      } catch (err) {
        console.log(err);
        setLoading(false);
        alert(err.response.data.message || "Error occurred while editing");
      }
    }
    setLoading(false);
    setTitle("");
    setCat("");
    handleRemove();
    setEditId("");
  };

  return (
    <>
      <Title>Categories Content</Title>
      <p style={{ margin: "10px", fontSize: "20px" }}>
        Only 4 categories are allow.Fill the form to add new Category...
      </p>
      <Container>
        <EditBox>
          <h1
            style={{
              margin: "5px",
              display: "flex",

              justifyContent: "center",
              width: "100%",
              // alignItems: "center",
            }}
          >
            Category Card
          </h1>
          <DetailsBox>
            <ImgBox>
              <Img>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Selected"
                    height="200px"
                    width="200px"
                  />
                )}
                <input
                  type="file"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                />
              </Img>
              <div style={{ display: "flex" }}>
                <button
                  style={{
                    fontSize: "20px",
                    padding: "5px",
                    borderRadius: "5px",
                    margin: "5px",
                    backgroundColor: "#f83523",
                    width: "100px",
                  }}
                  onClick={handleRemove}
                >
                  Remove
                </button>
              </div>
            </ImgBox>
            <InfoBox>
              <Form>
                <InputBox>
                  <p style={{ padding: "3px", fontSize: "20px" }}>Title:</p>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </InputBox>
                <InputBox style={{ width: "100%" }}>
                  <p style={{ padding: "3px", fontSize: "20px" }}>Category</p>
                  <Input value={cat} onChange={(e) => setCat(e.target.value)} />
                </InputBox>
              </Form>
            </InfoBox>
          </DetailsBox>
          <div
            style={{
              height: "10%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button onClick={handleAddCategory}>
              {loading === true ? "Loading" : "Save"}
            </Button>
            <Button onClick={handleAddNew}>Add New Category</Button>
          </div>
        </EditBox>
        <Wrapper>
          {categoryData.map((item) => (
            <CategoryBox>
              <img
                src={`${NEW_URL}/${item.img}`}
                alt="CategoryImg"
                height="55%"
                width="200px"
                style={{ margin: "5px", marginBottom: "10px" }}
              />
              <div>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "600",
                  }}
                >
                  Title
                </p>
                <p style={{ display: "flex", justifyContent: "center" }}>
                  {item.title}
                </p>
              </div>
              <div>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "600",
                  }}
                >
                  Category
                </p>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  {item.cat}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  bottom: "10",
                  justifyContent: "center",
                }}
              >
                <button
                  style={{ padding: "10px", width: "30%", margin: "10px" }}
                  onClick={() => handleChooseData(item)}
                >
                  Edit
                </button>
                <button
                  style={{ padding: "10px", width: "30%", margin: "10px" }}
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </button>
              </div>
            </CategoryBox>
          ))}
        </Wrapper>
      </Container>
    </>
  );
};

export default CategoryPage;
