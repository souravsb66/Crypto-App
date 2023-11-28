import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../redux/store";
import {
  getCoins,
  getCoinsFailure,
  getCoinsSuccess,
  getSingleCoin,
} from "../redux/action";
import Loader from "./Loader";
import styled from "styled-components";

const Home = () => {
  const [currency, setCurrency] = useState("INR");
  const [sortOrder, setSortOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalState, setModalState] = useState(false);

  const { coins, isLoading, isError, singleCoin } = useSelector(
    (store) => store
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (search) {
      fetchData(`https://api.coingecko.com/api/v3/search?query=${search}`);
    } else {
      fetchData(`${baseURL}?vs_currency=${currency}&order=market_cap_${sortOrder}&per_page=10&page=${page}`);
      // fetchData(`${baseURL}?vs_currency=${currency}`);
    }
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
  };

  const handleSortOrder = (e) => {
    let order = e.target.value;
    if (order) {
      setSortOrder(order);
    }
  };

  const handleCurrency = (e) => {
    let currency = e.target.value;
    if (currency) {
      setCurrency(currency);
    }
  };

  const handleSingleCoin = (id) => {
    dispatch(getCoins());
    const coinURL = `https://api.coingecko.com/api/v3/coins/${id}`;
    axios
      .get(coinURL)
      .then((res) => {
        console.log(res);
        dispatch(getSingleCoin(res.data));
      })
      .catch((err) => {
        dispatch(getCoinsFailure());
      });

    handleModal();
  };

  const handleModal = () => {
    setModalState((prev) => !prev);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <DIV>
      <h1>Coins Data</h1>

      <div className="param-div">
        <div>
          <input
            type="text"
            placeholder="Search Coin"
            onChange={handleSearch}
            value={search}
          />
        </div>

        <div>
          <select name="" value={sortOrder} onChange={handleSortOrder}>
            <option value="">Sort by Market Cap</option>
            <option value="asc">Low To High</option>
            <option value="desc">High To Low</option>
          </select>
        </div>

        <div>
          <select name="" value={currency} onChange={handleCurrency}>
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
                  <tr
                    key={ele.id}
                    onClick={() => {
                      handleSingleCoin(ele.id);
                    }}
                  >
                    <td className="name-col">
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

      <div className={modalState ? "modal showModal" : "modal hideModal"}>
        <div>
          {/* <img src={singleCoin.image.large} alt="" /> */}
          <p>Name: {singleCoin.name}</p>
          <h3>Market Cap Rank: {singleCoin.market_cap_rank}</h3>
          <h4>Symbol: {singleCoin.symbol}</h4>
          <p>Total Supply: {singleCoin.total_supply}</p>
        </div>
        <button onClick={handleModal}>Close</button>
      </div>

      <div className="pages-container">
        <button
          disabled={page == 1}
          onClick={() => {
            setPage((prev) => prev - 1);
          }}
        >
          Previos
        </button>
        <button>{page}</button>
        <button
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
        >
          Next
        </button>
      </div>
    </DIV>
  );
};

const DIV = styled.div`
  input,
  select {
    padding: 0.5rem 1rem;
  }

  table {
    width: 100%;
  }

  thead {
    background-color: #eebc1d;
  }

  tbody {
    tr {
      cursor: pointer;
    }
  }

  button {
    padding: 0.3rem 0.6rem;
  }

  td {
    padding: 0.5rem;
  }

  .modal {
    display: none;
    position: absolute;
    top: 200px;
    left: 40%;
    width: 300px;
    padding: 1rem;
    border-radius: 1rem;
    background-color: #313131;
    color: white;
  }

  .showModal {
    display: block;
  }

  .hideModal {
    display: none;
  }

  .name-col {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .param-div {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 3rem;
  }
`;

export default Home;
