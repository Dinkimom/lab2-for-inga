import { cardControl } from '../../services';
import { createListSlice } from '../utils/createListSlice';

const cardsSlice = createListSlice('card', cardControl);

export const {
  reducer: cardsReducer,
  actions: cardsActions,
  thunk: cardsThunk,
} = cardsSlice;
