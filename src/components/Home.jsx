import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../redux/store";
import { getCoins, getCoinsFailure, getCoinsSuccess } from "../redux/action";
import Loader from "./Loader";

const Home = () => {
  const [currency, setCurrent] = useState("INR");
  const [sortOrder, setSortOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { coins, isLoading, isError } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(`${baseURL}?vs_currency=${currency}&order=market_cap_${sortOrder}&per_page=10&page=${page}`);
  }, [sortOrder, page, currency]);

  const fetchData = (url) => {
    dispatch(getCoins());
    axios
      .get(url)
      .then((res) => {
        dispatch(getCoinsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getCoinsFailure());
      });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  } 

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Coins Data</h1>

      <div>
        <div>
          <input type="text" placeholder="Search Coin" onChange={handleSearch} value={search} />
        </div>

        <div>
          <select name="">
            <option value="">Sort by Market Cap</option>
            <option value="asc">Low To High</option>
            <option value="desc">High To Low</option>
          </select>
        </div>

        <div>
          <select name="">
            <option value="">Choose Currency</option>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>
      <div className="coin-container">
        <table>
          <thead>
            <tr>
              <td>Coin</td>
              <td>Price</td>
              <td>24 hr Change</td>
              <td>Market Cap</td>
            </tr>
          </thead>
          <tbody>
            {coins.length > 0 &&
              coins.map((ele) => {
                return (
                  <tr key={ele.id}>
                    <td>
                      <img
                        src={ele.image}
                        alt={ele.name}
                        style={{ width: "50px", objectFit: "cover" }}
                      />
                      <span>{ele.name}</span>
                    </td>
                    <td>
                      <h3>{ele.current_price}</h3>
                    </td>
                    <td>
                      <p>{ele.price_change_percentage_24h}</p>
                    </td>
                    <td>
                      <p>{ele.market_cap}</p>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div className="pages-container">

      </div>
    </div>
  );
};

export default Home;
