import { styled } from "styled-components";
import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";
const NEW_URL="https://firstprojbackend.onrender.com";
const Container = styled.div`
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
`;

const Products = ({ cat, filters, sort }) => {
  const [newproducts, setNewproducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let url = `${NEW_URL}/api/products`;
        if (cat) {
          url += `?category=${cat}`;
        }
        const res = await axios.get(url);
        // console.log(res.data);
        setNewproducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);
  useEffect(() => {
    cat &&
      setFilteredProducts(
        newproducts.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [newproducts, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "aesc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : newproducts.map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
