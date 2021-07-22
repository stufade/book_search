import React from "react";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import { Link, Redirect } from "react-router-dom";
import styles from "./styles/SingleBook.module.scss";

const SingleBook: React.FC = () => {
    const { id } = useParams();
    const book = useAppSelector(state => state.books.items.find(book => book.id === id));

    if (!book) return <Redirect to="/" />;

    return (
        <div className={styles.wrapper}>
            <div className={styles.imageWrapper}>
                {
                    book.volumeInfo.imageLinks?.thumbnail ?
                        <img className={styles.image} src={book.volumeInfo.imageLinks.thumbnail} alt=""/> :
                        <div className={styles.error}>No Image Provided</div>
                }
            </div>
            <div className={styles.info}>
                <Link className={styles.link} to="/">
                    Go Back
                </Link>
                <div className={styles.category}>
                    {book.volumeInfo.categories?.[0]}
                </div>
                <div className={styles.title}>
                    {book.volumeInfo?.title}
                </div>
                <div className={styles.authors}>
                    {book.volumeInfo.authors?.map((author, index) =>
                        <span key={index}>{author}{index !== book.volumeInfo.authors.length - 1 && ", "}</span>)
                    }
                </div>
                <div className={styles.description}>
                    {book.volumeInfo?.description}
                </div>
            </div>
        </div>
    );
}

export default SingleBook;