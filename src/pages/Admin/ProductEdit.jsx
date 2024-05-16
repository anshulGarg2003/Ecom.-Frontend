import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { FaRupeeSign } from "react-icons/fa";
import { HiMiniWallet } from "react-icons/hi2";
import {
  NEW_URL,
  makeRequestWithToken,
  publicRequest,
} from "../../requestMethos";
import { FaAddressCard } from "react-icons/fa";
import { useSelector } from "react-redux";
import { IoCloseCircleOutline } from "react-icons/io5";
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
  height: 85%;
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
  gap: 5px;
  /* border: 1px solid black; */
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
const ButtonSubmit = styled.button`
  margin-bottom: 5px;
  width: 20%;
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 15px;
  margin-right: 10px;

  &:hover {
    background-color: #28e75e;
    text-decoration-color: wheat;
    scale: 1.2;
    transition: scale 0.5s ease-in-out;
  }
`;
const ButtonDelete = styled.button`
  margin-bottom: 5px;
  width: 20%;
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 15px;
  margin-right: 10px;

  &:hover {
    background-color: #f83d3d;
    font-weight: 300;
    text-decoration-color: wheat;
    scale: 1.1;
    transition: scale 0.5s ease-in-out;
  }
`;

const ShowBox = styled.div`
  display: flex;
  height: 35%;
  width: 100%;
  flex-direction: column;
  flex-wrap: wrap;
  overflow-x: scroll;
  scroll-behavior: smooth;
`;

const ProductBox = styled.div`
  display: flex;
  width: 25%;
  border: 1px solid black;
  margin: 10px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  &:hover {
    scale: 1.05;
    cursor: pointer;
    transition: scale 0.25s ease-in;
    background-color: aliceblue;
  }
`;

const ProductEdit = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [categories, setCategories] = useState("");
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");
  const [image, setImage] = useState(null);
  const [currentImg, setCurrentImg] = useState(null);
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [stocks, setStocks] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const user = useSelector((state) => state.user);
  const fileInputRef = useRef(null);

  const deleteData = async () => {
    toast.promise(
      makeRequestWithToken(
        `products/delete/${id}`,
        user.token,
        user.isAdmin,
        "delete"
      ),
      {
        loading: "Saving...",
        success: (res) => {
          setLoading(false);
          return <b>{res.data.message}</b>;
        },
        error: (err) => {
          setLoading(false);
          console.log(err);
          return (
            <b>{err.response.data.message || "Error occurred while editing"}</b>
          );
        },
      }
    );
  };

  const handleDeleteProduct = () => {
    setLoading(true);
    if (id === "") {
      toast.error("Please select the product");
      setLoading(false);
      return;
    }

    const ans = prompt(
      "Are You Sure you want to delete this product??",
      "(Yes/No)"
    );

    if (ans === "yes" || ans === "Yes") {
      deleteData();
      handleReset();
    } else {
      setLoading(false);
      return;
    }
  };

  const handleClick = (item) => {
    setCurrentImg(item.img);
    setAbout(item.about);
    setDesc(item.desc);
    setPrice(item.price);
    setStocks(item.inStock);
    setTitle(item.title);
    setCategories(item.categories.join(","));
    setColors(item.colour.join(","));
    setSizes(item.size.join(","));
    setId(item._id);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await publicRequest.get(`/products/`);
        console.log(res.data);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, [loading]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setImage(file);
    setCurrentImg(null);
    // setImgUrl(base64);
  };

  const handleRemove = (e) => {
    if (imageUrl) {
      setImageUrl(null);
    }
  };

  const handleReset = () => {
    setTitle("");
    setAbout("");
    setDesc("");
    setCategories("");
    setColors("");
    setSizes("");
    setStocks(0);
    setPrice(0);
    setImage(null);
    setCurrentImg(null);
    setImage(null);
    setId("");
    handleRemove();
  };

  const handleEditproduct = async () => {
    setLoading(true);
    if (title === "" || about === "" || desc === "" || !price || !stocks) {
      toast.error("Fill Up Entries first");
      setLoading(false);
      return;
    }

    if (!id) {
      toast.error("Select Product Properly");
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

    sizeArray.forEach((color) => {
      formdata.append("size[]", color.trim());
    });

    formdata.append("price", price);
    formdata.append("inStock", stocks);
    formdata.append("image", image);
    formdata.append("id", id);

    toast.promise(
      makeRequestWithToken(
        "products/edit",
        user.token,
        user.isAdmin,
        "put",
        formdata
      ),
      {
        loading: "Saving...",
        success: (res) => {
          setLoading(false);
          handleReset();
          return <b>{res.data.message}</b>;
        },
        error: (err) => {
          setLoading(false);
          console.log(err);
          return (
            <b>{err.response.data.message || "Error occurred while editing"}</b>
          );
        },
      }
    );
  };

  return (
    <>
      <Title>Edit Product</Title>
      <p style={{ margin: "10px", fontSize: "20px" }}>
        Fill the form to edit Products...
      </p>
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
          <IoCloseCircleOutline
            size={30}
            style={{ margin: "5px ", cursor: "pointer" }}
            onClick={() => {
              handleReset();
            }}
          />
        </div>
        <DetailsBox>
          <ImgBox>
            {currentImg !== null ? (
              <img
                src={`${NEW_URL}/${currentImg}`}
                alt="Current"
                height="200px"
                width="200px"
              />
            ) : imageUrl !== null ? (
              <img src={imageUrl} alt="Selected" height="200px" width="200px" />
            ) : (
              <FaAddressCard size={100} />
            )}
            <input
              type="file"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
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
                <InputBox>
                  <p style={{ padding: "3px", fontSize: "20px" }}>Stocks:</p>
                  <Input
                    value={stocks}
                    type="number"
                    onChange={(e) => setStocks(e.target.value)}
                  />
                </InputBox>
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
          <ButtonSubmit onClick={handleEditproduct}>
            {loading === true ? "Loading" : "Save"}
          </ButtonSubmit>
          <ButtonDelete onClick={() => handleDeleteProduct()}>
            {loading === true ? "Loading" : "Delete"}
          </ButtonDelete>
        </div>
      </Container>
      <ShowBox>
        {data.map((item) => (
          <ProductBox onClick={() => handleClick(item)}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "5px",
                alignItems: "center",
              }}
            >
              <img
                src={`${NEW_URL}/${item.img}`}
                alt={item._id}
                height="35px"
                width="35px"
              />
              <p>{item.title.slice(0, 15)}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <p style={{ display: "flex", alignItems: "center" }}>
                <FaRupeeSign size={25} />
                {item.price}
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: "1px" }}>
                <HiMiniWallet size={25} />
                {item.inStock}
              </p>
            </div>
          </ProductBox>
        ))}
      </ShowBox>
    </>
  );
};

export default ProductEdit;
