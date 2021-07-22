import React from "react";
import styles from "./styles/LoadMoreButton.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchBooks, booksStatusSelector } from "./booksSlice";

const LoadMoreButton: React.FC = () => {
    const status = useAppSelector(booksStatusSelector);

    const dispatch = useAppDispatch();
    const handleClick = () => {
        dispatch(fetchBooks());
    };

    let render = <>{null}</>;

    if (status === "loading") {
        render = <div className={styles.loader}>Loading...</div>;
    } else if (status === "success") {
        render = (
            <button className={styles.button} onClick={handleClick}>
                Load More
            </button>
        );
    }

    return render;
}

export default LoadMoreButton;