import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { BookType } from "./BookType";
import { key } from "../../api";

type Statuses = "idle" | "success" | "loading" | "failed" | "no books";

interface PayloadActionValue {
    totalItems: number;
    items: Array<BookType>;
}

export interface BooksState {
    totalItems: number | null;
    items: Array<BookType>;
    itemsLoaded: number;
    itemsPerRequest: number;
    status: Statuses;
    error: string | undefined;
}

const initialState: BooksState = {
    totalItems: null,
    items: [],
    itemsLoaded: 0,
    itemsPerRequest: 30,
    status: "idle",
    error: undefined
};

export const fetchBooks = createAsyncThunk("books/fetchBooks", async (arg, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const {str, sortBy, category} = state.search;
    let subject = "";
    if (category !== "all") {
        subject = `+subject:${category}`;
    }
    const url = `https://www.googleapis.com/books/v1/volumes
    ?q=${str.replace(" ", "+")}
    ${subject}
    &orderBy=${sortBy}
    &startIndex=${state.books.itemsLoaded}
    &maxResults=${state.books.itemsPerRequest}
    &key=${key}`.replace(/ /g,'');
    const booksFetchedValue = await fetch(url);
    return await booksFetchedValue.json();
});

export const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setStateToDefault: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBooks.fulfilled, ((state, action: PayloadAction<PayloadActionValue>) => {
                if (!action.payload.items) {
                    state.status = "no books";
                    return;
                }
                state.status = "success";
                state.totalItems = action.payload.totalItems;
                state.items = [...state.items, ...action.payload.items];
                state.itemsLoaded += state.itemsPerRequest;
            }))
            .addCase(fetchBooks.rejected, ((state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            }));
    }
});

export const { setStateToDefault } = booksSlice.actions;

export const booksArraySelector = (state: RootState) => state.books.items;
export const booksLengthSelector = (state: RootState) => state.books.totalItems;
export const booksStatusSelector = (state: RootState) => state.books.status;

export default booksSlice.reducer;
