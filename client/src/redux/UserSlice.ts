import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser, IUserLogin} from "../types/UserTypes";
import UserRequests from "../api/UserRequests";
import {RootState} from "./store";


export const fetchLogin = createAsyncThunk<IUser, IUserLogin>(
    "user/fetchLogin",
    async (value:IUserLogin, thunkAPI) => {
        const res = await UserRequests.userLogin(value);
        localStorage.setItem("access_token", res.data.token);
        return res.data;
    }
)
export interface UserAuthState {
    loading: boolean
    user: IUser | null;
    error?: boolean;
    token?: string;
}

const initialState: UserAuthState = {
    loading: false,
    user: null,
    token: ""
};


const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.loading = true;
                state.user = null
            })
            .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchLogin.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.error = true;

            })
    }
})

export const {
    logout,
    loginStart,
    loginSuccess,
    loginFailure
} = userAuthSlice.actions;
export const selectLoading = (state: RootState) => state.user.loading;
export const selectUser = (state: RootState) => state.user.user;
export const selectError = (state: RootState) => state.user.error;
export default userAuthSlice.reducer;
