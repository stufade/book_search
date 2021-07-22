import React from "react";
import SearchField from "../features/search/SearchField";
import SearchAdditionalInfo from "../features/search/SearchAdditionalInfo";
import {useAppSelector} from "./hooks";
import styles from "./styles/Header.module.scss";

const Header: React.FC = () => {
    const searchText = useAppSelector(state => state.search.str);

    return (
        <div className={styles.header}>
            <div className={styles.text}>
                {searchText ?
                    <>Results for <br/> <span className={styles.result}>{searchText}</span></> :
                    <>Search for <br/> <span className={styles.result}>Books</span></>
                }
            </div>
            <SearchField/>
            <SearchAdditionalInfo/>
        </div>
    );
}

export default Header;