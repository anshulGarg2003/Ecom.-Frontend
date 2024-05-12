import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { publicRequest } from "../requestMethos";

const Container = styled.div`
  height: 30px;
  font-size: 20px;
  background-color: #32d69c;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-weight: bold;
`;

const moveBackAndForth = keyframes`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(100px); /* Move the text 50 pixels to the right */
  }
  50% {
    transform: translateX(0px); /* Move the text 50 pixels to the right */
  }
  75% {
    transform: translateX(-100px); /* Move the text 50 pixels to the right */
  }
  100% {
    transform: translateX(0);
  }
`;

const Ps = styled.p`
  animation: ${moveBackAndForth} 5s linear infinite; /* Adding transition for transform property */
`;

const Announcement = () => {
  const [desc, setDesc] = useState({});
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await publicRequest.get("/announcement");
        // console.log(res.data);
        setDesc(res.data);
        // console.log(desc[0].desc);
        // setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  return (
    <>
      <Container>
        <Ps>{desc[0]?.desc}</Ps>
      </Container>
    </>
  );
};

export default Announcement;
