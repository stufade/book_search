import React, {useState} from "react";
import { useAppDispatch } from "../../app/hooks";
import { setSearchStr } from "./searchSlice";
import { fetchBooks, setStateToDefault } from "../books/booksSlice";
import { useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import styles from "./styles/SearchField.module.scss";

const SearchField: React.FC = () => {
    const history = useHistory();

    const [text, setText] = useState("");

    const dispatch = useAppDispatch();

    const handleTextChange = (e) => setText(e.target.value);
    const handleSubmit = () => {
        if (text) {
            dispatch(setStateToDefault());
            dispatch(setSearchStr(text));
            dispatch(fetchBooks());
            history.push("/");
        }
    }
    const handleEnterPress = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <div className={styles.form}>
            <input className={styles.input} type="text" value={text} onChange={handleTextChange} onKeyUp={handleEnterPress}/>
            <button className={styles.button} onClick={handleSubmit}>
                <BsSearch color="white" size={20} />
            </button>
        </div>
    );
}

export default SearchField;