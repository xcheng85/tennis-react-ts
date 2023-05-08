import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../api/authenticate';

type State = {
  user: undefined | User; // logout state is undefined
  roles: undefined | string[];
  loading: boolean; // in the process of login
};

// logged out
const initialState: State = {
  user: undefined,
  roles: undefined,
  loading: false,
};

// state machine alike
// slice has all the supported actions and reducers
// reducers has many keys, value is (state, action) => void
export const userSlice = createSlice({
  name: 'user', // slice name
  initialState,
  reducers: {
    authenticateAction: (state) => {
      state.loading = true;
    },
    // specifiy the payload type
    authenticatedAction: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
      state.loading = false;
    },
    authorizeAction: (state) => {
      state.loading = true;
    },
    authorizedAction: (state, action: PayloadAction<string[]>) => {
      state.roles = action.payload;
      state.loading = false;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { authenticateAction, authenticatedAction, authorizeAction, authorizedAction } =
  userSlice.actions;
