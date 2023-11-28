import React from 'react'
import { useSelector } from "react-redux";

const Home = () => {

    const coins = useSelector((store) => store);

    console.log(coins);
    
  return (
    <div>
        <h1>Coins Data</h1>
    </div>
  )
}

export default Home