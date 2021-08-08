import React from "react";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import { useHistory, Redirect } from "react-router-dom";
import styles from "./styles/SingleBook.module.scss";

const SingleBook: React.FC = () => {
    const { id } = useParams();
    const book = useAppSelector(state => state.books.items.find(book => book.id === id));
    const history = useHistory();

    if (!book) return <Redirect to="/" />;

    const handleGoBackClick = (e) => {
        e.preventDefault();
        history.goBack();
    }

    // Description may be too long for user to see the beggining of it
    window.scrollTo(0, 0);

    return (
        <div className={styles.wrapper}>
            <div className={styles.imageWrapper} id="image">
                {
                    book.volumeInfo.imageLinks?.thumbnail ?
                        <img className={styles.image} src={book.volumeInfo.imageLinks.thumbnail} alt=""/> :
                        <div className={styles.error}>No Image Provided</div>
                }
            </div>
            <div className={styles.info}>
                <button className={styles.link} onClick={handleGoBackClick}> 
                    Go Back
                </button>
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