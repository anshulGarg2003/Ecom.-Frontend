import React, { useEffect, useState, useRef } from "react";
import { styled } from "styled-components";
import { publicRequest } from "../requestMethos";
const Container = styled.div``;

const CategorySlider = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await publicRequest.get("/categorydata");
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  return <Container>{
        // data && dataslice(0,4).map((item)=>(

        // ))
    }</Container>;
};

export default CategorySlider;
