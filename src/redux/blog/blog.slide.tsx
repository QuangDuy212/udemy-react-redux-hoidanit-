import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IBlogs {
    id: string,
    title: string,
    author: string,
    content: string
}

interface IBlogPayload {
    title: string,
    author: string,
    content: string
}

interface IDeleteBlog {
    id: string
}


export const fetchlistBlogs = createAsyncThunk(
    'users/fetchlistBlogs',
    async () => {
        const res = await fetch("http://localhost:8000/blogs");
        const data = await res.json();
        return data;
    },
)

export const createNewBlog = createAsyncThunk(
    'users/createNewBlog',
    async (payload: IBlogPayload, thunkAPI) => {
        const res = await fetch("http://localhost:8000/blogs", {
            method: 'POST',
            body: JSON.stringify({
                title: payload.title,
                author: payload.author,
                content: payload.content
            }),
            headers: {
                "Content-Type": " application/json"
            }
        })

        const data = await res.json();
        if (data && data.id) {
            thunkAPI.dispatch(fetchlistBlogs());
        }
        return data;
    },
)

export const updateBlog = createAsyncThunk(
    'users/updateBlog',
    async (payload: IBlogs, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: payload.id,
                title: payload.title,
                author: payload.author,
                content: payload.content
            }),
            headers: {
                "Content-Type": " application/json"
            }
        })

        const data = await res.json();
        if (data && data.id) {
            thunkAPI.dispatch(fetchlistBlogs());
        }
        return data;
    },
)

export const deleteBlog = createAsyncThunk(
    'users/deleteBlog',
    async (payload: IDeleteBlog, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": " application/json"
            }
        })

        const data = await res.json();
        thunkAPI.dispatch(fetchlistBlogs());
        return data;
    },
)


const initialState: {
    listBlogs: IBlogs[],
    isCreateSuccess: boolean,
    isUpdateSuccess: boolean,
    isDeleteSuccess: boolean
} = {
    listBlogs: [],
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
            .addCase(fetchlistBlogs.fulfilled, (state, action) => {
                state.listBlogs = action.payload;
            })
            .addCase(createNewBlog.fulfilled, (state, action) => {
                state.isCreateSuccess = true;
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.isUpdateSuccess = true;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.isDeleteSuccess = true;
            })
    },
})

// Action creators are generated for each case reducer function
export const { resetCreate, resetUpdate, resetDelete } = userSlice.actions

export default userSlice.reducer