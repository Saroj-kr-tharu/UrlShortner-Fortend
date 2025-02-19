import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = 'http://localhost:9000/urlshortner';
const baseUrlAnalytic = 'http://localhost:9000/analytic';

// Helper function to handle errors
const handleError = (error) => {
    return error?.response?.data?.err || error?.response?.data?.message || 'Failed to generate short URL';
};

// Async thunk for generating short URL
const shortUrlGenerationAction = createAsyncThunk(
    'urlShortner/makeshort',
    async (data, { rejectWithValue }) => {
        try {
            // alert('data')
            const response = await axios.post(`${baseUrl}/create`, data);
            if (response?.status === 201) {
                return response.data;
            }
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Async thunk for getting analytics
const getAnalyticAction = createAsyncThunk(
    'urlShortner/analytic',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseUrlAnalytic}/getAll`, { email: data });
            if (response?.status === 200) {
                return response.data;
            }
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Async thunk for delete url 
const deleteUrlAction = createAsyncThunk(
    'urlShortner/deleteUrl',
    async (data, { rejectWithValue }) => {
        try {

            const response = await axios.delete(`${baseUrlAnalytic}/delById`, { params: { id: data } });

            if (response?.status === 200) {
                return response.data;
            }
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

const initialState = {
    shortUrl: null,
    originUrl: null,
    status: 'idle',
    error: null,
    totalLinks: null,
    totalnoLinks: 0,
    totalActive: [],
    totalnoActive: 0,
    totalVisits: [],
    totalnoVisits: 0,
    totalExpired: [],
    totalnoExpire: 0,
    firstLinkCreated: null,
    lastLinkCreated: null
};

const urlShortnerSlice = createSlice({
    name: 'UrlShortnerSlice',
    initialState,
    reducers: {
        ResetAction: (state) => {
            Object.assign(state, initialState);
        },


        deleteUrlById: (state, action) => {
            // console.log('delete => ',action.payload);

            state.totalLinks = state.totalLinks.filter(item => item.id !== action.payload);
            state.totalActive = state.totalActive.filter(item => item.id !== action.payload);
            state.totalExpired = state.totalExpired.filter(item => item.id !== action.payload);
            state.totalVisits = state.totalVisits.filter(item => item.id !== action.payload);
        },


    },
    extraReducers: (builder) => {
        builder
            // geting short url 
            .addCase(shortUrlGenerationAction.pending, (state) => {
                state.status = 'Loading';
            })
            .addCase(shortUrlGenerationAction.fulfilled, (state, action) => {
                state.error = null;
                state.status = 'Fulfilled';
                state.shortUrl = action.payload.data;
            })
            .addCase(shortUrlGenerationAction.rejected, (state, action) => {
                state.status = 'Failed';
                state.error = action.payload;
            })

            // delete url 
            .addCase(deleteUrlAction.pending, (state) => {
                state.status = 'Loading';
            })
            .addCase(deleteUrlAction.fulfilled, (state, action) => {
                state.error = null;
                state.status = 'Fulfilled';

                const urlId = action.payload.data.id;
                urlShortnerSlice.caseReducers.deleteUrlById(state, { payload: urlId });



            })
            .addCase(deleteUrlAction.rejected, (state, action) => {
                state.status = 'Failed';
                state.error = action.payload;
            })



            // get analytic 
            .addCase(getAnalyticAction.pending, (state) => {
                state.status = 'Loading';
            })
            .addCase(getAnalyticAction.fulfilled, (state, action) => {
                state.error = null;
                state.status = 'Fulfilled';
                const data = action.payload.data;

                state.totalLinks = data;
                state.totalActive = [];
                state.totalVisits = [];
                state.totalExpired = [];

                const dateOfOneWeekAgo = new Date();
                dateOfOneWeekAgo.setDate(dateOfOneWeekAgo.getDate() - 7);

                data.forEach((item, index) => {
                    if (index === 0) state.firstLinkCreated = item.createdAt;
                    state.lastLinkCreated = item.createdAt;


                    if (item.click > 0 && new Date(item.lastAccessedAt) >= dateOfOneWeekAgo) {
                        state.totalActive.push(item);
                    }

                    if (item.click > 0) {
                        state.totalVisits.push(item);
                    }

                    if (new Date(item.expiresAt) >= dateOfOneWeekAgo) {
                        state.totalExpired.push(item);
                    }
                });

                state.totalnoLinks = state.totalLinks.length;
                state.totalnoActive = state.totalActive.length;
                state.totalnoExpire = state.totalExpired.length;
                state.totalnoVisits = state.totalVisits.length;
            })
            .addCase(getAnalyticAction.rejected, (state, action) => {
                state.status = 'Failed';
                state.error = action.payload;
            });
    }
});

export default urlShortnerSlice.reducer;
export const { ResetAction, deleteUrlById } = urlShortnerSlice.actions;
export { shortUrlGenerationAction, getAnalyticAction, deleteUrlAction };