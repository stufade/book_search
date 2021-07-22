import React from "react";
import {Sort, Categories, setSearchCategory, setSearchSortBy} from "./searchSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import styles from "./styles/SearchAdditionalInfo.module.scss";

const categories: Categories[] = ["all", "art", "biography", "computers", "history", "medical", "poetry"];
const sortingBy: Sort[] = ["relevance", "newest"];

const SearchAdditionalInfo: React.FC = () => {
    const category = useAppSelector(state => state.search.category);
    const sortBy = useAppSelector(state => state.search.sortBy);

    const dispatch = useAppDispatch();

    const categorySelect = (
        <select
            id="category"
            className={styles.select}
            value={category}
            onChange={(e) => dispatch(setSearchCategory(e.target.value as Categories))}
        >
            {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
            ))}
        </select>
    );

    const sortBySelect = (
        <select
            id="sortBy"
            className={styles.select}
            value={sortBy}
            onChange={(e) => dispatch(setSearchSortBy(e.target.value as Sort))}
        >
            {sortingBy.map((sortOption, index) => (
                <option key={index} value={sortOption}>{sortOption}</option>
            ))}
        </select>
    );

    return (
        <div className={styles.form}>
            <div>
                <label className={styles.label} htmlFor="category">Categories</label>
                {categorySelect}
            </div>
            <div>
                <label className={styles.label} htmlFor="sortBy">Sorting By</label>
                {sortBySelect}
            </div>
        </div>
    );
}

export default SearchAdditionalInfo;