import { useEffect, useState } from "react";
import { login, register } from "../redux/apiCall";
import { mobile } from "../responsive";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FaAddressCard } from "react-icons/fa";
import { publicRequest } from "../requestMethos";
import toast from "react-hot-toast";

const Container = styled.div`
  display: flex;
  opacity: 0.8;
  height: 85vh;
  /* align-items: center; */
  justify-content: center;
`;

const BackgroudImgBox = styled.div`
  display: flex;
  flex: 6;
  background: #b15757;
`;

const Wrapper = styled.div`
  padding: 36px;
  ${mobile({ padding: "20px", width: "55%" })}
  flex:4;
  display: flex;
  /* margin: auto; */
  flex-direction: column;
  background-color: rgb(250, 235, 215, 0.8);
  align-items: center;
  justify-content: center;
`;
const Img = styled.div`
  margin: 3px;
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  gap: 10px;
  img {
    top: 0;
    left: 0;
    object-fit: cover;
    height: 160px;
    width: 160px;
    border-radius: 80px;
  }
`;

const ImgBox = styled.div`
  margin: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  flex: 2;
  flex-direction: column;
  /* border: 1px solid black; */
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
  ${mobile({ marginBottom: "10px", fontSize: "15px" })}
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;
const Input = styled.input`
  padding: 5px;
  width: 40%;
  margin: 5px;
  font-size: 13px;
  ${mobile({ width: "37%", fontSize: "9px" })}
`;

const Agreement = styled.p`
  margin: 10px 0;
  font-size: 15px;
  ${mobile({ marginBottom: "10px", marginTop: "0px", fontSize: "10px" })}
`;
const Button = styled.button`
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 10px;
  font-weight: 400;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
  &:hover {
    font-weight: 600;
    background-color: #fad3a0;
  }
  ${mobile({ fontSize: "9px" })}
`;

const Error = styled.span`
  color: red;
`;

const SliderImg = styled.img`
  object-fit: "cover";
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFileInput, setShowFileInput] = useState(false);
  const [sliderData, setSliderData] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const dispatch = useDispatch();
  const admin = false;
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await publicRequest.get("/sliderdata");
        // console.log(res.data);
        setSliderData(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) =>
        prevIndex < sliderData.length ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRemove = (e) => {
    setShowFileInput(false);
    setImageUrl(null);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setImage(file);
    // setImgUrl(base64);
  };

  const handleAddButtonClick = () => {
    setShowFileInput(true); // Show file input when Add button is clicked
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (firstname === "" || username === "" || email === "") {
      alert("Fill Up Entries first");
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
      const res = await register(dispatch, formdata);
      if (res === "Added successfully") {
        await login(dispatch, {
          username: username,
          passi: password,
          isAdmin: admin,
        });
        setLoading(false);
        toast.success("Register Successfully");
        history.push("/");
      } else {
        setLoading(false);
        toast.error(res);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(err);
    }
  };
  return (
    <>
      <Navbar />
      <Container>
        <BackgroudImgBox slideIndex={slideIndex}>
          {
            <SliderImg
              src="https://img.freepik.com/free-photo/shop-clothing-clothes-shop-hanger-modern-shop-boutique_1150-8886.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1711929600&semt=ais"
              alt="slider"
            />
          }
        </BackgroudImgBox>
        <Wrapper>
          <Title>CREATE YOUR ACCOUNT</Title>
          <ImgBox>
            <Img show={!showFileInput}>
              {imageUrl && (
                <img
                  height="100px"
                  width="75px"
                  src={imageUrl}
                  alt="Selected"
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
          <Form>
            <Input
              type="text"
              placeholder="FirstName..."
              required
              onChange={(e) => setFirstname(e.target.value)}
            />
            <Input
              type="text"
              placeholder="UserName..."
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Type Email..."
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password..."
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form>
          {loading === true ? (
            <span style={{ color: "green" }}>Please Wait...</span>
          ) : (
            { error } && <Error>{error}</Error>
          )}
          <Agreement>
            By using our services, you agree to our <b>PRIVACY POLICY </b>. We
            prioritize your data security and only use it for essential
            purposes, ensuring confidentiality and compliance with legal
            standards.
          </Agreement>
          <Button onClick={handleClick}>CREATE ACCOUNT</Button>
          <Link
            to="/login"
            style={{ textDecoration: "underline", color: "inherit" }}
          >
            Already Account!!
          </Link>
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
