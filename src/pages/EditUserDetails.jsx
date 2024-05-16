import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
// import { register } from "../../redux/apiCall";
import { NEW_URL, makeRequestWithToken } from "../requestMethos";
import { FaAddressCard } from "react-icons/fa";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { loginSuccess } from "../redux/userRedux";
import toast from "react-hot-toast";
const Title = styled.h1`
  margin: 5px;
  margin-left: 10px;
  text-align: center;
`;

const Container = styled.div`
  height: 500px;
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
  gap: 10px;

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

const EditUserDetails = () => {
  // const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [firstname, setFirstname] = useState("");
  // const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const admin = false;
  const [currentImg, setCurrentImg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log(token);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const res = await publicRequest.get(`/users/find/${id}`);
  //       console.log(res.data)
  //       setUser(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchUserData();
  // }, []);

  useEffect(() => {
    setFirstname(user.firstname);
    setUsername(user.username);
    setPassword(user.password);
    setConfirmPassword(user.password);
    setEmail(user.email);
    setCurrentImg(user.ImgUrl);
  }, [user, loading]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setCurrentImg(null);
    setImage(file);
  };

  const handleRemove = (e) => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setImageUrl(null);
    setImage(null);
  };


  const handleEditAdmin = async () => {
    setLoading(true);
    if (firstname === "" || username === "" || email === "") {
      toast.error("Fill Up Entries first");
      setLoading(false);
      return;
    }

    if (password !== Confirmpassword) {
      toast.error("Confirm Password is Not Matching ");
      setLoading(false);
      return;
    }

    const formdata = new FormData();
    formdata.append("firstname", firstname);
    formdata.append("username", username);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("isAdmin", admin);
    formdata.append("image", image);

    toast.promise(
      makeRequestWithToken(
        `users/${user.userId}`,
        user.token,
        user.isAdmin,
        "put",
        formdata
      ),
      {
        loading: "Saving...",
        success: (res) => {
          setLoading(false);
          dispatch(loginSuccess(res.data.user));
          return <b>Save Successfully..</b>;
        },
        error: (err) => {
          setLoading(false);
          return <b>{err.response.data.message}</b>;
        },
      }
    );
  };

  return (
    <>
      <Container>
        <Title>{user.firstname} Profile</Title>
        <DetailsBox>
          <ImgBox>
            <Img>
              {currentImg !== null ? (
                <img
                  src={`${NEW_URL}/${currentImg}`}
                  alt="Current"
                  height="200px"
                  width="200px"
                />
              ) : imageUrl !== null ? (
                <img
                  src={imageUrl}
                  alt="Selected"
                  height="200px"
                  width="200px"
                />
              ) : (
                <FaAddressCard size={100} />
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
                  style={{ width: "70%" }}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <MdOutlineRemoveRedEye
                  size={30}
                  onClick={() => setShowPassword(!showPassword)}
                />{" "}
                {/* onClick, not onclick */}
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
            margin: "10px",
          }}
        >
          <Button onClick={handleEditAdmin}>
            {loading === true ? "Loading" : "Save"}
          </Button>
        </div>
      </Container>
    </>
  );
};

export default EditUserDetails;
