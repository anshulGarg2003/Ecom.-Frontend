import { styled } from "styled-components";
import Product from "./Product";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const NEW_URL = "http://localhost:5000";
const Container = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  gap: 5px;
  overflow-x: auto;
  /* scroll-behavior: smooth; */
  position: relative;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #f2e9e9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  z-index: 2;
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
`;

const ArrowIcon = styled.div`
  color: #000;
`;

const Content = styled.div`
  display: flex;
  gap: 5px;
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

const ProductBox = styled.div`
  display: flex;
  flex: 1;
  margin: 5px;
  min-width: 253px;
  height: 60vh;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const Products = ({ cat, filters, sort }) => {
  const [loading, setLoading] = useState(true);
  const [newproducts, setNewproducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const history = useHistory();
  const containerRef = useRef(null);

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
  }, [cat, filters, newproducts]);

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
      } else {
        setFilteredProducts((prev) =>
          [...prev].sort((a, b) => b.price - a.price)
        );
      }
    };
    sortProducts();
  }, [ sort]);

  const scroll = (direction) => {
    const container = containerRef.current;
    const scrollAmount = 250; // Adjust scroll amount as needed

    if (direction === "left") {
      container.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    } else if (direction === "right") {
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <Container>
      <ScrollButton direction="left" onClick={() => scroll("left")}>
        <ArrowIcon>
          <IoIosArrowBack size={24} />
        </ArrowIcon>
      </ScrollButton>
      <Container ref={containerRef}>
        {loading === true ? (
          <Loader>
            <p>Please Wait for a Moment...</p>
            <Img
              src="https://media1.giphy.com/media/sSgvbe1m3n93G/200w.webp?cid=790b7611urbagoelz2amdmi3pqm365zegl6d9zadowvxyf6e&ep=v1_gifs_search&rid=200w.D&ct=g"
              alt=""
            />
          </Loader>
        ) : (
          filteredProducts
            .slice(0, 7)
            .map((item) => <Product item={item} key={item.id} />)
        )}
      </Container>
      <ScrollButton direction="right" onClick={() => scroll("right")}>
        <ArrowIcon>
          <IoIosArrowForward size={24} />
        </ArrowIcon>
      </ScrollButton>
    </Container>
  );
};

export default Products;
