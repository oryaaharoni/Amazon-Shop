// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Button,
  Col,
  Link,
  Row,
  axios,
  toast,
  useLocation,
  useNavigate,
  useReducer,
  useState,
  LinkContainer,
} from "../import.js";
import searchPageReducer from "../reducers/searchPageReducer.jsx";
import { getError, getFilterURI } from "../utils.jsx";
import Title from "../components/shared/Title.jsx";
import Rating from "../components/shared/Rating.jsx";
import Loading from "../components/shared/Loading.jsx";
import MessageBox from "../components/shared/MessageBox.jsx";
// import ProductDescription from '../components/DescriptionPage/productDescription.jsx';
import Product from "../components/HomePage/Product.jsx";

const prices = [
  { name: "$1-$50", value: "1-50" },
  { name: "51$-200$", value: "51-200" },
  { name: "201$-1000$", value: "51-1000" },
];

const ratings = [
  { name: "4 stars and up", rate: 4 },
  { name: "3 stars and up", rate: 3 },
  { name: "2 stars and up", rate: 2 },
  { name: "1 stars and up", rate: 1 },
];

const SearchPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const category = searchParams.get("category") || "all";
  const query = searchParams.get("query") || "all";
  const price = searchParams.get("price") || "all";
  const rating = searchParams.get("rating") || "all";
  const order = searchParams.get("order") || "newest";
  const page = searchParams.get("page") || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(searchPageReducer, { loading: true, erroe: "" });

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get(`/api/v1/product/categories`);
        setCategories(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        dispatch({ type: "GET_REQUEST" });
        const { data } = await axios.get(
          `/api/v1/product/search?category=${category}&query=${query}&price=${price}&rating=${rating}&order=${order}&page=${page}`
        );
        dispatch({ type: "GET_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "GET_FAIL", payload: getError(error) });
      }
    };

    getProducts();
  }, [category, query, price, rating, order, page]);

  return (
    <div>
      <Title title="Search Page" />
      <Row>
        <Col md={3}>
          <h3>Categories:</h3>
          <div>
            <ul>
              <li>
                <Link
                  className={"all" === category ? "text-bold" : ""} //doesn't work
                  to={getFilterURI(search, { category: "all" })}
                >
                  Any
                </Link>
              </li>
              {categories.map((categoryLocal) => (
                <li key={categoryLocal}>
                  <Link
                    className={categoryLocal === category ? "text-bold" : ""}
                    to={getFilterURI(search, { category: categoryLocal })}
                  >
                    {categoryLocal}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <h3>Price:</h3>
          <div>
            <ul>
              <li>
                <Link
                  className={"all" === price ? "text-bold" : ""} //doesn't work
                  to={getFilterURI(search, { price: "all" })}
                >
                  Any
                </Link>
              </li>
              {prices.map((priceLocal) => (
                <li key={priceLocal.value}>
                  <Link
                    className={priceLocal.value === price ? "text-bold" : ""}
                    to={getFilterURI(search, { price: priceLocal.value })}
                  >
                    {priceLocal.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <h3>Reviews:</h3>
          <div>
            <ul>
              <li>
                <Link
                  className={"all" === rating ? "text-bold" : ""} //doesn't work
                  to={getFilterURI(search, { price: "all" })}
                >
                  Any
                </Link>
              </li>
              {ratings.map((ratingLocal) => (
                <li key={ratingLocal.rate}>
                  <Link
                    className={ratingLocal.rate === rating ? "text-bold" : ""}
                    to={getFilterURI(search, { rating: ratingLocal.rate })}
                  >
                    {ratingLocal.name}
                    <Rating rate={ratingLocal} caption={" "} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <Loading />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row>
                <Col md={6}>
                  <div>
                    {countProducts === 0 ? "No" : countProducts} Results
                    {query !== "all" && " : " + query}
                    {category !== "all" && " : " + category}
                    {price !== "all" && " : Price " + price}
                    {rating !== "all" && " : Rating" + rating + " & up"}
                    {query !== "all" ||
                    category !== "all" ||
                    price !== "all" ||
                    rating !== "all" ? (
                      <Button
                        variant="light"
                        onClick={() =>
                          navigate(
                            getFilterURI(search, {
                              query: "all",
                              category: "all",
                              price: "all",
                              rating: "all",
                              order: "newest",
                              page: 1,
                            })
                          )
                        }
                      >
                        <i className="fas fa-times-circle" />
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  Sort by{" "}
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterURI(search, { order: e.target.value }));
                    }}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Customer Reviews</option>
                  </select>
                </Col>
              </Row>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <Row>
                {products.map((product) => (
                  <Col sm={6} lg={4} className="mb-3" key={product._id}>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>

              <div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={{
                      pathname: "/search",
                      search: getFilterURI(search, { page: x + 1 }, true),
                    }}
                  >
                    <Button
                      className={
                        Number(page) === x + 1 ? "highlight-current-page" : ""
                      }
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SearchPage;
