const initState = {
    isLoading : false,
    isError: false,
    coins: []
}

export const reducer = (state=initState, {type, payload}) => {

    switch(type) {
        default: return {...state};
    }
}