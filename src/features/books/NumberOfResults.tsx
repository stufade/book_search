import React from "react";
import { useAppSelector } from "../../app/hooks";
import { booksLengthSelector } from "./booksSlice";
import styles from "./styles/NumberOfResults.module.scss";

const NumberOfResults: React.FC = () => {
    const totalResults = useAppSelector(booksLengthSelector);

    return (
        <div className={styles.text}>
            Number of results: <span className={styles.innerText}>{totalResults}</span>
        </div>
    );
}

export default NumberOfResults;