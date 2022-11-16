import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models/user';

export interface AuthState {
    isLoading?: boolean;
    isLoggedIn: boolean;
    currentUser?: User;
    error?: unknown;
}

export interface LoginPayload {
    username: string;
    password: string;
}

const initialState: AuthState = {
    isLoading: false,
    isLoggedIn: false,
    currentUser: undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginPayload>) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.isLoggedIn = true;
            state.isLoading = false;
            state.currentUser = action.payload;
        },
        loginFailed: (state, action: PayloadAction<unknown>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.currentUser = undefined;
        },
        end: () => {}
    }
});
// Actions
export const authActions = authSlice.actions;


//Selector
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectCurrentUser = (state: any) => state.auth.currentUser;
export const selectIsLoading = (state: any) => state.auth.isLoading;

//Reducer
export default authSlice.reducer;