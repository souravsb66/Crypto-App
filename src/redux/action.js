import { GET_COINS_FAILURE, GET_COINS_REQUEST, GET_COINS_SUCCESS, GET_SINGLE_COIN_SUCCESS } from "./actionType"

export const getCoins = () => {
    return ({type: GET_COINS_REQUEST});
}

export const getCoinsFailure = () => {
    return ({type: GET_COINS_FAILURE});
}

export const getCoinsSuccess = (payload) => {
    return ({type: GET_COINS_SUCCESS, payload})
}

export const getSingleCoin = (payload) => {
    return ({type: GET_SINGLE_COIN_SUCCESS, payload})
}