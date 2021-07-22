import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Sort = "relevance" | "newest";
export type Categories =
    | "all"
    | "art"
    | "biography"
    | "computers"
    | "history"
    | "medical"
    | "poetry";

export interface SearchState {
    str: string;
    sortBy: Sort;
    category: Categories;
}

const initialState: SearchState = {
    str: "",
    sortBy: "relevance",
    category: "all",
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchStr: {
            reducer: (state, action: PayloadAction<string>) => {
                state.str = action.payload;
            },
            prepare: (str: string) => {
                return {payload: str.trim()}
            }
        },
        setSearchSortBy: (state, action: PayloadAction<Sort>) => {
            state.sortBy = action.payload;
        },
        setSearchCategory: (state, action: PayloadAction<Categories>) => {
            state.category = action.payload;
        }
    }
});

export const {setSearchCategory, setSearchSortBy, setSearchStr} = searchSlice.actions;

export default searchSlice.reducer;