import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { EntityEnum } from '../enums/EntityEnum';
import { cardsReducer } from '../features/cards/cardsSlice';
import { catalogReducer } from '../features/catalog/catalogSlice';
import { usersReducer } from '../features/users/usersSlice';

export const ReduxState = {
  [EntityEnum.Card]: 'cards',
  [EntityEnum.Users]: 'users',
  [EntityEnum.Catalog]: 'catalog',
};

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    users: usersReducer,
    cards: cardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
