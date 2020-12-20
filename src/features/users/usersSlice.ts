import { usersControl } from '../../services';
import { createListSlice } from '../utils/createListSlice';

const usersSlice = createListSlice('users', usersControl);

export const {
  reducer: usersReducer,
  actions: usersActions,
  thunk: usersThunk,
} = usersSlice;
