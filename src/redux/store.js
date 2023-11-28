import { legacy_createStore } from "redux";
import { reducer } from "./reducer";

export const baseURL = "https://api.coingecko.com/api/v3/coins/markets"

export const store = legacy_createStore(reducer);