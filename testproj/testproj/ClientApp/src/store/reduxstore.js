import { createStore } from 'redux'

const initialState = {
    basket: []
}

const reducer = (state = initialState, action) => {

    if (action.type === 'ADD_BASKET_ITEM') {
        return Object.assign({}, state, {
            basket: state.basket.concat(action.payload)
        })
    }

    return state;
}

const store = createStore(reducer)

export default store