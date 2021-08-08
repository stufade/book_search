import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Header from "./app/Header";
import SearchResult from "./app/SearchResult";
import SingleBook from "./features/books/SingleBook";

function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/books/:id">
                    <SingleBook />
                </Route>
                <Route path="/" exact>
                    <SearchResult />
                </Route>
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export default App;
