import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IVideo} from "../types";

export  interface IVideoState {
    video: IVideo | null,
    loading: boolean,
    error: boolean,
}

const initialState: IVideoState = {
    video: null,
    loading: false,
    error: false,
};

const videoReducer = createSlice({
    name: "video",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action: PayloadAction<IVideo>) => {
            state.loading = false;
            state.video = action.payload;
        },
        fetchFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
    }
})