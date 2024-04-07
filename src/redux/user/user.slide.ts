import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const fetchListUsers = createAsyncThunk(
    'users/fetchByIdStatus',
    async (userId, thunkAPI) => {
        const res = await fetch("http://localhost:8000/users");
        const data = await res.json();
        return data;
    },
)


interface IUserPayload {
    email: string,
    name: string
}

export const createNewUser = createAsyncThunk(
    'users/createNewUser',
    async (payload: IUserPayload, thunkAPI) => {
        const res = await fetch("http://localhost:8000/users", {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                name: payload.name
            }),
            headers: {
                "Content-Type": " application/json"
            }
        })

        const data = await res.json();
        console.log(">>> check data: ", data);
        return data;
    },
)


interface IUser {
    id: number;
    name: string;
    email: string;
}

const initialState: {
    listUsers: IUser[]
} = {
    listUsers: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchListUsers.fulfilled, (state, action) => {
            state.listUsers = action.payload;
        })
    },
})

// Action creators are generated for each case reducer function
export const { } = userSlice.actions

export default userSlice.reducer