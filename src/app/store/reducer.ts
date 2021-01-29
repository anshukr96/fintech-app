import { CardActionTypes, CartActions } from './action';

export let initialState = [];
export const reducer = (state = initialState, action: CartActions) => {
  switch (action.type) {
    case CardActionTypes.ADD_CARD:
      return [...state, action.payload];
    default:
      return state;
  }
};
