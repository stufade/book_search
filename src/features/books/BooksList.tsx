import React from "react";
import { useAppSelector } from "../../app/hooks";
import { booksArraySelector } from "./booksSlice";
import { useHistory } from "react-router-dom";
import styles from "./styles/BooksList.module.scss";
import LoadMoreButton from "./LoadMoreButton";

const BooksList: React.FC = () => {
    const books = useAppSelector(booksArraySelector);
    const history = useHistory();
    
    const onClickHandler = (id) => {
        history.push(`/books/${id}`);
    };

    const booksList = books.map((book, index) => (
        <div
            key={index}
            className={styles.listItem}
            onClick={() => onClickHandler(book.id)}
        >
            <div className={styles.imageWrapper}>
                {book.volumeInfo.imageLinks?.smallThumbnail ? (
                    <img
                        className={styles.image}
                        src={book.volumeInfo.imageLinks?.smallThumbnail}
                        alt=""
                    />
                ) : (
                    <span className={styles.noImageText}>
                        No Image Provided
                    </span>
                )}
            </div>
            <div className={styles.bookInfo}>
                <div className={styles.category}>
                    {book.volumeInfo?.categories?.[0]}
                </div>
                <div className={styles.title}>{book.volumeInfo?.title}</div>
                <div className={styles.authors}>
                    {book.volumeInfo?.authors?.map((author, index) => (
                        <span key={index} className={styles.author}>
                            {author}
                            {index !== book.volumeInfo.authors.length - 1 &&
                                ","}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    ));

    return (
        <>
            <div className={styles.listWrapper}>{booksList}</div>
            <LoadMoreButton />
        </>
    );
};

export default BooksList;
