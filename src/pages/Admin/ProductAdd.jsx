import React, { useState } from "react";
import { styled } from "styled-components";
import { makeRequestWithToken } from "../../requestMethos";
import { FaAddressCard } from "react-icons/fa";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Title = styled.h1`
  margin: 5px;
  margin-left: 10px;
`;

const Container = styled.div`
  height: 60%;
  margin: 10px;
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  border-radius: 5px;
  justify-content: center;
`;
const DetailsBox = styled.div`
  height: 100%;
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
  height: 70%;
  margin: 3px;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;

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

const ProductAdd = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [categories, setCategories] = useState("");
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [stocks, setStocks] = useState();
  const [loading, setLoading] = useState(false);
  const admin = true;
  const user = useSelector((state) => state.user);
  const [showFileInput, setShowFileInput] = useState(true);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setImage(file);
    // setImgUrl(base64);
  };

  const handleRemove = (e) => {
    if (imageUrl) {
      setShowFileInput(false);
      setImageUrl(null);
    }
  };

  const handleAddproduct = async () => {
    setLoading(true);
    if (title === "" || about === "" || desc === "" || !price || !stocks) {
      toast.error("Fill Up Entries first");
      setLoading(false);
      return;
    }

    if (!image) {
      toast.error("Add the Image");
      setLoading(false);
      return;
    }
    const categoriesArray = categories.split(",");
    const colorsArray = colors.split(",");
    const sizeArray = sizes.split(",");
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("about", about);
    formdata.append("desc", desc);
    categoriesArray.forEach((category) => {
      formdata.append("categories[]", category.trim());
    });

    colorsArray.forEach((color) => {
      formdata.append("colors[]", color.trim());
    });

    sizeArray.forEach((size) => {
      formdata.append("size[]", size.trim());
    });

    formdata.append("price", price);
    formdata.append("inStock", stocks);
    formdata.append("image", image);
    formdata.append("isAdmin", admin);

    toast.promise(
      makeRequestWithToken(
        "products/add",
        user.token,
        user.isAdmin,
        "post",
        formdata
      ),
      {
        loading: "Saving...",
        success: (res) => {
          setLoading(false);
          setLoading(false);
          setTitle("");
          setAbout("");
          setDesc("");
          setCategories("");
          setColors("");
          setSizes("");
          setStocks(0);
          setPrice(0);
          setImage(null);
          setImageUrl(null);
          return <b>Added Successfully</b>;
        },
        error: (err) => {
          setLoading(false);
          console.log(err);
          return <b>{err}</b>;
        },
      }
    );
  };

  return (
    <>
      <Title>Add Product</Title>
      <p style={{ margin: "10px", fontSize: "20px" }}>
        Fill the form to add Products...
      </p>
      <Container>
        <h1
          style={{
            margin: "5px",
            display: "flex",
            // flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            // alignItems: "center",
          }}
        >
          Product Details
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
              {showFileInput === false ? (
                <FaAddressCard size={100} />
              ) : (
                <input type="file" onChange={handleImageChange} />
              )}
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
              <InputBox>
                <p style={{ padding: "3px", fontSize: "20px" }}>About:</p>
                <Input
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </InputBox>
              <InputBox style={{ width: "100%" }}>
                <p style={{ padding: "3px", fontSize: "20px" }}>Description:</p>
                <textarea
                  style={{ width: "75%", padding: "5px", marginLeft: "5px" }}
                  value={desc}
                  type=""
                  onChange={(e) => setDesc(e.target.value)}
                  rows={3}
                />
              </InputBox>
              <InputBox>
                <p style={{ padding: "3px", fontSize: "20px" }}>Categories:</p>
                <Input
                  type="text"
                  placeholder="Categories (comma-separated)"
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                />
              </InputBox>
              <InputBox>
                <p style={{ padding: "3px", fontSize: "20px" }}>Colors:</p>
                <Input
                  type="text"
                  placeholder="Colors (comma-separated)"
                  value={colors}
                  onChange={(e) => setColors(e.target.value)}
                />
              </InputBox>
              <InputBox>
                <p style={{ padding: "3px", fontSize: "20px" }}>Size:</p>
                <Input
                  type="text"
                  placeholder="Sizes (comma-separated)"
                  value={sizes}
                  onChange={(e) => setSizes(e.target.value)}
                />
              </InputBox>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <InputBox>
                  <p style={{ padding: "3px", fontSize: "20px" }}>Price:</p>
                  <Input
                    value={price}
                    type="number"
                    placeholder="In Rupees"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </InputBox>
                <p style={{ padding: "3px", fontSize: "20px" }}>Stocks:</p>
                <Input
                  value={stocks}
                  type="number"
                  placeholder="0"
                  onChange={(e) => setStocks(e.target.value)}
                />
              </div>
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
          <Button onClick={handleAddproduct}>
            {loading === true ? "Loading" : "Save"}
          </Button>
        </div>
      </Container>
    </>
  );
};

export default ProductAdd;
