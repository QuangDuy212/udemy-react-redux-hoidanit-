import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
interface IUserPayload {
    email: string,
    name: string
}
interface IUdapteUserPayload {
    email: string,
    name: string,
    id: string
}
interface IDeleteUserPayload {
    id: string
}
interface IUser {
    id: number;
    name: string;
    email: string;
}


export const fetchListUsers = createAsyncThunk(
    'users/fetchByIdStatus',
    async () => {
        const res = await fetch("http://localhost:8000/users");
        const data = await res.json();
        return data;
    },
)

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
        if (data && data.id) {
            thunkAPI.dispatch(fetchListUsers());
        }
        return data;
    },
)

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (payload: IUdapteUserPayload, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                email: payload.email,
                name: payload.name,
                id: payload.id
            }),
            headers: {
                "Content-Type": " application/json"
            }
        })

        const data = await res.json();
        if (data && data.id) {
            thunkAPI.dispatch(fetchListUsers());
        }
        return data;
    },
)

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (payload: IDeleteUserPayload, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": " application/json"
            }
        })

        const data = await res.json();
        thunkAPI.dispatch(fetchListUsers());
        return data;
    },
)


const initialState: {
    listUsers: IUser[],
    isCreateSuccess: boolean,
    isUpdateSuccess: boolean,
    isDeleteSuccess: boolean
} = {
    listUsers: [],
    isCreateSuccess: false,
    isUpdateSuccess: false,
    isDeleteSuccess: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetCreate: (state, action) => {
            state.isCreateSuccess = false;
        },
        resetUpdate: (state, action) => {
            state.isUpdateSuccess = false;
        },
        resetDelete: (state, action) => {
            state.isDeleteSuccess = false;
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchListUsers.fulfilled, (state, action) => {
                state.listUsers = action.payload;
            })
            .addCase(createNewUser.fulfilled, (state, action) => {
                state.isCreateSuccess = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isUpdateSuccess = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isDeleteSuccess = true;
            })
    },
})

// Action creators are generated for each case reducer function
export const { resetCreate, resetUpdate, resetDelete } = userSlice.actions

export default userSlice.reducer