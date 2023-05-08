import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userSlice';

// ConfigureStoreOptions

export const store = configureStore({
  // here use ReducersMapObject
  reducer: { user: userReducer },
});

// ts utility types
// https://www.typescriptlang.org/docs/handbook/utility-types.html
// The same as writing:
// type StoreState = {
//     user: State;
// }
export type StoreState = ReturnType<typeof store.getState>;
