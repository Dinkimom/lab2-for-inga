import { catalogControl } from '../../services';
import { createListSlice } from '../utils/createListSlice';

const catalogSlice = createListSlice('catalog', catalogControl);

export const {
  reducer: catalogReducer,
  actions: catalogActions,
  thunk: catalogThunk,
} = catalogSlice;
