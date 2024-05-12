import React, { useEffect, useState, useSyncExternalStore } from "react";
import { styled } from "styled-components";
import { register } from "../../redux/apiCall";
import {
  NEW_URL,
  makeRequestWithToken,
  publicRequest,
} from "../../requestMethos";
import { FaAddressCard } from "react-icons/fa";
import { useSelector } from "react-redux";

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
  margin: 2px;
  padding: 3px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  border: 0px;
  background-color: inherit;
  border-bottom: 2px solid black;
  padding: 3px;
  font-size: 20px;

  :focus {
    outline: none;
  }
`;

const Form = styled.div`
  margin: 3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

const ShowBox = styled.div`
  display: flex;
  /* height: 35%; */
  width: 100%;
  flex-wrap: wrap;
  overflow-x: scroll;
  scroll-behavior: smooth;
`;

const ProductBox = styled.div`
  display: flex;
  width: 30%;
  border: 1px solid black;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
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

const AdminAdd = () => {
  // const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const admin = true;
  const user = useSelector((state) => state.user);
  const [showFileInput, setShowFileInput] = useState(false);
  const [data, setData] = useState([]);

  const handleDelete = async (item) => {
    setLoading(true);
    if (item.firstname === user.firstname) {
      alert("You can't delete the login admin");
      setLoading(false );
      return;
    }
    const answer = prompt("Enter the admin's name you want to delete");
    if (answer == item.firstname) {
      const res = await makeRequestWithToken(
        `users/delete/${item._id}`,
        user.token,
        user.isAdmin,
        "delete"
      );
      alert(res.data.message);
      setLoading(false);
    } else {
      alert("Wrong entry");
      setLoading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setImage(file);
    // setImgUrl(base64);
  };

  useEffect(() => {
    const fetchAdmins = async () => {
      const res = await makeRequestWithToken(
        "users/admin",
        user.token,
        user.isAdmin,
        "get"
      );
      console.log(res.data);
      setData(res.data);
    };
    fetchAdmins();
  }, [loading]);

  const handleRemove = (e) => {
    setShowFileInput(false);
    setImageUrl(null);
  };

  const handleAddButtonClick = () => {
    setShowFileInput(true); // Show file input when Add button is clicked
  };

  const handleAddAdmin = async () => {
    setLoading(true);
    if (firstname === "" || username === "" || email === "") {
      alert("Fill Up Entries first");
      setLoading(false);
      return;
    }

    if (password !== Confirmpassword) {
      alert("Confirm Password is Not Matching ");
      setLoading(false);
      return;
    }

    try {
      const formdata = new FormData();
      formdata.append("firstname", firstname);
      formdata.append("username", username);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("isAdmin", admin);
      formdata.append("image", image);

      const res = await makeRequestWithToken(
        `auth/register`,
        user.token,
        user.isAdmin,
        "post",
        formdata
      );
      // setReturnImage(res.data.image);
      // console.log(res.image);
      setLoading(false);
      alert(res.data.message);
      setFirstname("");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setImageUrl(null);
      setShowFileInput(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert(err.response.data);
    }
  };

  return (
    <>
      <Title>Add Admin</Title>
      <p style={{ margin: "10px", fontSize: "20px" }}>
        Fill the form to add Admin...
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
          Admin Details
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
                onClick={handleAddButtonClick}
                style={{
                  fontSize: "20px",
                  padding: "5px",
                  borderRadius: "5px",
                  margin: "5px",
                  backgroundColor: "#18f586",
                  width: "100px",
                }}
              >
                Add
              </button>
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
                <p style={{ padding: "3px", fontSize: "20px" }}>First Name:</p>
                <Input
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </InputBox>
              <InputBox>
                <p style={{ padding: "3px", fontSize: "20px" }}>User Name:</p>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputBox>
              <InputBox>
                <p style={{ padding: "3px", fontSize: "20px" }}>Email</p>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputBox>
              <InputBox>
                <p style={{ padding: "3px", fontSize: "20px" }}>Position</p>
                <Input />
              </InputBox>
              <InputBox>
                <p style={{ padding: "3px", fontSize: "20px" }}>Password:</p>
                <Input
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputBox>
              <InputBox>
                <p style={{ padding: "3px", fontSize: "20px" }}>
                  Confirm Password:
                </p>
                <Input
                  value={Confirmpassword}
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
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
          <Button onClick={handleAddAdmin}>
            {loading === true ? "Loading" : "Save"}
          </Button>
        </div>
      </Container>
      <ShowBox>
        {data.map((item) => (
          <ProductBox>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "5px",
                alignItems: "center",
              }}
            >
              <img
                src={`${NEW_URL}/${item.image}`}
                alt={item._id}
                height="50px"
                width="50px"
              />
              <p>{item.firstname}</p>
            </div>
            <button style={{ width: "20%" }} onClick={() => handleDelete(item)}>
              Delete
            </button>
          </ProductBox>
        ))}
      </ShowBox>
    </>
  );
};

export default AdminAdd;
