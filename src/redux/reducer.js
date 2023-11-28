import { GET_COINS_FAILURE, GET_COINS_REQUEST, GET_COINS_SUCCESS, GET_SINGLE_COIN_SUCCESS } from "./actionType";

const initState = {
    isLoading : false,
    isError: false,
    coins: [],
    singleCoin: {
        name: "LeoCoin"
    }
}

export const reducer = (state=initState, {type, payload}) => {

    switch(type) {
        case GET_COINS_REQUEST:
            return {...state, isLoading: true};
        case GET_COINS_FAILURE:
            return {...state, isLoading: false, isError: true};
        case GET_COINS_SUCCESS:
            return {...state, isLoading: false, isError: false, coins: [...payload]};
        case GET_SINGLE_COIN_SUCCESS:
            return {...state, isLoading: false, isError: false, singleCoin: {...payload}};
        default: return {...state};
    }
}