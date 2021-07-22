import React from "react";
import styles from "./styles/SearchResult.module.scss";
import BooksList from "../features/books/BooksList";
import NumberOfResults from "../features/books/NumberOfResults";
import {booksLengthSelector, booksStatusSelector} from "../features/books/booksSlice";
import {useAppSelector} from "./hooks";

const SearchResult: React.FC = () => {
    const status = useAppSelector(booksStatusSelector);
    const numberOfBooks = useAppSelector(booksLengthSelector);
    let render = <>{null}</>;

    // To prevent loading spinner when "Load more" button is pressed
    if (status === "loading" && numberOfBooks === null) {
        render = <div className={styles.loader}>Loading...</div>;
    } else if (numberOfBooks === null) {
        render = <>{null}</>;
    } else if (status === "success" || numberOfBooks > 0) {
        render = (
            <div className={styles.wrapper}>
                <NumberOfResults />
                <BooksList />
            </div>
        );
    } else if (status === "failed") {
        render = <div className={styles.error}>An error occurred. Try again!</div>;
    } else if (numberOfBooks === 0) {
        render = <div className={styles.error}>No books found</div>;
    }

    return render;
}

export default SearchResult;