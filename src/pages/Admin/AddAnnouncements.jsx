import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { makeRequestWithToken, publicRequest } from "../../requestMethos";

const Title = styled.h1`
  margin: 5px;
  margin-left: 10px;
`;

const Container = styled.div`
  /* width: 100%; */
  margin: 10px;
  /* display: flex; */
  border: 2px solid black;
  border-radius: 5px;
`;
const DetailsBox = styled.div`
  margin: 10px;
  /* margin-bottom: 5px;s */
  display: flex;
  border-radius: 5px;
`;

const InfoBox = styled.div`
  display: flex;
  /* border: 1px solid black; */
`;

const InputBox = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin: 2px;
  padding: 3px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  border: 0px;
  width: 700px;
  background-color: inherit;
  border-bottom: 2px solid black;
  padding: 5px;
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

const AddAnnouncements = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const [announce, setAnnounce] = useState("");
  const [currentAnnounce, setCurrent] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await publicRequest.get(`/announcement/`);
        console.log(res.data[0].desc);
        setCurrent(res.data[0].desc);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, [currentAnnounce, announce, loading]);

  const handleSave = async () => {
    setLoading(true);
    if (announce === "") {
      alert("Fill Up Entries first");
      setLoading(false);
      return;
    }

    try {
      const formdata = new FormData();
      formdata.append("announce", announce);
      const res = await makeRequestWithToken(
        `announcement/add`,
        user.token,
        user.isAdmin,
        "post",
        formdata
      );
      setLoading(false);
      console.log(res);
      alert(res?.data.message);
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert(err.response.data.message);
    }
  };

  return (
    <>
      <Title>Edit Announcements</Title>
      <p style={{ margin: "10px", fontSize: "20px" }}>
        Edit the announcements...
      </p>
      <Container>
        <DetailsBox>
          <InfoBox>
            <Form>
              <InputBox>
                <p style={{ padding: "3px", fontSize: "20px" }}>Announce:</p>
                <Input
                  value={announce}
                  onChange={(e) => setAnnounce(e.target.value)}
                />
              </InputBox>
            </Form>
          </InfoBox>
        </DetailsBox>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "10px",
          }}
        >
          <Button onClick={handleSave} style={{ fontSize: "18px" }}>
            {loading === true ? "Loading" : "Save"}
          </Button>
        </div>
      </Container>
      <Container>
        <DetailsBox>
          <p>Announcement:-</p>
          <p>{currentAnnounce}</p>
        </DetailsBox>
      </Container>
    </>
  );
};

export default AddAnnouncements;
