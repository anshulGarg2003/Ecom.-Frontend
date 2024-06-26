import { styled } from "styled-components";
import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";
import { NEW_URL } from "../requestMethos";

const Container = styled.div`
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
const Loader = styled.div`
  height: 50vh;
  width: 100vw;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const Img = styled.img`
  margin: 5px 5px;
  width: 10%;
  object-fit: cover;
`;

const AllProductShow = ({ cat, filters, sort }) => {
  const [loading, setLoading] = useState(true);
  const [newproducts, setNewproducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const [isDone, setIsDone] = useEffect(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let url = `${NEW_URL}/api/products`;
        if (cat) {
          url += `?category=${cat}`;
        }
        const res = await axios.get(url);
        setNewproducts(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    const filterProducts = () => {
      if (cat && filters) {
        // Add null check for filters
        const filtered = newproducts.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(newproducts);
      }
    };
    filterProducts();
  }, [cat, filters, loading]);

  useEffect(() => {
    const sortProducts = () => {
      if (sort === "newest") {
        setFilteredProducts((prev) =>
          [...prev].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      } else if (sort === "aesc") {
        setFilteredProducts((prev) =>
          [...prev].sort((a, b) => a.price - b.price)
        );
      } else if (sort === "desc") {
        setFilteredProducts((prev) =>
          [...prev].sort((a, b) => b.price - a.price)
        );
      }
    };
    sortProducts();
  }, [sort, loading]);

  return (
    <Container>
      {loading === true ? (
        <Loader>
          <p>Please Wait for a Moment...</p>
          <Img
            src="https://media1.giphy.com/media/sSgvbe1m3n93G/200w.webp?cid=790b7611urbagoelz2amdmi3pqm365zegl6d9zadowvxyf6e&ep=v1_gifs_search&rid=200w.D&ct=g"
            alt=""
          />
        </Loader>
      ) : (
        filteredProducts.map((item) => <Product item={item} key={item.id} />)
      )}
    </Container>
  );
};

export default AllProductShow;
